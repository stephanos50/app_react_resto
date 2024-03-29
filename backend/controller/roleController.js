const Role = require('../models/Role');
const  asyncHandler = require ('express-async-handler')
const { body, validationResult } = require("express-validator");


// @desc   get a roles
// @route  GET /admin/roles
// @access Private/Admin
exports.getRoles = asyncHandler(async (req,res) => {
    
const roles = await Role.findAll()
    if(roles){
        return res.json(roles)
    } else {
        res.status(404)
        throw new Error('Role Nothing Found')
    }
    
});

// @desc   create a role
// @route  CREATE /api/roles/:id
// @access Private/Admin
exports.createRole = [
    body('name').not().isEmpty(),
    
    asyncHandler( async(req,res) => {
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Invlide input')
        }
        
        const role = await Role.findOne({
            where: {
                name:req.body.name
            }
        })
        
        if(!role){
            const role = await  Role.create({name:req.body.name})
            await role.save()
            res.status(201).json({ message: 'Le rôle à été supprimé' })

        }
        if(role) {
            res.status(401)
            throw new Error('Role already exist')
        }
        
       
    })
]

// @desc   delete a role by name
// @route  DELETE /api/roles/:name
// @access Private/Admin
exports.deleteRole = asyncHandler(async (req,res) => {
    const role = await Role.findByPk(req.params.id)
    if (role) {
        await role.destroy()
        res.status(201).json({ message: 'Le rôle à été supprimé' })
        
    } else {
        res.status(401) 
        throw new Error("Role don't exist")
    }
   
   
})
const express = require("express");
const router = express.Router();
const multer =require('multer')
const path = require ('path')
const pictureController = require('../controller/pictureController')
const {protect} = require('../middleware/authMiddleware')
const Picture = require('../models/Picture');




const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
  
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  
  router.post('/', upload.single('image'), (req, res, next) => {
    try {
      pictureController.addPicture(req)
      res.send(`/${req.file.path}`)
    } catch (error) {
        next(error)
    }
   })

  module.exports = router;
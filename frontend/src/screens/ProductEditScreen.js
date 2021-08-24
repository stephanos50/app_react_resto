import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import FormContainer from '../composants/FormContainer'
import { listProductDetails, updateProduct} from '../actions/productAction'
import { Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import context from 'react-bootstrap/esm/AccordionContext'



const ProductEditScreem = ({match, history}) => {
    
    const productId = match.params.uuid
   
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [cote, setCote] = useState(0)
    const [category, setCategory] = useState('')
    const [allergen, setAllergen] = useState([])
    const [allergens, setAllergens] = useState([])
    const [categories, setCategories] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
     

    useEffect(()=> {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productList')
        } else {
            if(!product.name || product._uuid !== productId  ){
                dispatch(listProductDetails(productId))
                
                
            }else {
                setName(product.name)
                setDescription(product.description)
                setPrice(product.price)
                setCote(product.cote)
                setCategory(product.categoryName)
                setAllergen(product.allergens)
    
                const fetchLisCategory = async () => {
                    const { data } = await axios.get(`/api/categories`, config)
                    setCategories(data)
                }
                fetchLisCategory()
    
                const fetchLisAllergen = async () => {
                    const { data } = await axios.get(`/api/allergens/${product.name}`, config)
                    setAllergens(data)
                }
                fetchLisAllergen()
            }

        }
       
    }, [dispatch,history, productId, product, successUpdate])
   
   
    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateProduct({
            _uuid: productId,
            name,
            description:description,
            price:price,
            cote:cote,
            category:category,
            allergen: allergen,

        }))
        
    }

    const chekedHandler = (name) => {
        
    const selectedPermission = allergen.map(item => item.name);
      for (let i = 0; i < selectedPermission.length; i++) {
        const allergen = selectedPermission[i];
        if ( selectedPermission[i] === name) {
            return true
        } 
      }
    }

    const changeChekedHandler = (value) => {
        
        const allergenes = allergen.map((item, index) =>  item.name)
       
        if(allergenes.includes(value) && isChecked === true){
            
            for(let i = 0; i < allergenes.length; ++i){
                if(allergenes[i] === value){
                    allergen.splice(i,1)
                }
                setAllergen(allergen)
                setIsChecked(false)
                
            }
        } else if (!allergenes.includes(value)){
            const details = {
                name: value,
                createdAt: "2021-08-23T20:05:52.000Z",
            }
            setIsChecked(true)
            allergen.push(details)
            setAllergen(allergen)
           
        } else {
            setIsChecked(true)
            setAllergen(allergen)
        }
        console.log(allergen)
      }
    

   
    return ( 
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            
            <h1>Edit PRODUCT</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading && <Loader />} 
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Form onSubmit={submitHandler}>

                   <Form.Group className="mb-3" controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Entrez image url' 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            readOnly
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='name'>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control 
                            type='text'
                            value={name}
                            readOnly
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='description'>
                        <Form.Label>Description</Form.Label>
                       
                        <Form.Control as="textarea" rows={3}
                            type='text'
                            name='description'
                            placeholder='Description' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                           
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='price'>
                        <Form.Label>Prix</Form.Label>
                        <Form.Control 
                            type='number'
                            name='price'
                            placeholder='Entrer votre prix' 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='cote'>
                        <Form.Label>Votre nom</Form.Label>
                        <Form.Control 
                            type='number'
                            name='cote'
                            placeholder='Cote' 
                            value={cote}
                            onChange={(e) => setCote(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='category'> 
                        <Form.Label> <h5>Category :  {category} </h5></Form.Label> 
                        <Form.Select aria-label=""  name='category' onChange={(e) => setCategory(e.target.value)  }>
                        { 
                            categories.map((item) => (
                                <option key={item.name}  value={item.name}>
                                    {item.name} 
                                </option>
                            ))
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='allergen'>
                        <Form.Label><h5>Allergenes :</h5>
                        
                        </Form.Label>
                            {allergens.map((item) => 
                            <Form.Check
                                
                                key={item.name}
                                type='checkbox'
                                name='allergen'
                                label={item.name}
                                value={item.name}
                                checked={chekedHandler(item.name)}
                                onChange={(e) => changeChekedHandler(item.name)}
                            >

                            </Form.Check>)}
                            
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
               
            )}
            </FormContainer>


        </>
    )
    
        
}

export default ProductEditScreem;
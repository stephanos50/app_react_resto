import axios from 'axios'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../composants/Message'
import Loader from '../composants/Loader'
import FormContainer from '../composants/FormContainer'
import { listProductDetails, updateProduct} from '../actions/productAction'
import { listCategory } from '../actions/categoryAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'



const ProductEditScreem = ({match, history}) => {
    
    const productId = match.params.id
    
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [cote, setCote] = useState(0)
    const [category, setCategory] = useState('')
    const [allergensList, setAllergensList] = useState([]) // AXIOS
    const [allergens, setAllergens] = useState({}) // PRODUCT
    const [isChecked, setIsChecked] = useState(false)
    const [uploading, setUploading] = useState(false)
    
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const categoryList = useSelector((state) => state.categoryList)
    const { categories } = categoryList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
      }

    const fetchLisAllergen = async () => {
        const { data } = await axios.get('/api/allergens', config)
        setAllergensList(data)
    }

    useEffect(() => {
        dispatch(listCategory())
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            
            history.push('/admin/productlist')
            
        } 
        if (!product.name || product.id !== Number(productId) ) {
            dispatch(listProductDetails(productId))
        } else {
            setImage(product.id)
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCote(product.cote)
            setCategory(product.categoryId)
            setAllergens(product.allergens)
            fetchLisAllergen()
        }
       
      }, [dispatch, history, productId, product, successUpdate])


      const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('id',product.id)
        formData.append('url',"http://localhost:5000/uploads/")
        
        
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload',formData , config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }
      
    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(updateProduct({
            id:productId,
            name:name,
            description:description,
            price:price,
            cote:cote,
            category:category,
            allergen: allergens,
        }))
    };

    const chekedHandler = (name) => {
        const allergen = allergens.map(item => item.name);
        for (let i = 0; i < allergen.length; i++) {
            if ( allergen[i] === name) {
                return true
            } 
        }
    };
    const changeChekedHandler = (value) => {
       const allergenes = allergens.map((item) => item.name )
        
        if(allergenes.includes(value) && isChecked === true){
            for(let i = 0; i < allergenes.length; ++i){
                if(allergenes[i] === value){
                    allergens.splice(i,1)
                }
                setAllergens(allergens)
                setIsChecked(false)
            }
        } else if (!allergenes.includes(value)){
            allergensList.forEach(element => {
                if(value === element.name){
                    const details = {
                        id: element.id,
                        name: element.name,
                        createdAt: "2021-08-23T20:05:52.000Z",
                    }
                    console.log(details)
                    setIsChecked(true)
                    allergens.push(details)
                    setAllergens(allergens)
                }
            })
        } else {
            setIsChecked(true)
            setAllergens(allergens)
        }
    };
  
    return ( 
        <>
            <Link to='/admin/productList' className='btn btn-light my-3'>
            Go Back
            </Link>
            <FormContainer>
            <h1>Edit PRODUCT</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error}</Message> ) : (
                <Form onSubmit={submitHandler}>

                   <Form.Group className="mb-3" controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Entrez image url' 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="form-file" className="mb-3">
                        <Form.Label
                            
                            onChange={uploadFileHandler}
                        
                        >Default file input example</Form.Label>
                        <Form.Control type="file" onChange={uploadFileHandler} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nom</Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder='Entrez image url' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='description'>
                        <Form.Label>Description</Form.Label>
                       
                        <Form.Control as="textarea" rows={3}
                            type='text'
                            placeholder='Entrez une description' 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                           
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='price'>
                        <Form.Label>Prix</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Entrez votre prix' 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='cote'>
                        <Form.Label>Votre nom</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Entrez une cote' 
                            value={cote}
                            onChange={(e) => setCote(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='category'> 
                        
                        <Form.Label> <h5>Category : {category} </h5></Form.Label> 
                        <Form.Select aria-label=""  name='category' onChange={(e) => setCategory(e.target.value)  }>
                        { 
                            categories.map((item) => (
                                <option key={item.id}  value={item.id}>
                                    {item.id}  {item.name} 
                                    
                                </option>
                            ))
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId='allergen'>
                        <Form.Label><h5>Allergenes :</h5>
                        
                        </Form.Label>
                            {allergensList.map((item) => 
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
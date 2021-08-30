
// import { Form} from 'react-bootstrap' 
// import {  useSelector} from 'react-redux'
// import axios from 'axios'
// import {useState, useEffect} from 'react'


// const Allergen = (props) => {
//     console.log(props.product.name)
//     const [allergensList, setAllergensList] = useState([]) // AXIOS
//     const [allergens, setAllergens] = useState({}) // PRODUCT
//     const [isChecked, setIsChecked] = useState(false)
//     const userLogin = useSelector((state) => state.userLogin)
//     const { userInfo } = userLogin

//     const config = {
//         headers: {
//             Authorization: `Bearer ${userInfo.token}`,
//         },
//       }

   
//     useEffect(() => {
//         if( props.product.name === undefined ){
            
//             fetchLisAllergen()
//             console.log(allergensList)
//         }
//         else{
//             setAllergens(props.allergens)
//             setAllergens(props.product.allergens)
//         }
           
        
       
//     }, [props] )
//     console.log(allergensList)
//     const chekedHandler = (name) => {
//         const allergen = allergens.map(item => item.name);
//         for (let i = 0; i < allergen.length; i++) {
//             if ( allergen[i] === name) {
//                 return true
//             } 
//         }
//     };
//     const changeChekedHandler = (value) => {
//        const allergenes = allergens.map((item) => item.name )
        
//         if(allergenes.includes(value) && isChecked === true){
//             for(let i = 0; i < allergenes.length; ++i){
//                 if(allergenes[i] === value){
//                     allergens.splice(i,1)
//                 }
//                 setAllergens(allergens)
//                 setIsChecked(false)
//             }
//         } else if (!allergenes.includes(value)){
//             allergensList.forEach(element => {
//                 if(value === element.name){
//                     const details = {
//                         id: element.id,
//                         name: element.name,
//                         createdAt: "2021-08-23T20:05:52.000Z",
//                     }
//                     console.log(details)
//                     setIsChecked(true)
//                     allergens.push(details)
//                     setAllergens(allergens)
//                 }
//             })
//         } else {
//             setIsChecked(true)
//             setAllergens(allergens)
//         }
//     };

//     return(
//         <Form.Group className="mb-3" controlId='allergen'>
//             <Form.Label><h5>Allergenes :</h5> </Form.Label>
            
//             {allergensList.map((item) => 
//                 <Form.Check
//                     key={item.name}
//                     type='checkbox'
//                     name='allergen'
//                     label={item.name}
//                     value={item.name}
//                     checked={chekedHandler(item.name)}
//                     onChange={(e) => changeChekedHandler(item.name)}
//                 >
//                 </Form.Check>)}
//         </Form.Group>
//     )
// }
// export default Allergen;
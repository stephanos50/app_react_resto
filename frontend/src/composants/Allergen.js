
import { Col} from 'react-bootstrap' 
import  PropTypes from 'prop-types'



const Allergen = (props) => {
    const {allergens} = props
    console.log(allergens)
   return(<>
        <Col md={6} className="p-3">
            <h4 className='desctiprion-allergene'>Allergene</h4>
            {
                allergens.map((item) => <i className='description'key={item.id}> {item.name} </i>)
            }
        </Col>
    </>
    )
}

Allergen.propTypes = {
    allergens: PropTypes.array.isRequired,
}
export default Allergen;
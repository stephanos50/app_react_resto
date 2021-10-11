import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Assess from '../composants/Assess'
import Message from '../composants/Message'
import UserName from '../composants/UserName'
import  PropTypes from 'prop-types'



 const Review = (props) => {
    const { review } =props
    

   

    return (
        <div>
            {review  && <Message><p className='commentaire'>Aucun commentaires</p></Message>}
                <ListGroup variant='flush' className='price-product p-2'>
                    {review.map((item) => (
                        <ListGroup.Item key={item.id}>
                            <strong><UserName name={item.user}/></strong>
                                <Assess value={item.rating}/>
                                    {item.createdAt.substring(0, 10)}
                                        <br></br>
                                        {item.comment}
                                    </ListGroup.Item>    
                                ))}
             </ListGroup>
        </div>
    )
}
Review.propTypes = {
    review: PropTypes.array.isRequired,
}

export default Review


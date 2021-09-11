

const Assess = (props) => {
    console.log(props)
    return (
        <div className="assess">
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 1  
                        ? 'fas fa-star'
                        : props.value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 2 
                        ? 'fas fa-star'
                        : props.value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 3  
                        ? 'fas fa-star'
                        : props.value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 4  
                        ? 'fas fa-star'
                        : props.value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 5  
                        ? 'fas fa-star'
                        : props.value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
                    }>
                </i>
            </span>
            <div>
            <span className='assess-rewiews'>{props.text > 0 ? `${props.text} ${props.reviews}` : ''}</span>
            </div>
           
           
        </div>
    )
}

Assess.defaultProps = {
    color: '#f8e825'
}



export default Assess;
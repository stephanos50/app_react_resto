

const Assess = (props) => {
    
    return (
        <div className="assess">
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 1  ? 'fa fa-star' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 2  ? 'fa fa-star' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 3  ? 'fa fa-star' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 4  ? 'fa fa-star' : 'far fa-star'}>
                </i>
            </span>
            <span>
                <i style={{color : `${props.color}`}}
                    className={props.value >= 5  ? 'fa fa-star' : 'far fa-star'}>
                </i>
            </span>
            <div>
            <span>{props.text > 0 ? `${props.text} ${props.reviews}` : ''}</span>
            </div>
           
           
        </div>
    )
}

Assess.defaultProps = {
    color: '#f8e825'
}



export default Assess;
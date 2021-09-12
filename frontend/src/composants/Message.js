import React from 'react'
// import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
    
    return (
        <p className={`text-${variant}`}>{children}</p>
    )
}
Message.defaultProps = {
    variant: 'primary'
}

export default Message

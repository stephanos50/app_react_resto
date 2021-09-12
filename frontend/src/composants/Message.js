import React from 'react'
// import { Alert } from 'react-bootstrap'

const Message = ({variant, children}) => {
    
    return (
        <i className={`text-${variant}`}>{children}</i>
    )
}
Message.defaultProps = {
    variant: 'primary'
}

export default Message

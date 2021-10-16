import React from 'react'
import  PropTypes from 'prop-types'

const UserName = (props) => {
    const { name } = props
    
    return (
        <div>
           {name && name.email}
        </div>
    )
}

UserName.propTypes = {
    users: PropTypes.object.isRequired,
}

export default UserName

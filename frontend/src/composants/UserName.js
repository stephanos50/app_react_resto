import React from 'react'
import  PropTypes from 'prop-types'

const UserName = (props) => {
    const { name } = props
    console.log(props)
    return (
        <div>
            {name.first_name}
        </div>
    )
}

UserName.propTypes = {
    users: PropTypes.array.isRequired,
}

export default UserName

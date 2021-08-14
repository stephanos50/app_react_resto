import React, {Fragment, useState} from "react"
import {Nav, Row, Col} from 'react-bootstrap'
import HomeScreem from "../screens/HomeScreen"


const menu = [
    {
        "_id" : 1,
        "name": "Entrée"
    },
    {
        "_id" : 2,
        "name": "Plats"
    },
    {
        "_id" : 3,
        "name": "Suggestion"
    },
    {
        "_id" : 4,
        "name": "Supplement"
    },

]


const Category = () => {
   
    
    
    return (
        <Nav as="ul">
            <Nav.Item as="li">
                <Nav.Link onClick={} >Entrée</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link  onClick={} >Plats</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link onClick={}>Suggestion</Nav.Link>
            </Nav.Item>
        </Nav>
    
    )
}


export default Category


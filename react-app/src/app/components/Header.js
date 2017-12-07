import React,{Component} from "react";

import {NavLink} from "react-router-dom";

export default class Header extends Component{
    
    constructor(props){
        super(props);    
    }

    render(){
        return(
            <div>
                <NavLink to="/" exact className="button" activeClassName="success"> TRADES </NavLink>
                <NavLink to="/cart" className="button" activeClassName="success"> TRANSFERS </NavLink>
                <NavLink to="/not-found-here" className="button" activeClassName="success"> TRANSPORTS </NavLink>
            </div>
        )
    }
}
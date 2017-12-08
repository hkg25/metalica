import React, {Component} from "react";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div> 
               <Header></Header>
               <Footer> </Footer>
            </div>
        )
    }
} 


App.defaultProps = {
    
}

App.propTypes = {
    
}
import React, {Component} from "react";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MarketData from  "../components/market-data/MarketData"
import ImageAvatars from "../components/ImageAvatar"

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div> 
               <MarketData></MarketData>
               {/* <ImageAvatars/> */}
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
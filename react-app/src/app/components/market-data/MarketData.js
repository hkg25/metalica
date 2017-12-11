import React,{Component} from "react";
import {render} from "react-dom";
import MarketWidget from "./MarketWidget";

export default class MarketData extends Component {

    constructor(props){
            super(props);
            this.state = {
                data : [{id:1, title:"Aluminium",price:125.30},
                    {id:2, title:"Gold",price:1250.30},
                    {id:3, title:"Silver", price:120.30}
                ]   
            }    
        }

    render(){
        console.log("Market Data render called");
        return(
            <div className="width75">
            {
                 this.state.data.map((item) =>(
                    <MarketWidget key={item.id} item={item} />
                ))

            }               
            </div>
        )
    }
}
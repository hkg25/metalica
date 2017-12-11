import React,{Component} from "react";
import TradeForm from "./TradeForm";

export default class TradeItem extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
               <TradeForm/>
            </div>  
        )
    }
    
}
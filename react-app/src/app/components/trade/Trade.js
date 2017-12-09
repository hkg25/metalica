import React,{Component} from "react";
import EnhancedTable from "../EnhancedTable";

export default class Trade extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log("Trade render called");
        return(
            <EnhancedTable/>  
        )
    }
    
}
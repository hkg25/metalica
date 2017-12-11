import React,{Component} from "react";
import EnhancedTable from "../EnhancedTable";
import TradeItem from "../trade/TradeItem";
import Filter from "../Filter";

export default class Trade extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log("Trade render called");
        return(
            <div>
                 <Filter/>
                <span className="trade">
                    <EnhancedTable/>
                </span>
                <span className="tradeItem">  
                <TradeItem/>
                </span>
            </div>
        )
    }
    
}
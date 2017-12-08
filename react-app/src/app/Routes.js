import React from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

import App from "./components/App";
import Trade from "./components/trade/Trade";
import Transfers from "./components/transfer/Transfer";
import Transport from "./components/transport/Transport";
 
// const App = () => (
//   <MuiThemeProvider>
//     <MyAwesomeReactComponent />
//   </MuiThemeProvider>
// );

export default function Routes(props){
    return(
        <Router>
            <App>
                <Switch>
                    <Route path="/" component={Trade}/>
                    <Route path="/transfers" component={Transfers}/>
                    <Route path="/transports" component={Transport}/>
                    <Route/>   
                </Switch>
            </App>    
        </Router>    
    )
}
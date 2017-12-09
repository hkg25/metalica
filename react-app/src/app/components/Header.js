import React,{Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import {NavLink} from "react-router-dom";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EnhancedTable from "./EnhancedTable";

const customstyles = theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
    },
  });
  

class Header extends Component{
    
    // constructor(props){
    //     super(props);    
    // }

    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };
    

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                     >
                    <Tab label="TRADES">
                        <NavLink to="/" exact className="button" activeClassName="success"/>
                    </Tab>
                    <Tab label="TRANSFERS">
                        <NavLink to="/transfers" className="button" activeClassName="success"/>
                    </Tab>
                    <Tab label="TRANSPORTS">
                        <NavLink to="/transports" className="button" activeClassName="success"/>
                    </Tab>
        </Tabs>
      </Paper>

      <EnhancedTable/>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(customstyles) (Header);
import React,{Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, {Tab} from 'material-ui/Tabs';
import {NavLink} from "react-router-dom";
import SwipeableViews from 'react-swipeable-views';
import Typography from 'material-ui/Typography';

import Trade from "./trade/Trade";
import Transfer from "./transfer/Transfer";
import Transport from "./transport/Transport";

const styles = theme => ({
    root: {
      //backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
      marginTop: theme.spacing.unit * 3,
    },
  });

  function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };
  

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
        const { classes, theme } = this.props;
        return(
            <div>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                     >
                        <Tab label="TRADES"/>
                        <Tab label="TRANSFERS" disabled/>
                        <Tab label="TRANSPORTS" disabled/>
                    </Tabs>
             </Paper>

             <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}>
                <TabContainer dir={theme.direction}><Trade/></TabContainer>
                <TabContainer dir={theme.direction}><Transfer/></TabContainer>
                <TabContainer dir={theme.direction}><Transport/></TabContainer>
            </SwipeableViews>
            </div>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true }) (Header);
import React from "react";
import TabContainer from './TabContainer.js';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const UnderConstructionTab = (props) => {
    return (
        <TabContainer dir='x'>
            <AppBar position="static" className={props.className}>
                <Toolbar>
                    <Typography type="title" color="inherit" className={props.classes.flex}>
                        {props.text}
                    </Typography>
                </Toolbar>
            </AppBar>
        </TabContainer>
    );
};

export default UnderConstructionTab;

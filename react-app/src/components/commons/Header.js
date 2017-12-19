import React from "react";
import UserAvatar from './UserAvatar.js';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TransferWithinAStation from 'material-ui-icons/TransferWithinAStation';
import FlightTakeoff from 'material-ui-icons/FlightTakeoff';
import TrendingUp from 'material-ui-icons/TrendingUp';

export default function PageHeader(props) {
    return (
        <AppBar position="static" color="default">
            <Tabs
                value={props.value}
                onChange={(event, value) => props.onChange(event, value)}
                scrollButtons="off"
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab label="Trades" icon={<TrendingUp />} />
                <Tab label="Transfers" icon={<TransferWithinAStation />} />
                <Tab label="Transports" icon={<FlightTakeoff />} />
                <UserAvatar username="Harish Garg" />
            </Tabs>
        </AppBar>
    );
};

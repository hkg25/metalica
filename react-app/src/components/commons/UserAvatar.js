import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import Tooltip from 'material-ui/Tooltip';
import Auth from '../auth/Auth';
import Button from 'material-ui/Button';

const auth = new Auth();

const styles = theme => ({
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    row: {
        display: 'flex',
        float: 'right',
        order: 1,
        marginLeft: 'auto',
        marginRight: '20px',
        justifyContent: 'center',
    },
    tooltipTop: {
        marginTop: 10
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


function UserAvatar(props) {
    const { classes, username } = props;
   // let userNameToShow = username.split(' ').map(x => x[0]).join(''); // First letter of each word.
    return (
        <div className={classes.row}>
            <Tooltip id="tooltip-avatar" className={classes.avatar} title={username} placement="top">
                <Avatar className={classes.orangeAvatar} src="/pics.jpg"></Avatar>
            </Tooltip>
            <Button raised color="Primary" className={classes.button} onClick={auth.logout()}/>
        </div>
    );
}


export default withStyles(styles)(UserAvatar);

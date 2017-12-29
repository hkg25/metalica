import React from 'react';
import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { TableRow, TableCell } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const rowStyles = theme => ({
    selected: {
        color: orange['900'],
        height: '41px',
    },
    notSelected: {
      height: '41px',
    },
    hidden: {
        display: 'none',
    },
    visible: {
        display: 'block',
    },
    paddindDense: {
        padding: '5px 10px',
    },
});

class TradeNotificationRow extends React.Component {

    constructor(props, context) {
        super(props, context);
        //this.selectUnselectRow = this.selectUnselectRow.bind(this);
    }

    render() {
        const { tradeNotificationRow, classes } = this.props;
        return (
            <TableRow
                tabIndex={-1}
                >
                <TableCell className={classes.paddindDense} numeric>{tradeNotificationRow.type}</TableCell>
                <TableCell className={classes.paddindDense} numeric>{tradeNotificationRow.id}</TableCell>
                <TableCell className={classes.paddindDense} >{tradeNotificationRow.tradeDate}</TableCell>
                <TableCell className={classes.paddindDense} >{tradeNotificationRow.commodity}</TableCell>
                <TableCell className={classes.paddindDense} >{tradeNotificationRow.side}</TableCell>
                <TableCell numeric className={classes.paddindDense} >{tradeNotificationRow.qty}</TableCell>
                <TableCell numeric className={classes.paddindDense} >{tradeNotificationRow.price}</TableCell>
                <TableCell className={classes.paddindDense} >{tradeNotificationRow.counterparty}</TableCell>
                <TableCell className={classes.paddindDense} >{tradeNotificationRow.location}</TableCell>

            </TableRow>
        );
    }
}
export default withStyles(rowStyles)(TradeNotificationRow);

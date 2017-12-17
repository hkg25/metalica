import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { orange } from 'material-ui/colors';
import { TableRow, TableCell } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

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
    deleteRowButton: {
        height: '30px',
        width: '24px',
    },
    paddindDense: {
        padding: '5px 10px',
    },
});

class TradeHistoryTableRow extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedTrade: this.props.selectedTrade,
            isHovered: false
        }
        ;
        this.selectUnselectRow = this.selectUnselectRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let isHovered = nextProps.selectedTrade ? nextProps.selectedTrade.id === this.props.trade.id :  false;
        this.setState({
            selectedTrade: nextProps.selectedTrade,
            isHovered: isHovered
        });
    }

    selectUnselectRow = (event, id) => {
        this.props.selectTrade(id);
    }

    render() {
        const { trade, classes, selectTrade, deleteTrade, selectedTrade } = this.props;
        const isSelected = selectedTrade ? selectedTrade.id === trade.id : false;
        const showDeleteButton = isSelected || this.state.isHovered;
        return (
            <TableRow
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                key={trade.id}
                selected={isSelected}
                className={isSelected ? classes.selected : classes.notSelected}
                onClick={event => this.selectUnselectRow(event, trade.id)}
                onMouseOver={event => this.setState({ isHovered : true })}
                onMouseOut={event => this.setState({ isHovered : false })}
            >
                <TableCell className={classes.paddindDense} numeric>{trade.id}</TableCell>
                <TableCell className={classes.paddindDense} >{trade.tradeDate}</TableCell>
                <TableCell className={classes.paddindDense} >{trade.commodity}</TableCell>
                <TableCell className={classes.paddindDense} >{trade.side}</TableCell>
                <TableCell numeric className={classes.paddindDense} >{trade.qty}</TableCell>
                <TableCell numeric className={classes.paddindDense} >{trade.price}</TableCell>
                <TableCell className={classes.paddindDense} >{trade.counterparty}</TableCell>
                <TableCell className={classes.paddindDense} >{trade.location}</TableCell>
                <TableCell className={classes.paddindDense} >
                    <Tooltip title="Delete row">
                        <IconButton aria-label="Delete"
                            className={
                                classNames(classes.deleteRowButton,
                                    showDeleteButton ? classes.visible : classes.hidden)
                            }
                            onClick={event => this.props.deleteTrade(trade.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}
export default withStyles(rowStyles)(TradeHistoryTableRow);

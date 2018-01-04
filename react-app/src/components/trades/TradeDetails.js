import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import TradeDetailsHeader from './TradeDetailsHeader';

import {
    convertToHtmlDate, convertToUserDate, dropDownItems
} from '../../utils/utils.js';

import CurrencyNumberFormat from '../../utils/currencyFormat.js';

import {
    TRADE_SIDES
} from '../../utils/default.js';

const styles = theme => ({
    root: {
        height: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
        width: "92%",
        marginLeft: "auto",
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: "auto",
        marginRight: theme.spacing.unit,
        width: "92%",
    },
    menu: {
        width: 200,
    },
    buttonContainer: {
        marginTop: "10%",
        marginBottom: "7.2%",
        width: "100%"
    },
    button: {
        margin: theme.spacing.unit,
        float: "right",
    },
    headerButtonContainer: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "-20px",
        width: "40%"
    },
});

const TradeDetailsButton = (props) => {
    return (
        <Button
            raised dense
            color={props.color}
            disabled={!props.editMode}
            className={props.classes.button}
            onClick={props.onClick}
        >{props.displayLabel}</Button>
    );
}



class TradeDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTrade: this.props.selectedTrade,
            editMode: this.props.editMode
        };
        this.editTrade = this.editTrade.bind(this);
        this.cancelSave = this.cancelSave.bind(this);
        this.saveTrade = this.saveTrade.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedTrade: nextProps.selectedTrade, editMode: nextProps.editMode });
    }

    saveTrade = (event) => {
        this.setState({ editMode: false })
        this.props.saveTrade(this.state.selectedTrade);
    }

    cancelSave = (event) => {
        this.setState({ editMode: false })
        this.props.cancelSave();
    }

    editTrade = (event) => {
        this.setState({ editMode: true })
    }

    handleChange = (name, trade) => event => {
        let targetValue = event.target.value;
        if (name === "tradeDate") targetValue = convertToUserDate(targetValue);
        trade[name] = targetValue;
        this.setState({ selectedTrade: trade });
    };

    defaultTrade() {
        return {
            id: -1, tradeDate: '', commodity: '', side: '',
            qty: '', price: 0, counterparty: '', location: ''
        };
    }

    render() {
        const { classes, actionToBePerformed, saveTrade, editTrade, locations, counterparties, commodities } = this.props;
        const editMode = this.state.editMode || (this.props.actionToBePerformed === 'Create_New');

        const selectedTrade = this.state.selectedTrade;
        const selectedOrDefaultTrade = selectedTrade ? selectedTrade : this.defaultTrade();
        const tradeDateVal = convertToHtmlDate(selectedOrDefaultTrade.tradeDate);
        const selectedTradeWithChangedTradeDate = { ...selectedOrDefaultTrade, tradeDate: tradeDateVal };

        return (
            <Grid item xl={2} lg={3} xs={4}>
                <Paper>
                    <TradeDetailsHeader {...this.props} actionToBePerformed={actionToBePerformed} selectedTrade={selectedTrade} saveTrade={saveTrade} editTrade={editTrade} />
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField id="tradeDate" label="Trade Date" margin="dense" type="date"
                            className={classes.textField}
                            disabled={!editMode}
                            value={tradeDateVal} InputLabelProps={{ shrink: true }}
                            onChange={this.handleChange('tradeDate', selectedTradeWithChangedTradeDate)}
                        />
                        <TextField select id="commodity" label="Commodity" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.commodity}
                            onChange={this.handleChange('commodity', selectedTradeWithChangedTradeDate)}
                        >
                            {dropDownItems(commodities)}
                        </TextField>
                        <TextField select id="side" label="Side" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.side}
                            onChange={this.handleChange('side', selectedTradeWithChangedTradeDate)}
                        >
                            {dropDownItems(TRADE_SIDES)}
                        </TextField>
                        <TextField select id="counterparty" label="Counterparty" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.counterparty}
                            onChange={this.handleChange('counterparty', selectedTradeWithChangedTradeDate)}
                        >
                            {dropDownItems(counterparties)}
                        </TextField>
                        <TextField id="price" label="Price" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.price}
                            onChange={this.handleChange('price', selectedTradeWithChangedTradeDate)}
                            InputProps={{ inputComponent: CurrencyNumberFormat }}
                        />


                        <TextField id="qty" label="Quantity (MT)" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.qty}
                            onChange={this.handleChange('qty', selectedTradeWithChangedTradeDate)}
                        />
                        <TextField select id="location" label="Location" margin="dense"
                            className={classes.textField}
                            disabled={!editMode}
                            value={selectedTradeWithChangedTradeDate.location.toUpperCase()}
                            onChange={this.handleChange('location', selectedTradeWithChangedTradeDate)}
                        >
                            {dropDownItems(locations)}
                        </TextField>
                        <div className={classes.buttonContainer} >
                            <TradeDetailsButton {...this.props} editMode={editMode}
                                color="primary" displayLabel="Save"
                                onClick={event => this.saveTrade()}
                            />
                            <TradeDetailsButton {...this.props} editMode={editMode}
                                displayLabel="Cancel"
                                onClick={event => this.cancelSave()}
                            />
                        </div>
                    </form>
                </Paper>
            </Grid>
        );
    }
};

export default withStyles(styles)(TradeDetails);

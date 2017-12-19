import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {
    TRADE_SIDES
} from '../../utils/default';

import {
    convertToHtmlDate, convertToUserDate, dropDownItems
} from '../../utils/utils.js';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto"
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
        width: "100%",
    },
    menu: {
        width: 200,
    },
    buttonContainer: {
        marginTop: "10%",
        marginBottom: "12%",
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

class TradeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                startTradeDate: '',
                endTradeDate: '',
                commodity: '',
                side: '',
                counterparty: '',
                location: ''
            }
        };
        this.valuesOrDefault = this.valuesOrDefault.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ filter: this.valuesOrDefault(nextProps.selectedFilter) });
    }

    handleChange = name => event => {
        let targetValue = event.target.value;
        if (name === "startTradeDate" || name === "endTradeDate") {
            targetValue = convertToUserDate(targetValue);
        }
        let filter = { ...this.state.filter };
        filter[name] = targetValue;
        this.setState({ filter });
    };


    valuesOrDefault(filter) {
        return {
            startTradeDate: filter && filter.startTradeDate ? filter.startTradeDate : '',
            endTradeDate: filter && filter.endTradeDate ? filter.endTradeDate : '',
            commodity: filter && filter.commodity ? filter.commodity : '',
            side: filter && filter.side ? filter.side : '',
            counterparty: filter && filter.counterparty ? filter.counterparty : '',
            location: filter && filter.location ? filter.location : '',
        };
    }

    render() {
        const { classes, clearTradeFilters, filterTrades, locations, counterparties, commodities } = this.props;
        const filter = this.valuesOrDefault(this.state.filter);
        const startTradeDateVal = convertToHtmlDate(filter.startTradeDate);
        const endTradeDateVal = convertToHtmlDate(filter.endTradeDate);
        return (
            <Paper style={{ padding: "5px 10px", "margin": "10px 5px", width: "calc(100% - 10px)" }}>
                <Grid container alignContent="stretch" alignItems="stretch" spacing={8}>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField id="startTradeDate" label="Trade Date" margin="dense" type="date"
                            className={classes.textField}
                            value={startTradeDateVal} InputLabelProps={{ shrink: true }}
                            onChange={this.handleChange('startTradeDate')}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField id="endTradeDate" label="&nbsp;&nbsp;" margin="dense" type="date"
                            className={classes.textField}
                            value={endTradeDateVal} InputLabelProps={{ shrink: true }}
                            onChange={this.handleChange('endTradeDate')}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField select id="commodity" label="Commodity" margin="dense"
                            className={classes.textField}
                            value={filter.commodity}
                            onChange={this.handleChange('commodity')}
                        >
                            {dropDownItems(commodities)}
                        </TextField>
                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField select id="side" label="Side" margin="dense"
                            className={classes.textField}
                            value={filter.side.toUpperCase()}
                            onChange={this.handleChange('side')}
                        >
                            {dropDownItems(TRADE_SIDES)}
                        </TextField>
                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField select id="counterparty" label="Counterparty" margin="dense"
                            className={classes.textField}
                            value={filter.counterparty}
                            onChange={this.handleChange('counterparty')}
                        >
                            {dropDownItems(counterparties)}
                        </TextField>
                    </Grid>
                    <Grid item lg={2} md={2} sm={3} xs={4}>
                        <TextField select id="location" label="Location" margin="dense"
                            className={classes.textField}
                            value={filter.location.toUpperCase()}
                            onChange={this.handleChange('location')}
                        >
                            {dropDownItems(locations)}
                        </TextField>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Button raised className={classes.button}
                            onClick={e => clearTradeFilters(this.state.filter)}
                        >Clear</Button>
                        <Button raised color="primary"
                            className={classes.button}
                            onClick={e => filterTrades(this.state.filter)}
                        >Search</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(TradeFilter);

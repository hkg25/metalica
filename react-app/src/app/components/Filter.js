import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel,FormLabel } from 'material-ui/Form';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  }
});
const counterParties = [
    {value: 'Lorem',label: 'Lorem'},
    {value: 'Ipsum',label: 'Ipsum'},
    {value: 'Cpty1',label: 'Cpty1'},
    {value: 'Cpty2',label: 'Cpty2'},
];
const commodities = [
  {value: 'AL',label: 'AL'},
  {value: 'GD',label: 'GD'},
  {value: 'SL',label: 'SL'},
  {value: 'CO',label: 'CO'}
];
const locations = [
    {value: 'LDN',label: 'LDN'},
    {value: 'SYD',label: 'SYD'},
    {value: 'STM',label: 'STM'},
    {value: 'HKG',label: 'HKG'}
];

class Filter extends React.Component {

  state = {
    location : "LDN",
    commodity : "AL",
    counterParty : "Lorem",
    tradeDate : "",
    buy : true,
    sell : false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField required
          id="tradeDate"
          label="Trade Date"
          type="date"
          defaultValue="2017-12-11"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('tradeDate')}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
        />
         <TextField
          id="select-commodity"
          select
          label="Select Commodity"
          className={classes.textField}
          value={this.state.commodity}
          onChange={this.handleChange('commodity')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          fullWidth
          //helperText="Please select your commodity"
        >
          {commodities.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormGroup row>
        {/* <FormLabel>Side</FormLabel> */}
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.buy}
              onChange={this.handleChange('buy')}
              value="buy"
            />
          }
          label="Buy"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.sell}
              onChange={this.handleChange('sell')}
              value="sell"
            />
          }
          label="Sell"
        />
        </FormGroup>
        <TextField
          id="select-counterparty"
          select
          label="Select CounterParty"
          className={classes.textField}
          value={this.state.counterParty}
          onChange={this.handleChange('counterparty')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          fullWidth
          //helperText="Please select your counterparty"
        >
          {counterParties.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-location"
          select
          label="Select Location"
          className={classes.textField}
          value={this.state.location}
          onChange={this.handleChange('location')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          fullWidth
          //helperText="Please select your counterparty"
        >
          {locations.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);
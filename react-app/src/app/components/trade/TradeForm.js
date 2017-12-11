import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

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

class TradeForm extends React.Component {

  state = {
    location : "LDN",
    price: '',
    qty: '',
    commodity : "AL",
    counterParty : "Lorem",
    tradeDate : ""
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
        <FormControl component="fieldset" required className='formControl' fullWidth>
          <FormLabel component="legend">Side</FormLabel>
          <RadioGroup
            aria-label="side"
            name="side"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
            <FormControlLabel value="sale" control={<Radio />} label="Sell" />
        </RadioGroup>
        </FormControl>
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
        <TextField required
          id="price"
          label="Price"
          value={this.state.price}
          onChange={this.handleChange('price')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
        />
         <TextField required
          id="qty"
          label="Quantity"
          value={this.state.qty}
          onChange={this.handleChange('qty')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
        />

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

TradeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradeForm);
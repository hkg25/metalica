import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import _ from 'lodash';

const TradeNotificationsTableColumns = [
  { id: 'Type', numeric: false, label: 'Action' },
  { id: 'id', numeric: true, label: 'Trade Id' },
  { id: 'tradeDate', numeric: false, label: 'Trade Date' },
  { id: 'commodity', numeric: false, label: 'Commodity' },
  { id: 'side', numeric: false, label: 'Side' },
  { id: 'qty', numeric: true, label: 'Qty(MT)' },
  { id: 'price', numeric: false, label: 'Price(MT)' },
  { id: 'counterparty', numeric: false, label: 'Counterparty' },
  { id: 'location', numeric: false, label: 'Location' }
];

const headerStyles = theme => ({
    tableHeader: {
        fontWeight: 'bold',
        color: theme.palette.primary.A700,
    },
    paddindDense: {
        padding: '5px 10px',
    },
});


class TradeNotificationsTableHead extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <TableHead>
        <TableRow>

          {TradeNotificationsTableColumns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding='dense'
                className={classNames(classes.tableHeader, classes.paddindDense)}
              >
              <TableSortLabel
              >
                    {column.label}
              </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
};

export default withStyles(headerStyles)(TradeNotificationsTableHead);

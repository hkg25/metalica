import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const TradeHistoryTableColumns = [
  { id: 'id', numeric: true, label: 'Trade Id' },
  { id: 'tradeDate', numeric: false, label: 'Trade Date' },
  { id: 'commodity', numeric: false, label: 'Commodity' },
  { id: 'side', numeric: false, label: 'Side' },
  { id: 'qty', numeric: true, label: 'Qty(MT)' },
  { id: 'price', numeric: false, label: 'Price(MT)' },
  { id: 'counterparty', numeric: false, label: 'Counterparty' },
  { id: 'location', numeric: false, label: 'Location' },
  { id: 'action', numeric: false, label: '' }
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


class TradeHistoryTableHead extends React.Component {


  render() {
    const { isDescending, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow>

          {TradeHistoryTableColumns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding='dense'
                className={classNames(classes.tableHeader, classes.paddindDense)}
              >
                <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                >
                  <TableSortLabel
                        active={orderBy === column.id}
                        direction={isDescending ? 'desc' : 'asc'}
                        onClick={e => this.props.sortTrades(column.id)}
                  >
                        {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
};

export default withStyles(headerStyles)(TradeHistoryTableHead);

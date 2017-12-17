import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody, TableFooter, TableRow, TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import TradeHistoryTableToolbar from './TradeHistoryTableToolbar.js';
import TradeHistoryTableHead from './TradeHistoryTableHead.js';
import TradeHistoryTableRow from './TradeHistoryTableRow.js';

const tableStyles = theme => ({
  root: {
      height: '100%',
      overflowX: 'auto',
      // paddingRight: 2,
  },
  tableWrapper: {
      overflowX: 'auto',
  },
  table: {
  },
  highlight:
      theme.palette.type === 'light' ?
          { color: theme.palette.secondary.A700, backgroundColor: theme.palette.secondary.A100, }
          : { color: theme.palette.secondary.A100, backgroundColor: theme.palette.secondary.A700, },
  spacer: {
      flex: '1 1 100%',
  },
  actions: {
      color: theme.palette.text.secondary,
  },
  title: {
      flex: '0 0 auto',
  },
  title: {
      flex: '0 0 auto',
  },
});

class TradeHistoryTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isDescending: this.props.isDescending,
            orderBy: this.props.orderBy,
            selectedTrade: this.props.selectedTrade,
            page: 0,
            rowsPerPage: 10,
            trades: this.props.trades,
            sortTrades:this.props.sortTrades,
            selectTrade:this.props.selectTrade,
            deleteTrade:this.props.deleteTrade
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            trades: nextProps.trades,
            isDescending: nextProps.isDescending,
            orderBy: nextProps.orderBy,
            selectedTrade: nextProps.selectedTrade,
            sortTrades:nextProps.sortTrades
        });
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { actionToBePerformed, classes, sortTrades, selectTrade, deleteTrade, trades, load, createNewAction, selectedTrade } = this.props;
        const { orderBy, isDescending, rowsPerPage, page } = this.state;
        const rowsForThisPage = trades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
          <Grid item lg={9} >
            <Paper className={classes.root}>

                <TradeHistoryTableToolbar actionToBePerformed={actionToBePerformed} selectedTrade={selectedTrade} trades={trades} load={load} createNewAction={createNewAction}/>
                <Table className={classes.table}>
                    <TradeHistoryTableHead
                        isDescending={isDescending}
                        orderBy={orderBy}
                        trades={trades}
                        selectedTrade={selectedTrade}
                        sortTrades={sortTrades}
                        rowCount={trades.length}
                    />
                    <TableBody>

                        {rowsForThisPage.map(t =>
                             (<TradeHistoryTableRow key={t.id} trade={t} deleteTrade={deleteTrade} selectTrade={selectTrade}/>)
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={trades.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
          </Grid>
        );
    }
};
export default withStyles(tableStyles)(TradeHistoryTable);

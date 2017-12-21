import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody, TableCell, TableFooter, TableRow, TablePagination, TableSortLabel
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash';
import Grid from 'material-ui/Grid';
import TradeNotificationRow from './TradeNotificationRow.js';
import TradeNotificationsTableHead from './TradeNotificationsTableHead';
import { tradesEvent } from '../../socket.js';
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

class TradeNotificationTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tradeNotifications: [],
            page: 0,
            rowsPerPage: 10
        };
        this.receiveTradeEvent = this.receiveTradeEvent.bind(this);
        tradesEvent(this.receiveTradeEvent);
    }

    state = {
        tradeNotifications: [],
        page: 0,
        rowsPerPage: 10
    };

    receiveTradeEvent(err, type, msg) {
      if (err || !msg) {
        return;
      }
      var notifications = this.state.tradeNotifications;
      var obj = Object.assign({}, JSON.parse(msg), {type:type});

      notifications.unshift(obj);
      this.setState({tradeNotifications : notifications});
    }

    getState() {
      return this.state;
    }

    handleChangePageForNotifications = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPageForNotifications = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {

        const { classes } = this.props;
        const { tradeNotifications, rowsPerPage, page } = this.state;
        const rowsForThisPage = tradeNotifications ? tradeNotifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
        let counter = 0;
        return (

          <Grid item lg={12} >
            <Paper className={classes.root}>
                <Toolbar className={classNames(classes.root)}>
                    <span className={classes.title}>
                        <Typography type="title">Trade Notifications ({tradeNotifications.length})</Typography>
                    </span>
                </Toolbar>
                <Table className={classes.table}>
                    <TradeNotificationsTableHead />

                    <TableBody>
                        {

                          rowsForThisPage.map(t => (
                            counter = counter+1,
                             <TradeNotificationRow key={counter} tradeNotificationRow={t} />
                           )
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={tradeNotifications.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePageForNotifications}
                                onChangeRowsPerPage={this.handleChangeRowsPerPageForNotifications}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
          </Grid>
        );
    }
};
export default withStyles(tableStyles)(TradeNotificationTable);

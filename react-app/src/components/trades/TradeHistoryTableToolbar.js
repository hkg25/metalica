import React from 'react';
import classNames from 'classnames';
import { lightBlue } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import AddIcon from 'material-ui-icons/Add';
import RefreshIcon from 'material-ui-icons/Refresh';

class TradeHistoryTableToolbar extends React.Component {

  render() {
        const { actionToBePerformed, selectedTrade, classes} = this.props;
        const numSelected = selectedTrade ? 1 : 0;

        return (
          <Toolbar
              className={classNames(classes.root, { [classes.highlight]: numSelected > 1, })}
          >
            <span className={classes.title}>
                <Typography type="title">Trades</Typography>
            </span>
              <div className={classes.spacer} />
            <span className={classes.title}>
                {numSelected > 0 ? (<Typography type="subheading">
                 {actionToBePerformed === 'Delete_Trade' ? ' Deleted trade with id ' : ' Selected trade with id '} {selectedTrade.id}
                 </Typography>) :''}
            </span>
            <div className={classes.spacer} />
            <div className={classes.actions}>
            <Tooltip title="Reload Trades">
                <Button fab color="inherit" aria-label="Refresh"
                    className={classes.toolbarButton}
                    onClick={event => this.props.load()}
                >
                    <RefreshIcon />
                </Button>
            </Tooltip>
            <Tooltip title="Add new trade">
                <Button fab aria-label="Add" color="primary"
                    className={classes.toolbarButton}
                    onClick={e => this.props.createNewAction()}
                >
                    <AddIcon />
                </Button>
            </Tooltip>
            </div>
          </Toolbar>
        );
    }
}

const toolbarStyles = theme => ({
  root: {
      paddingRight: 2,
  },
  highlight: {
      color: theme.palette.primary.A700,
      backgroundColor: theme.palette.primary.A100,
  },
  withMargin: {
      margin: theme.spacing.unit,
      marginRight: theme.spacing.unit * 2
  },
  toolbarButton: {
      height: "40px",
      width: "40px",
      margin: theme.spacing.unit,
      marginRight: theme.spacing.unit * 2
  },
  bar: {},
  checked: {
      color: lightBlue[600],
      '& + $bar': {
          backgroundColor: lightBlue[600],
      },
  },
  spacer: {
      flex: '1 1 60%',
  },
  actions: {
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap"
  },
  title: {
      flex: '0 0 auto',
      whiteSpace: "nowrap"
  },
});

export default withStyles(toolbarStyles)(TradeHistoryTableToolbar);

import React from 'react';

import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import { blueGrey, amber} from 'material-ui/colors';

import Trades from './components/trades/TradesManager.js';
import Header from './components/commons/Header.js';
import UpComingTab from './components/commons/UpcomingPage.js';
// import TradeNotificationsTable from './Notifications/TradeNotificationsTable.js';
import MarketDataList from './components/market-data/MarketDataList.js';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: 0,
        backgroundColor: theme.palette.background.paper,
    },
    flex: {
        flex: 1,
    },
    underConstruction1: {
        backgroundColor: amber['300'],
    },
    underConstruction2: {
        backgroundColor: blueGrey['300'],
    },
});
class MainApp extends React.Component {
	state = {
			value: 0,
	};

	handleChange = (event, value) => {
			this.setState({ value });
	};
	render() {
			const { classes } = this.props;
			const { value } = this.state;
			return (
                <div className={classes.root}>
                  <div style={{ flexGrow: 1, width: "100%", margin: "0 auto" }}>
                      <MarketDataList/>
                  </div>

                  <Header value={value} onChange={this.handleChange} />
                  <SwipeableViews
											axis='x'
											index={this.state.value}
											onChangeIndex={this.handleChange}
					>
                    <div style={{ flexGrow: 1, width: "100%", margin: "0 auto" }}>
                         <Trades/>
                        {/*<TradeNotificationsTable/> */}
                    </div>
                    <UpComingTab classes className={classes.underConstruction1}
                        text="Transfers page is under construction."
                    />
                    <UpComingTab classes className={classes.underConstruction2}
                        text="Transports page is also under construction."
                    />
                  </SwipeableViews>
              </div>

      );
    }
}

	export default withStyles(styles)(MainApp);

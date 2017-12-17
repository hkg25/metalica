import React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import { marketDataEvents } from '../../socket';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class MarketDataList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          marketData: []
      };
      this.receiveMarketDataEvent = this.receiveMarketDataEvent.bind(this);
      setTimeout(() => {
          marketDataEvents(this.receiveMarketDataEvent);
      }, 2000);
  }

  receiveMarketDataEvent(err, msg) {
    if (err || !msg) {
      return;
    }

    var existingData = this.state.marketData;
    existingData.unshift(JSON.parse(msg));
    this.setState({marketData : existingData});
  }

  render() {
    const { marketData } = this.state;
    const { classes } = this.props;
    let counter = 0;
    return (
    <div className={classes.root}>
        <GridList className={classes.gridList} cols={10.5} cellHeight={70}>
          {
            marketData.map(value => (
            counter = counter+1,
            <GridListTile key={counter}>
              <div style={{background: "#bdbdbd", padding: "10px 0", textAlign: "center", color: "#424242", fontWeight: "bold"}}>
                  {value.code} ({value.price})
                  <div style={{padding: "10px 0", textAlign: "center", color: "#424242",
                  fontWeight: "normal", fontSize:"10px"}}>{value.tradingDay} {value.timestamp}</div>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}


export default withStyles(styles)(MarketDataList);

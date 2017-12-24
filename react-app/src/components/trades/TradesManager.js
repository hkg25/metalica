import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import * as tradeActions from './actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TradeHistoryTable from './TradeHistoryTable';
import TradeDetails from './TradeDetails';
import TradeFilter from './TradeFilters'

class TradesManager extends Component{
	componentDidMount() {
		if (this.props.filtered) {
			this.props.filterTrades(this.props.selectedFilter);
		} else {
			this.props.load();
		}
	}
	render(){
		let {trades, createNewAction, deleteTrade, saveTrade, orderBy, editTrade, selectedTrade, isDescending, selectedFilter, filtered, sortTrades,
		 		selectTrade, load, actionToBePerformed, editMode, cancelSave, locations, counterparties, commodities, clearTradeFilters, filterTrades} = this.props;
		return (
			<div style={{ flexGrow: 1, width: "100%", margin: "0 auto" }}>
					<TradeFilter {...{locations, counterparties, commodities, clearTradeFilters, filterTrades, selectedFilter, filtered}}/>
					<Grid container spacing={8} style={{ margin: "5px", width: "calc(100% - 8px)" }}>
						<TradeHistoryTable {...{trades, actionToBePerformed, createNewAction, deleteTrade, load, selectTrade, orderBy, selectedTrade, isDescending, sortTrades}}></TradeHistoryTable>
						<TradeDetails {...{locations, counterparties, commodities, editMode, cancelSave, saveTrade, actionToBePerformed, deleteTrade, selectedTrade, editTrade}}></TradeDetails>
					</Grid>
			</div>
		)
	}
}

export default connect(
	({tradesState, refDataState, tradeFilterState}) => ({
								editMode: tradesState.editMode,
								actionToBePerformed:tradesState.actionToBePerformed,
								trades : tradeFilterState.filtered ? tradeFilterState.trades : tradesState.trades,
								selectedTrade:tradesState.selectedTrade,
								isDescending:tradesState.isDescending,
								orderBy:tradesState.orderBy,
								locations:refDataState.locations,
								counterparties:refDataState.counterparties,
								commodities:refDataState.commodities,
								filtered:tradeFilterState.filtered,
								filteredTrades:tradeFilterState.trades,
								selectedFilter:tradeFilterState.selectedFilter}),
	(dispatch) => bindActionCreators(tradeActions, dispatch)
)(TradesManager);

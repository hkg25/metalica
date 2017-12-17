import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';

class TradeDetailsHeader extends Component{

	constructor(props) {
		super(props);
		this.state = {
				selectedTrade: this.props.selectedTrade,
				editMode: this.props.editMode
		};
	}

	componentWillReceiveProps(nextProps) {
			this.setState({ selectedTrade: nextProps.selectedTrade, editMode: nextProps.editMode });
	}

	render(){
		const { classes, actionToBePerformed, deleteTrade, selectedTrade, editTrade } = this.props;
		const editIconTooltip = this.props.editMode && selectedTrade ? `Editing trade ${selectedTrade.id}` : "Click on Edit button to edit trade.";
    const toolbarTooltip = selectedTrade ? editIconTooltip : "Please select a Trade to view or edit it.";

		const editIconToBeEnabled = actionToBePerformed === 'Select_Trade';
		return (
			<AppBar position="static" >
					<Tooltip title={toolbarTooltip}>
							<Toolbar>
									<Typography type="title" color="inherit"
											noWrap className={classes.flex}
									>
											{selectedTrade ? `Trade Id: ${selectedTrade.id}` : "Trade Details"}
									</Typography>
									<div className={classes.headerButtonContainer}>
											<IconButton
													aria-label="Edit"
													color="contrast"
													disabled={!editIconToBeEnabled}
													onClick={event => editTrade(selectedTrade.id)}
											>
													<EditIcon />
											</IconButton>
											<IconButton
													aria-label="Delete"
													color="contrast"
													disabled={!selectedTrade}
													onClick={event => deleteTrade(selectedTrade.id)}
											>
													<DeleteIcon />
											</IconButton>
									</div>
							</Toolbar>
					</Tooltip>
			</AppBar>
		)
	}
}
export default TradeDetailsHeader;

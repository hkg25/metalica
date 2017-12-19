import React, { Component } from 'react';
import { connect } from 'react-redux';

class StatusIndicator extends Component{

	render(){
		var error = this.props.error;
		var status = '';
		if (error) {
			status = this.props.errorMessage;
		}
		else {
			status = this.props.loading ? 'Loading..!' : '';
			status = this.props.deleting ? 'Deleting..!' : status;
			status = this.props.saving ? 'Saving..!' : status;
		}
		return (
			<div>
				<h4><span>{status}</span></h4>
			</div>
		);
	}
}

export default connect(
	({statusState}) => ({error:statusState.error, errorMessage: statusState.errorMessage, loading:statusState.loading, deleting : statusState.deleting, saving : statusState.saving}),
	function mapDispatchToProps(dispatch){
		return {};
	})(StatusIndicator);

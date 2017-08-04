import { connect } from 'react-redux';
import React from 'react';
import UserActions from '../actions/UserActions';
import RaisedButton from 'material-ui/RaisedButton';
import Upload from 'material-ui/svg-icons/file/file-upload';
import { color } from 'bogu/styles';
import AsyncActions from '../actions/AsyncActions';
import { EventDetails } from 'bogu';

class Events extends React.Component {

  componentWillMount() {
    this.startPolling();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentSupplierId !== nextProps) {
      clearTimeout(this.timeout);
    }

    if (!nextProps.isFetchingEvents) {
      this.startPolling();
    }
  }

  startPolling = () => {
    this.timeout  = setTimeout(() => {
      if (this.props.currentSupplierId) {
        this.props.dispatch(
          AsyncActions.getProviderEvents(this.props.currentSupplierId)
        );
      }
    }, 5000);
  };

  handleUploadFile() {
    this.props.dispatch(UserActions.openFileUploadDialog());
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 0,
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <RaisedButton
            label="Last opp nytt datasett"
            labelPosition="before"
            primary={true}
            onClick={this.handleUploadFile.bind(this)}
            icon={<Upload />}
          />
        </div>
        {events && events.length
          ? <EventDetails locale="nb" dataSource={events} />
          : <div
            style={{
              padding: 40,
              background: color.tableInfo,
              marginTop: 40,
              fontWeight: 500
            }}
          >
            Ingen tidligere leveranser.
          </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentSupplierId: state.asyncReducer.currentSupplier.id,
  events: state.asyncReducer.events,
  isFetchingEvents: state.asyncReducer.isFetchingEvents
});

export default connect(mapStateToProps)(Events);

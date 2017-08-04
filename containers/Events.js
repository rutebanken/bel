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
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startPolling = () => {
    this.poll();
    setTimeout(() => {
      this.intervalId = setInterval(this.poll, 5000);
    }, 1000);
  };

  poll = () => {
    if (this.props.activeSupplier) {
      this.props.dispatch(
        AsyncActions.getProviderEvents(this.props.activeSupplier.id)
      );
    }
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
  activeSupplier: state.asyncReducer.currentSupplier,
  events: state.asyncReducer.events
});

export default connect(mapStateToProps)(Events);

import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmDialog extends Component {
  render() {

    const { open, handleClose, handleConfirm } = this.props;

    const actions = [
      <FlatButton
        label={"Avbryt"}
        onClick={handleClose}
      />,
      <FlatButton
        primary={true}
        label={"Valider"}
        onClick={handleConfirm}
      />
    ];

    return (
      <Dialog
        actions={actions}
        title={"Validere datasett"}
        open={open}
        onRequestClose={() => {
          console.log("Closing dialog")
        }}
      >
        <span>
          Er du sikker på at du vil validere ditt datasett nå?
        </span>
      </Dialog>
    );
  }
}

export default ConfirmDialog;


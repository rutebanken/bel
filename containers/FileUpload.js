/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import { connect } from 'react-redux';
import React from 'react';
import ModalDialog from '../components/ModalDialog';
import UserActions from '../actions/UserActions';
import AsyncActions from '../actions/AsyncActions';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import MdClose from 'material-ui/svg-icons/navigation/close';
import '../styles/css/fileUpload.css';
import * as types from '../actions/actionTypes';
import MdCheck from 'material-ui/svg-icons/action/check-circle';
import MdError from 'material-ui/svg-icons/alert/error';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  closeModal() {
    const { dispatch } = this.props;
    this.setState({
      files: []
    });
    dispatch(UserActions.dismissFileUploadDialog());
  }

  handleOnDrop(acceptedFiles) {
    if (acceptedFiles.length) {
      this.setState({
        files: acceptedFiles
      });
      return false;
    }
  }

  handleUpload() {
    const { dispatch } = this.props;
    const { files } = this.state;
    if (files && files.length) dispatch(AsyncActions.uploadFiles(files));
  }

  formatFileSize(size) {
    if (size > 1024) {
      return `${parseFloat(size / 1024).toFixed(2)} Mb`;
    }
    return `${parseFloat(size).toFixed(2)} Kb`;
  }

  render() {
    const { isModalOpen, fileUpload } = this.props;
    const { files } = this.state;
    const { progress, state } = fileUpload;

    const totalFileSize = files.length
      ? files.map(file => file.size / 1024).reduce((f1, f2) => f1 + f2)
      : 0;

    return (
      <ModalDialog isOpen={isModalOpen} onClose={() => this.closeModal()}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 15,
            justifyContent: 'space-between'
          }}
        >
          <div style={{display: 'flex'}}>
            <div
              style={{
                fontSize: '1.1em',
                marginLeft: 10,
                textTransform: 'uppercase'
              }}
            >
              Last opp nytt datasett
            </div>
          </div>
          <MdClose
            style={{ marginRight: 15, cursor: 'pointer' }}
            onClick={() => this.closeModal()}
          />
        </div>
        <Dropzone
          className="dropZone"
          activeClassName="dropZone--active"
          rejectClassName="dropZone--reject"
          accept=".zip,.rar"
          onDrop={(accepted, rejected) => {
            if (rejected && rejected.length) {
              console.warn('File not accepted', rejected);
            } else {
              this.handleOnDrop(accepted);
            }
          }}
        >
          <div
            style={{
              color: 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: '0.9em',
              maxWidth: '65%',
              margin: 'auto'
            }}
          >
            Slipp filer her, eller klikk her for å velge filer som skal lastes
            opp som et nytt datasett. Kun filer på formatet zip og rar er
            støttet.
          </div>
        </Dropzone>
        <div className="filelist">
          <select className="file-select" multiple>
            {files.map((file, index) => {
              return <option key={'file-' + index}>{file.name}</option>;
            })}
          </select>
        </div>
        {state == types.FILE_UPLOAD_COMPLETED
          ? <div
              style={{
                maxWidth: '65%',
                margin: '20px auto',
                display: 'flex',
                padding: 10,
                background: 'rgba(0, 128, 0, 0.1)',
                alignItems: 'middle'
              }}
            >
              <MdCheck color="green" />
              {' '}<div
                style={{
                  marginLeft: 5,
                  textTransform: 'uppercase',
                  position: 'relative',
                  top: 3
                }}
              >
                Datasett er lastet opp
              </div>
            </div>
          : null}
        {state == types.FILE_UPLOAD_FAILED
          ? <div
              style={{
                maxWidth: '65%',
                textAlign: 'center',
                margin: '20px auto',
                display: 'flex',
                padding: 10,
                background: 'rgba(255, 0, 0, 0.05)',
                alignItems: 'middle'
              }}
            >
              <MdError color="red" />
              {' '}<div
                style={{
                  marginLeft: 5,
                  textTransform: 'uppercase',
                  position: 'relative',
                  top: 3
                }}
              >
                Feil ved opplasting av datasett
              </div>
            </div>
          : null}
        <div style={{ maxWidth: '75%', margin: '20px auto' }}>
          {state !== types.FILE_UPLOAD_NOT_STARTED
            ? <LinearProgress mode="determinate" value={progress} />
            : null}
        </div>
        <div
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10
          }}
        >
          <div
            style={{
              fontSize: '0.9em',
              visibility: totalFileSize ? 'visible' : 'hidden'
            }}
          >
            Total størrelse: {this.formatFileSize(totalFileSize)}
          </div>
          <RaisedButton
            style={{ marginRight: 10 }}
            disabled={!files.length}
            label="Last opp datasett"
            primary={true}
            onClick={() => this.handleUpload()}
          />
        </div>
      </ModalDialog>
    );
  }
}

const mapStateToProps = state => ({
  isModalOpen: state.userReducer.isModalOpen,
  fileUpload: state.userReducer.fileUpload
});

export default connect(mapStateToProps)(FileUpload);

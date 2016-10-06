import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import cfgreader from '../config/readConfig'
import AsyncActions from '../actions/AsyncActions'
import ModalFileUploadContainer from './modalFileUploadContainer'
import ValidationReportContainer from './validationReportContainer'
import HeaderView from '../components/headerView'
import MainContainer from './mainContainer'
import FooterView from '../components/footerView'
import Appbar from 'muicss/lib/react/appbar';
const FaCog = require('react-icons/lib/fa/cog')

export default class App extends React.Component {
  componentDidMount() {
    cfgreader.readConfig( (function(config) {
      window.config = config
    }).bind(this))
  }
  render() {

    let s1 = {verticalAlign: 'middle'}
    let s2 = {padding: "10px",textAlign: 'right'}
    let s3 = {
      marginLeft:"10px",
      textTransform: "uppercase",
      fontSize: "1.5em"
    }
    let s4 = { verticalAlign: "super"}
    let fCogStyle = { cursor: "pointer", marginRight: "10px"}

    return (
      <div className="app">
        <Appbar style={{ background: "#323232"}}>
          <table width="100%">
            <tbody>
             <tr style={s1}>
               <td className="mui--appbar-height">
                 <span style={s3}>bel</span><span style={s4}>Operational Status</span>
               </td>
               <td className="mui--appbar-height" style={s2}>
                 <FaCog style={fCogStyle}/>
               </td>
             </tr>
            </tbody>
        </table>
        </Appbar>
        <div className="appContent">
          <HeaderView/>
          <MainContainer/>
          <ModalFileUploadContainer/>
          <ValidationReportContainer/>
          <FooterView/>
        </div>
      </div>
    )
  }
}

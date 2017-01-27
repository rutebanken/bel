import React, { PropTypes } from 'react'
import ActionTranslations from '../translations/no/actions'
const FaChevronDown = require('react-icons/lib/fa/chevron-down')
const FaChevronUp  = require('react-icons/lib/fa/chevron-up')
import MdError from 'react-icons/lib/md/error'
import MdDone from 'react-icons/lib/md/check-circle'
import MdSchedule from 'react-icons/lib/md/schedule'
import FaCog from 'react-icons/lib/fa/cog'
import MdHelpOutLine from 'react-icons/lib/md/help-outline'
import MdHour from 'react-icons/lib/md/hourglass-empty'

class EventStepper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  static propTypes = {
    groups: PropTypes.object.isRequired,
    listItem: PropTypes.object.isRequired
  }

  getIconByState(state) {
    switch (state) {
      case "OK": return <MdDone style={{color: 'green', width: 24, height: 22, marginTop: -2}}/>
      case "PENDING": return <MdHour style={{color: 'orange', width: 24, height: 22, marginTop: -2}}/>
      case "STARTED": return <FaCog style={{color: '#2274b5', width: 24, height: 22, marginTop: -2}}/>
      case "FAILED": return <MdError style={{color: 'red', width: 24, height: 22, marginTop: -2}}/>
      case "DUPLICATE": return <MdError style={{color: 'red', width: 24, height: 22, marginTop: -2}}/>
      case "IGNORED": return <MdSchedule style={{color: 'black', width: 24, height: 22, marginTop: -2}}/>
    }
    return <MdHelpOutLine style={{color: 'grey', width: 24, height: 22}}/>
  }

  addUnlistedStates(groups) {

    const states = ["FILE_TRANSFER", "IMPORT", "VALIDATION_LEVEL_1", "DATASPACE_TRANSFER", "VALIDATION_LEVEL_2", "EXPORT"]

    let groupsWithUnlisted = Object.assign({}, groups)

    let firstStateFound = false

    states.forEach( state => {
      if (!groupsWithUnlisted[state]) {
        groupsWithUnlisted[state] = {
          endState: "IGNORED",
          missingBeforeStartStart: !firstStateFound
        }
      } else {
        firstStateFound = true
      }
    })

    let finalGroups = {}

    Object.keys(groupsWithUnlisted)
      .sort( (key1, key2) => states.indexOf(key1) - states.indexOf(key2) )
      .forEach( key  => {
        finalGroups[key] = groupsWithUnlisted[key]
      })
    return finalGroups
  }

  handleToggleVisibility (id) {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {

    const stepperstyle = {
      display: "flex",
      flexDirection: "row",
      alignContent : "center",
      alignItems: "center",
      justifyContent : "center",
      marginTop: 10
    }

    const groupStyle = {
      display: "flex",
      flexDirection: "row",
    }

    const groupText = {
      fontSize: '0.9em',
      marginLeft: 5,
    }

    const linkStyle = {
      display: "block",
      borderColor: "rgb(189, 189, 189)",
      marginLeft: -6,
      borderTopStyle: "solid",
      borderTopWidth: 1,
      width: 30,
      margin: 8
    }

    const { groups, listItem } = this.props
    const { expanded } = this.state

    const formattedGroups = this.addUnlistedStates(groups)

    const bullets = Object.keys(formattedGroups).map( (group, index) => {

      const isLast = Object.keys(formattedGroups).length == index+1
      let toolTipText = ActionTranslations.states[formattedGroups[group].endState]

      if (formattedGroups[group].states && formattedGroups[group].states[groups[group].states.length-1]) {
        toolTipText += ' ' + formattedGroups[group].states[formattedGroups[group].states.length-1].date
      }

      return (
          <div style={groupStyle} key={"group-" + group + index}>
            <div title={toolTipText} style={{opacity: formattedGroups[group].missingBeforeStartStart ? 0.2 : 1 }}>
              { this.getIconByState(formattedGroups[group].endState) }
            </div>
            <div
              title={ ActionTranslations.title[group] || ActionTranslations.title['UNKNOWN'] }
              style={{...groupText, opacity: formattedGroups[group].missingBeforeStartStart ? 0.2 : 1 }}> { ActionTranslations.text[group] || ActionTranslations.text['UNKNOWN']  }
              </div>
            {!isLast ? <div style={linkStyle}></div> : null }
          </div>
        )
      }
    )

    return (
      <div key={"event" + listItem.chouetteJobId} style={{marginLeft: 20, cursor: 'pointer'}} onClick={() => this.handleToggleVisibility()}>
        <div style={{display: 'flex', marginLeft: -20}}>
          <div title={"Varighet: " + listItem.duration} style={{fontSize: '0.9em', fontWeight: 600, color: '#e59400', marginTop: -8, marginRight: 20}}>{listItem.started}</div>
          { listItem.provider && listItem.provider.name ?
            <div style={{fontSize: '0.8em', fontWeight: 600, flex: 1}}>{listItem.provider.name}</div>
            : null
          }
          <div style={{fontSize: '0.9em', fontWeight: 600, flex: 2}}>{listItem.fileName || ActionTranslations.filename.undefined}</div>
        </div>
        <div style={stepperstyle}>
          {bullets}
          <div style={{marginLeft: 'auto', marginRight: 20, marginTop: -50}} onClick={() => this.handleToggleVisibility()}>
            { !expanded ? <FaChevronDown/> : <FaChevronUp/> }
          </div>
        </div>
        { expanded
          ?
            <div style={{display: 'flex', padding: 8, flexDirection: 'column', lineHeight: '25px', marginTop: 10, cursor: 'default', border: '1px solid #9E9E9E'}} onClick={event => event.stopPropagation()}>
              <div>Begynte: {listItem.firstEvent}</div>
              <div>Avsluttet: {listItem.lastEvent}</div>
              <div>Varighet: {listItem.duration}</div>
            </div>
          : null
        }
      </div>
    )
  }

}

export default EventStepper

import React from 'react'
import moment from 'moment'

class HeaderTimeline extends React.Component {

  constructor(props) {
    super(props)
    this.validationColors = {
      'INVALID' : '#b20000',
      'VALID' : '#4caf50',
      'SOON_INVALID' : '#FDB45C'
    }
  }

  render() {

      const timelineStyle = {
        border: '1px solid black',
        borderRadius: 2,
        background: '#fff',
        height: '100%',
        width: '90%',
        margin: 'auto',
        display: 'block',
        overflow: 'auto'
      }

      const timelineWrapper = {
        width: '100%',
        paddingBottom: 30,
        paddingTop: 35
      }

      const timelineHeader = {
        display: 'block',
        fontSize: '0.9em',
        fontWeight: 600
      }

      let timeBlock = {
        background: '#4caf50',
        height: 'auto',
        color: '#fff',
        fontWeight: 500,
        display: 'block',
        borderTop: '1px solid #fff',
        fontSize: '0.8em',
        textAlign: 'center'
      }

      const { startDate, endDate, effectivePeriods } = this.props

      if(!effectivePeriods || !effectivePeriods.length) {
        return null
      }

      return (
        <div style={timelineWrapper}>
          <div style={timelineHeader}>
            <span style={{float: 'left'}}>{startDate}</span>
            <span style={{float: 'right'}}>{endDate}</span>
          </div>
          <div style={timelineStyle}>
            <div key={'timetable-header-'+this.props.index}>
              { effectivePeriods.map( (effectivePeriod, index) => {
                let periodBlock = {...timeBlock}
                periodBlock.width = (effectivePeriod.timelineEndPosition - effectivePeriod.timelineStartPosition) + '%'
                periodBlock.marginLeft = (effectivePeriod.timelineStartPosition + '%')
                periodBlock.background = this.validationColors[effectivePeriod.validationLevel]

                let itemText = effectivePeriod.to

                if (effectivePeriod.timelineStartPosition > 0) {
                  itemText = effectivePeriod.from + ' - ' + effectivePeriod.to
                }

                return (
                  <div key={'timeline-header-wrapper'+index} style={{borderBottom: '1px dotted #74766d'}}>
                    <div
                      key={'timeline-header-block'+index}
                      style={periodBlock}>
                      {itemText}
                    </div>
                    <div></div>
                  </div>
                )
              })
              }
            </div>
          </div>
      </div>
      )
  }
}


export default HeaderTimeline

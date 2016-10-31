import React from 'react'
import moment from 'moment'

class Timeline extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

      const { timetables } = this.props

      const { startDate } = this.props
      const { endDate } = this.props

      let { periods } = timetables[0]
      let period = periods[0]

      const timelineStyle = {
        border: '1px solid black',
        borderRadius: 2,
        background: '#fff',
        height: '100%',
        width: '85%',
        margin: 'auto',
        display: 'block',
        overflowY: 'auto'
      }

      const timelineWrapper = {
        width: '100%',
        paddingTop: 10,
        zIndex: 99999
      }

      let timeBlock = {
        background: '	#0080ff',
        width: '100%',
        height: '100%',
        color: '#fff',
        fontWeight: 600
      }

      let textStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        margin: 'auto 10px',
        color: '#fff',
        fontSize: '0.7em',
        fontWeight: 300
      }

      return (
        <div style={timelineWrapper}>
          <div style={timelineStyle}>
            {
              periods.map( (period, index) => {
                let periodBlock = {...timeBlock}
                periodBlock.width = (period.timelineEndPosition - period.timelineStartPosition) + '%'
                periodBlock.marginLeft = (period.timelineStartPosition + '%')
                return (
                  <div key={'timetable-period-'+index} style={periodBlock}>
                    <div style={textStyle}>{timetables[0].objectId}</div>
                  </div>)
              })
            }
          </div>
        </div>
      )
  }
}

export default Timeline

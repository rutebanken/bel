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
        height: 30,
        width: '95%',
        margin: 'auto',
        display: 'block',
        overflowY: 'auto'
      }

      const timelineWrapper = {
        width: '100%',
        paddingBottom: 20
      }

      let timeBlock = {
        background: '	#0080ff',
        width: '100%',
        height: '100%',
        color: '#fff',
        fontWeight: 600
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
                    <div style={{display: 'block', margin: 'auto 10px', color: '#fff', fontSize: '0.7em', fontWeight: 300}}>{timetables[0].objectId}</div>
                  </div>)
              })
            }
          </div>
        </div>
      )
  }
}

export default Timeline

import React from 'react'
import moment from 'moment'

class Timeline extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

      const { timetables, validDaysOffset, isLast } = this.props

      let { periods } = timetables[0]

      const timelineStyle = {
        border: '1px solid black',
        borderRadius: 5,
        background: '#DED8D8',
        height: '100%',
        width: '85%',
        margin: 'auto',
        display: 'block',
        overflowY: 'auto',
        marginBottom: isLast ? -15 : 'auto'
      }

      const timelineWrapper = {
        width: '100%',
        paddingBottom: isLast ? 0 : 10
      }

      let timeBlock = {
        background: '#6D92B6',
        width: '100%',
        height: '100%',
        color: '#fff',
        fontWeight: 500
      }

      let textStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
        margin: 'auto 10px',
        color: '#fff',
        fontSize: '0.7em',
        fontWeight: 500
      }

      let hrStyle = {
        transform: 'rotate(90deg)',
        borderTop: '1px solid #eee',
        borderColor: '#000',
        width: 15,
        position: 'absolute'
      }

      hrStyle.marginLeft = (33 + validDaysOffset) + '%'

      return (
        <div style={timelineWrapper}>
          <hr style={hrStyle}/>
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

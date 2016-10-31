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
        height: 'auto',
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

      let timeBlock = {
        background: '#4caf50',
        height: 29,
        color: '#fff',
        fontWeight: 500,
        fontSize: '0.8em',
        textAlign: 'center',
        display: 'inline-block'
      }

      const { startDate, endDate, effectivePeriods } = this.props

      if(!effectivePeriods || !effectivePeriods.length) {
        return null
      }

      return (
        <div style={timelineWrapper}>
          <div style={{display: 'inline-block', transform: 'translateY(25px)'}}>{this.props.line}</div>
          <div style={timelineStyle}>
              <div key={'timeline-header-wrapper'+this.props.index} style={{borderBottom: '1px dotted #74766d'}}>
              { effectivePeriods.map( (effectivePeriod, index) => {

                let periodBlock = {...timeBlock}
                periodBlock.width = (effectivePeriod.timelineEndPosition - effectivePeriod.timelineStartPosition) + '%'

                if (index == 0) {
                  periodBlock.marginLeft = (effectivePeriod.timelineStartPosition + '%')
                } else {
                  periodBlock.marginLeft = (effectivePeriod.timelineStartPosition - effectivePeriods[index-1].timelineEndPosition) + '%'
                }

                periodBlock.background = this.validationColors[effectivePeriod.validationLevel]

                let itemText = effectivePeriod.to

                if (effectivePeriod.timelineStartPosition > 0) {
                  itemText = effectivePeriod.from + ' - ' + effectivePeriod.to
                }

                return (
                    <div
                      key={'timeline-header-block'+index}
                      style={periodBlock}>
                      <span style={{color: '#fff'}}>{itemText}</span>
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

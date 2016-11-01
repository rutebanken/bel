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

    this.state = {
      showTooltip: false
    }
  }

  handleToggleToolTip() {
    this.setState({
      showTooltip: !this.state.showTooltip
    })
  }

  render() {

      const timelineStyle = {
        border: '1px solid black',
        borderRadius: 2,
        background: '#b20000',
        height: 'auto',
        width: '85%',
        margin: 'auto',
        display: 'block',
        overflow: 'auto',
        fontSize: '0%'
      }

      const timelineWrapper = {
        width: '100%'
      }

      let timeBlock = {
        background: '#4caf50',
        height: 30,
        color: '#449d48',
        fontWeight: 500,
        fontSize: '0.8rem',
        textAlign: 'center',
        display: 'inline-block'
      }

      const toolTipStyle = {
        position: 'absolute',
        fontSize: '0.8em',
        color: '#fff',
        background: '#191919',
        padding: 8,
        display: 'inline-block',
        width: 600,
        zIndex: 999999
      }

      const textSpanStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#fff',
        verticalAlign: 'text-bottom'
      }

      const { startDate, endDate, effectivePeriods, validDaysOffset, validFromDate } = this.props
      const { showTooltip } = this.state

      if(!effectivePeriods || !effectivePeriods.length) {
        return null
      }

      let hrStyle = {
        transform: 'rotate(90deg)',
        borderTop: '1px dotted #eee'
      }

      hrStyle.marginLeft = validDaysOffset + '%'

      let validDateStyle = {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        zIndex: 999999,
        marginTop: 5,
        fontWeight: 600
      }

      validDateStyle.marginLeft = (50 - validDaysOffset) + '%'

      return (
        <div style={timelineWrapper}
          >
          <div
            style={{display: 'inline-block', cursor: 'pointer', transform: 'translate(12px, 36px)'}}
            onMouseOver={this.handleToggleToolTip.bind(this)}
            onMouseLeave={this.handleToggleToolTip.bind(this)}
            >
            {this.props.line}
            { showTooltip
              ?
              <div style={toolTipStyle}>
                {this.props.hoverText}
             </div>
             : null
           }
          </div>
            { this.props.index ? null : <div style={validDateStyle}>{validFromDate}</div>}
            <hr style={hrStyle}/>
            <div style={timelineStyle}
              >
              <div
                key={'timeline-header-wrapper'+this.props.index}
                >
              { effectivePeriods.map( (effectivePeriod, index) => {

                let periodBlock = {...timeBlock}
                periodBlock.width = (effectivePeriod.timelineEndPosition - effectivePeriod.timelineStartPosition) + '%'

                if (index == 0) {
                  periodBlock.marginLeft = (effectivePeriod.timelineStartPosition + '%')
                } else {
                  periodBlock.marginLeft = (effectivePeriod.timelineStartPosition - effectivePeriods[index-1].timelineEndPosition) + '%'
                }

                let itemText = effectivePeriod.to

                if (effectivePeriod.timelineStartPosition > 0) {
                  itemText = effectivePeriod.from + ' - ' + effectivePeriod.to
                }

                return (
                    <div
                      key={'timeline-header-block'+index}
                      style={periodBlock}>
                      <span style={textSpanStyle}>{itemText}</span>
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

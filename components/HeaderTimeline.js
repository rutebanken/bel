import React from 'react'

class HeaderTimeline extends React.Component {

  constructor(props) {
    super(props)
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
        borderRadius: 5,
        background: '#B91919',
        height: 18,
        width: '85%',
        margin: 'auto',
        display: 'block',
        overflow: 'auto',
        fontSize: '0%'
      }

      let timelineWrapper = {
        width: '100%',
        marginBottom: 2
      }

      let timeBlock = {
        background: '#5DAE5D',
        height: 'auto',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.8rem',
        textAlign: 'center',
        display: 'inline-block'
      }

      const toolTipStyle = {
        position: 'relative',
        transition: 'opacity 1s',
        display: 'inline',
        fontSize: '0.8em',
        color: '#fff',
        background: '#191919',
        padding: 2,
        width: 'auto',
        zIndex: 999999
      }

      const textSpanStyle = {
        color: '#fff',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: 18
      }

      const { effectivePeriods, validDaysOffset } = this.props
      const { showTooltip } = this.state


      let hrStyle = {
        transform: 'rotate(90deg) translateX(20px)',
        borderTop: '1px dotted',
        borderColor: '#000',
        marginTop: 9,
        width: 15,
        position: 'relative',
      }

      hrStyle.marginLeft = (33 + validDaysOffset) + '%'


      return (
        <div style={timelineWrapper}
          >
          <div
            style={{display: 'inline-block', cursor: 'pointer', transform: 'translate(12px, 30px)', fontSize: '1vw', color: effectivePeriods.length ? '#000' : 'red'}}
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
                      <div style={textSpanStyle}>
                          <div className="period-block" style={{height: '100%', color: '#fff', verticalAlign: 'middle'}}>{itemText}</div>
                      </div>
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

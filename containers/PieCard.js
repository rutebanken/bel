import React, { PropTypes } from 'react'
import { Pie as PieChart } from 'react-chartjs'
import { Card, CardText } from 'material-ui/Card'
import { color } from 'bogu/styles'

import { segmentName, segmentColor } from 'bogu/utils'

class PieCard extends React.Component {

  static propTypes = {
    stats: PropTypes.object.isRequired,
    handlePieOnClick: PropTypes.func.isRequired,
    handleshowAllClick: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      size: 200,
    }
  }

  updateDimensions = () => {
    this.setState({size: Math.round(window.innerHeight/4)})
  }

  componentWillMount() {
    this.updateDimensions()
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {

    const showAllStyle = {
      color: 'rgb(17, 105, 167)',
      fontWeight: 600,
      textDecoration: 'underline',
      cursor: 'pointer',
      marginTop: 10,
      textAlign: 'center'
    }

    const pieStyle = {
      width: this.state.size,
      height: this.state.size,
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
      cursor: 'pointer',
    }

    const pieOptionsFull = {
      animation: false,
      showTooltips: true,
      responsive: true,
      tooltipTemplate: "<%= label %> - <%= value %>"
    }

    const { stats } = this.props

    const valid = stats.valid.lineNumbers.length
    const invalid = stats.invalid.lineNumbers.length
    const expiring = stats.expiring.lineNumbers.length
    const dynamic = [] //stats.validity.filter( lines => lines.numDaysAtLeastValid > -1 && lines.numDaysAtLeastValid < 120).reverse()

    const pieData = [
      {
        value: valid,
        highlight: color.valid,
        color: color.highlight.valid,
        label: segmentName('valid', 0, 'nb'),
      },
      {
        value: expiring,
        color: color.expiring,
        highlight: color.highlight.expiring,
        label: segmentName('expiring', 0, 'nb'),
      }
    ]

    for (let i in dynamic) {
      const category = dynamic[i]
      const numDays = category.numDaysAtLeastValid
      const length = category.lineNumbers.length

      pieData.push({
          value: length,
          color: segmentColor(numDays),
          highlight: segmentColor(numDays, 20),
          label: segmentName('dynamic', numDays, 'nb'),
        }
      )
    }
    pieData.push(
      {
      value: invalid,
      color: color.invalid,
      highlight: color.highlight.invalid,
      label: segmentName('invalid', 0, 'nb'),
    })

    return (
      <Card style={{margin: '0.5vh 0.7vw'}}>
        <CardText>
          <PieChart ref="chart" onClick={(e) => { this.props.handlePieOnClick(e, this.refs.chart.getChart()) } } data={pieData} style={pieStyle} options={pieOptionsFull} width={this.state.size} height={this.state.size}/>
          <div onClick={() => this.props.handleshowAllClick()} style={showAllStyle}>Vis alle</div>
        </CardText>
      </Card>
    )

  }
}

export default PieCard



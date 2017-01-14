import React, { PropTypes } from 'react'
import { Pie as PieChart } from 'react-chartjs'
import { Card, CardText } from 'material-ui/Card'
import { color } from '../styles/styles'

import { segmentName } from '../util/dataManipulation'

class PieCard extends React.Component {

  static propTypes = {
    stats: PropTypes.object.isRequired,
    handlePieOnClick: PropTypes.func.isRequired,
    handleshowAllClick: PropTypes.func.isRequired
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

    let pieOptionsFull = {
      animation: false,
      showTooltips: true,
      responsive: true,
      tooltipTemplate: "<%= label %> - <%= value %>"
    }

    const { stats } = this.props

    const valid = stats.valid.lineNumbers.length
    const invalid = stats.invalid.lineNumbers.length
    const soonInvalid = stats.soonInvalid.lineNumbers.length
    const expiring = stats.validity.filter( lines => lines.numDaysAtLeastValid > 0 && lines.numDaysAtLeastValid < 120).reverse()

    const pieData = [
      {
        value: valid,
        highlight: color.valid,
        color: color.highlight.valid,
        label: segmentName('valid'),
      },
      {
        value: soonInvalid,
        color: color.soonInvalid,
        highlight: color.highlight.soonInvalid,
        label: segmentName('soonInvalid'),
      }
    ]

    for (let i in expiring) {
      let category = expiring[i]
      let numDays = category.numDaysAtLeastValid
      let length = category.lineNumbers.length

      pieData.push({
          value: length,
          color: 'rgba(80, 150, 80, ' + numDays/90.0 + ')', // TODO fix (160 - numDays).toString(16),
          highlight: 'rgba(100, 150, 100, ' + numDays/90.0 + ')',
          label: segmentName('dynamic', numDays),
        }
      )
    }
    pieData.push(
      {
      value: invalid,
      color: color.invalid,
      highlight: color.highlight.invalid,
      label: segmentName('invalid'),
    })

    return (
      <Card style={{margin: '0vw 0.7vw'}}>
        <CardText>
          <PieChart ref="chart"  onClick={(e) => { this.props.handlePieOnClick(e, this.refs.chart.getChart()) } } data={pieData} width="auto" height="250"  options={pieOptionsFull}/>
          <div onClick={() => this.props.handleshowAllClick()} style={showAllStyle}>Vis alle</div>
        </CardText>
      </Card>
    )

  }
}

export default PieCard



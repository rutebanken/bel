import React, { PropTypes } from 'react'
import { Pie as PieChart } from 'react-chartjs'
import { Card, CardText } from 'material-ui/Card'
import { color } from '../components/styles'

class PieCard extends React.Component {

  static propTypes = {
    stats: PropTypes.object.isRequired,
    handlePieOnClick: PropTypes.func.isRequired,
    handleshowAllClick: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.segmentMap = {
      'Linjer i gyldig periode' : 'valid',
      'Linjer med gyldighetsperiode som snart utgår' : 'soonInvalid',
      'Linjer med manglende gyldighetsperiode' : 'invalid',
      'valid' : 'Linjer i gyldig periode',
      'soonInvalid' : 'Linjer med gyldighetsperiode som snart utgår',
      'invalid' : 'Linjer med manglende gyldighetsperiode',
      'all' : 'Alle linjer',
      'Alle linjer' : 'all'
    }
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

    const pieData = [
      {
        value: valid,
        highlight: color.valid,
        color: color.font.valid,
        label: this.segmentMap['valid'],
      },
      {
        value: soonInvalid,
        color: color.font.expiring,
        highlight: color.expiring,
        label: this.segmentMap['soonInvalid'],
      },
      {
        value: invalid,
        color: color.font.invalid,
        highlight: color.invalid,
        label: this.segmentMap['invalid'],
      }
    ]

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



import React from 'react'
import { Pie as PieChart } from 'react-chartjs'
import Chart from 'chartjs'
import UserActions from '../actions/UserActions'
import Error from 'material-ui/svg-icons/alert/error'

class Status extends React.Component {

  render() {

    const pieOptions = {
      animatable: true,
      showTooltips: true,
      onAnimationComplete: function() {
          console.log("animation complete")
      },
      tooltipTemplate: "<%= label %> - <%= value %>"
    }

    const handlePieOnClick = (e) => {
      let chart = this.refs.chart.getChart()
      let clickedSegment = chart.getSegmentsAtEvent(e)
      const {dispatch} = this.props
      dispatch(UserActions.openReportsModal(clickedSegment[0].label))
    }

    const handleViewAll = () => {
      const {dispatch} = this.props
      dispatch(UserActions.openReportsModal("ALL"))
    }

    const pieData = [
      {
        value: 82,
        highlight: "#4caf50",
        color: "#449d48",
        label: "Succesful validations"
      },
      {
        value: 50,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Warnings"
      },
      {
        value: 592,
        color: "#b20000",
        highlight: "#cc0000",
        label: "Errors"
      }
    ]

    const viewAllStyle = {cursor: "pointer", color: "#2196F3"}

    return (
      <div style={{verticalAlign: 'flex', flexRow: 'row wrap', justifyContent: 'space-around', padding: '10%'}}>
        <div style={{marginTop: 20, fontSize: '2em', flex: '1 100%'}}>
          <div style={{textAlign: 'center', padding: 10}}>
            <Error style={{verticalAlign: 'middle', height: 44, width: 44}} color="#cc0000"/>
            <span>Your data expired 2016-07-07 00:00:00</span>
          </div>
        </div>
        <div style={{textAlign: 'center'}}>
          <PieChart ref="chart" onClick={(e) => { handlePieOnClick(e) } } data={pieData} width="auto" height="600px" options={pieOptions}/>
        </div>
        <div>
          <span onClick={() => handleViewAll()} style={ viewAllStyle }>[ View all ]</span>
        </div>
      </div>
    )
  }
}

export default Status

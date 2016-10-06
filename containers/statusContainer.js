import React from 'react'
import {Pie as PieChart} from "react-chartjs"
import Chart from 'chartjs'
const FaError = require('react-icons/lib/fa/close')
import UserActions from '../actions/UserActions'

class StatusContainer extends React.Component {

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

    const captionClass = { fontSize: "1.1em", marginBottom: "20px" }

    const chartClass = { marginTop: "50px", marginLeft: "20%"}

    const viewAllStyle = {cursor: "pointer", textDecoration: "underline", color: "#2196F3"}

    return (
      <div>
        <span style={captionClass}><FaError height="42px" width="42px" color="#cc0000"/> Your data expired 2016-07-07 00:00:00!</span>
        <PieChart ref="chart" onClick={(e) => { handlePieOnClick(e) } } style={chartClass} data={pieData} width="400px" height="300px" options={pieOptions}/>
        <div>
          <span onClick={() => handleViewAll()} style={ viewAllStyle }>[ View all ]</span>
        </div>
      </div>
    )
  }
}

export default StatusContainer

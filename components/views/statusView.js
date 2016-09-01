import React from 'react'
import {Pie as PieChart} from "react-chartjs"
import Chart from 'chartjs'
const FaError = require('react-icons/lib/fa/close')

const StatusView = (props) => {

  const pieOptions = {
    animatable: true,
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

  const captionClass = {
    fontSize: "1.1em",
    marginBottom: "20px"
  }

  const chartClass = {
    marginTop: "50px",
    marginLeft: "20%"
  }

  return (
    <div>
      <span style={captionClass}><FaError height="42px" width="42px" color="#cc0000"/> Your data expired 2016-07-07 00:00:00!</span>
      <PieChart style={chartClass} data={pieData} width="400px" height="300px" options={pieOptions}/>
    </div>
  )
}

export default StatusView

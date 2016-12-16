import React, { Component } from 'react'
import { Line } from 'react-chartjs'

export default class Chart extends Component {
  constructor (props) {
    super(props)
    this.chartData = {
      labels: ["2007", "2008", "2009", "2010", "2011", "2012", "2013"],
      datasets: [
        {
          label: "Men",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [106898, 103937, 99492, 87213, 101943, 118848, 103120]
        },
        {
          label: "Female",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [97516, 94796, 91818, 79673, 94684, 110633, 95993]
        }
      ]
    }
    this.chartOptions = {
      responsive: true,
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      scaleShowHorizontalLines: true,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      offsetGridLines: false
    }
  }

  render () {
    return (
      <div className="wrap__content">
        <span className="wrap__content-title">Data Analysis</span>
        <Line data={this.chartData} options={this.chartOptions} />
      </div>
    )
  }
}
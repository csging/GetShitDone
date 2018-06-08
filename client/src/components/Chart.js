import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';



class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'],
        datasets: [
          {
            label: 'Tasks Complete',
            data: [
              6,
              9,
              3,
              5,
              5,
              3,
              8
            ],
            backgroundColor: [

              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(54, 162, 235, 0.6)'


            ]
          }, {

            label: 'Weekly Goal',
            type: "line",
            borderColor: "white",
            fillColor: "rgba(#0)",
            // strokeColor: "rgba(220,220,220,1)",
            // pointColor: "rgba(220,220,220,1)",
            // pointStrokeColor: "#fff",
            // pointHighlightFill: "#fff",
            // pointHighlightStroke: "rgba(220,220,220,1)",
            data: [
              5,
              5,
              5,
              5,
              5,
              5,
              5
            ]
          }

        ]
      },


      chartData2: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        datasets: [
          {
            label: 'Tasks Complete',
            data: [
              42,
              50,
              27,
              35
            ],
            backgroundColor: [

              'rgba(0, 0, 235, 0.6)',
              'rgba(0, 0, 235, 0.6)',
              'rgba(0, 0, 235, 0.6)',
              'rgba(0, 0, 235, 0.6)',
          
            ]
          }, {

            label: 'Monthly Goal',
            type: "line",
            
                        
            lineColor: "red",
            data: [
              35,
              35,
              35,
              35

            ],
            borderColor: "white",
          }

        ]
      }




    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'This week',
              fontsize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.LegendPosition

            }

          }}
        />


        <Bar
          data={this.state.chartData2}
          options={{
            title: {
              display: this.props.displayTitle,
              text: 'This Month',
              fontsize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.LegendPosition

            }

          }}
        />


      </div>
    )


  }

}

export default Chart;
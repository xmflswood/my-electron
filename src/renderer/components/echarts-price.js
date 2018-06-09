export default function (index) {
  let options = {
    grid: {
      x: 50,
      y: 80,
      x2: 50,
      y2: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: [
      {
        boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#d8d8d8'
        },
        axisTick: false
      }
    ],
    yAxis: [
      {
        splitLine: false,
        axisTick: false,
        axisLine: {
          show: false
        },
        axisLabel: {
          color: '#d8d8d8',
          show: true
        }
      }
    ],
    series: []
  }
  let s = []
  let t = index % 3
  switch (t) {
    case 0:
      s = [
        {
          type: 'line',
          symbolSize: 0,
          lineStyle: {
            opacity: 0
          },
          itemStyle: {
            color: 'Yellow'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'Yellow'
              }, {
                offset: 1, color: '#FF5000'
              }]
            }
          },
          data: []
        },
        {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          data: [],
          lineStyle: {
            color: 'red',
            type: 'dotted'
          }
        }
      ]
      break
    case 1:
      s = [
        {
          type: 'bar',
          symbolSize: 0,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#00afef'
              }, {
                offset: 1, color: '#0070c0'
              }]
            }
          },
          data: []
        },
        {
          type: 'line',
          smooth: true,
          symbolSize: 0,
          data: [],
          itemStyle: {
            color: 'Yellow'
          },
          lineStyle: {
            color: 'yellow',
            type: 'dotted'
          }
        }
      ]
      break
    case 2:
      s = [
        {
          type: 'line',
          symbolSize: 0,
          lineStyle: {
            color: 'yellow'
          },
          itemStyle: {
            color: 'Yellow'
          },
          data: []
        },
        {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          data: [],
          itemStyle: {
            color: 'green'
          },
          lineStyle: {
            color: 'green',
            type: 'dotted'
          }
        }
      ]
      break
  }
  options.series = s
  if (t === 1) {
    options.xAxis[0].boundaryGap = true
  }
  return options
}

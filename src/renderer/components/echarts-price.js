export default function (index) {
  let options = {
    grid: {
      x: 50,
      y: 80,
      x2: 20,
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
        data: [
          '1',
          '2',
          '3',
          '321'
        ],
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
          data: [30, 90, 60, 20]
        },
        {
          type: 'line',
          smooth: true,
          data: [4, 200, 3],
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
          data: [30, 90, 60, 20]
        },
        {
          type: 'line',
          smooth: true,
          data: [4, 200, 3],
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
          lineStyle: {
            color: 'yellow'
          },
          itemStyle: {
            color: 'Yellow'
          },
          data: [30, 90, 60, 20]
        },
        {
          type: 'line',
          smooth: true,
          data: [4, 200, 3],
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

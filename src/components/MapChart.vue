<template>
  <div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts'
import mapJson from '@/assets/china.json'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const target = ref(null)
let mChart = null
onMounted(() => {
  echarts.registerMap('china', mapJson)
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    timeline: {
      data: props.data.voltageLevel,
      axisType: 'category',
      autoPlay: true,
      playInterval: 3000,
      left: '10%',
      right: '10%',
      bottom: '0%',
      width: '80%',
      label: {
        color: '#ddd'
      },
      emphasis: {
        label: {
          color: '#fff'
        },
        itemStyle: {
          color: '#aaa',
          borderColor: '#aaa'
        }
      },
      symbolSize: 10,
      lineStyle: {
        color: '#555'
      },
      checkpointStyle: {
        borderColor: '#888',
        borderWidth: 2
      },
      contorlStyle: {
        showNextBtn: true,
        showPrewBtn: true,
        color: '#666',
        borderColor: '#666'
      }
    },
    baseOption: {
      grid: {
        right: '2%',
        top: '15%',
        bottom: '10%',
        width: '20%'
      },
      geo: {
        show: true,
        map: 'china',
        roam: true,
        zoom: 0.8,
        center: [113.83531246, 34.0267395887],
        itemStyle: {
          borderColor: 'rgba(147, 235, 248,1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(147, 235, 248, 0)'
              },
              {
                offset: 1,
                color: 'rgba(147, 235, 248, 0.2)'
              }
            ]
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        }
      }
    },
    options: []
  }
  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroundColor: '#142037',
      title: [
        {
          text: '2019-2023 年度数据统计',
          left: '0%',
          top: '0%',
          textStyle: {
            color: '#ccc',
            fontSize: 30
          },
        },
        {
          id: 'statistic',
          text: item + '年数据统计情况',
          right: '0%',
          top: '4%',
          textStyle: {
            color: '#ccc',
            fontSize: 20
          }
        }
      ],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 2,
          color: '#aaa'
        }
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          color: '#ddd'
        },
        data: props.data.categoryData[item].map(item => item.name)
      },
      series: [
        {
          type: 'bar',
          zlevel: 1.5,
          itemStyle: {
            color: props.data.colors[index]
          },
          data: props.data.categoryData[item].map(item => item.value)
        },
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: props.data.topData[item],
          symbolSize: function (val) {
            return val[2] / 6
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            show: true,
            formatter: '{b}',
            position: 'right'
          },
          itemStyle:{
            color:props.data.colors[index],
            shadowBlur: 5,
            shadowColor: props.data.colors[index]
          }
        }
      ]
    })
  })

  mChart.setOption(options)
}
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped></style>
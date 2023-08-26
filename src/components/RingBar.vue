<template>
  <div>
    <div class=" text-center">[大区异常处理]</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

const getSeriesData = () => {
  const series = []
  props.data.abnormals.forEach((item, index) => {
    series.push({
      name: item.name,
      type: 'pie',
      clockwise: false,
      emphasis: {
        scale: false
      },
      radius: [80 - index * 15 + '%', 72 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show: false
      },
      data: [
        {
          value: item.value,
          name: item.name
        },
        {
          value: 1000,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          tooltip: {
            show: false
          },
          emphasis: {
            scale: false
          }
        }
      ]
    })

    series.push({
      name: item.name,
      type: 'pie',
      silent: true,
      z: 1,
      clockwise: false,
      emphasis: {
        scale: false
      },
      radius: [80 - index * 15 + '%', 72 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show: false
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: 'rgb(3,31,62)',
            borderWidth: 0
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: false
          }
        },
        {
          value: 2.5,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: false
          }
        }
      ]
    })
  })

  return series
}
const renderChart = () => {
  const options = {
    legend: {
      show: true,
      icon: 'circle',
      top: '14%',
      left: '60%',
      data: props.data.abnormals.map(item => item.name),
      width: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        fontSize: 13,
        lineHeight: 5,
        color: 'rgba(255,255,255,0.8)'
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{a}<br>{b}:{c}({d}%)'
    },
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        }
      }
    ],
    xAxis: [
      {
        show: false
      }
    ],
    series: getSeriesData()
  }
  mChart.setOption(options)
}
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped></style>
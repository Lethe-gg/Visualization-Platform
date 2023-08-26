<template>
  <div>
    <div>【云端报警风险】</div>
    <div ref="target" class=" h-full w-full"></div>
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

const renderChart = () => {
  const options = {
    radar: {
      axisName: {
        fontSize:14,
        color: '#05D5F1'
      },
      shape: 'polygon',
      center: ['50%', '50%'],
      radius: '80%',
      startAngle: 120,
      axisLine: {
        lineStyle: {
          color: 'rgba(5,213,255,0.8)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(5,213,255,0.8)'
        }
      },
      indicator: props.data.risks.map(item => ({
        name: item.name,
        max: 100
      })),
      splitArea: {
        show: false
      }
    },
    polar: {
      center: ['50%', '50%'],
      radius: '0%'
    },
    angleAxis: {
      min: 0,
      interval: 5,
      clockwise: false
    },
    radiusAxis: {
      min: 0,
      interval: 20,
      splitLine: {
        show: true
      }
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: '#05D5FF'
      },
      areaStyle: {
        color: '#05D5FF',
        opcity: 0.5
      },
      lineStyle: {
        width: 2,
        color: '#05D5FF'
      },
      label: {
        show: true,
        color: '#fff'
      },
      data: [{
        value: props.data.risks.map(item => item.value)
      }]
    }]
  }
  mChart.setOption(options)
}
watch(() => props.data, () => {
  renderChart()
})
</script>

<style lang="scss" scoped></style>
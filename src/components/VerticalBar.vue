<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
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
    xAxis: {
      type: 'category',
      data: props.data.servers.map(item => item.name),
      axisLabel: {
        color: '#9EB1C8'
      }
    },
    yAxis: {
      type: 'value',
      show: false,
      max: function (value) {
        return parseInt(value.max * 1.2)
      }
    },
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true
    },
    series: [
      {
        // realtimeSort: true,
        type: 'bar',
        data: props.data.servers.map(item => ({
          name: item.name,
          value: item.value
        })),
        itemStyle: {
          color: '#5D98CE',
          borderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: '{c}%'
        }
      }
    ]
  }
  mChart.setOption(options)
}
watch(()=> props.data, renderChart)
</script>

<style lang="scss" scoped></style>
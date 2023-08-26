<template>
  <div>
    <!-- <div>[大区数据信息]</div> -->
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

const renderChart = () => {
  const options = {
    xAxis: {
      type: 'value',
      show: false,
      max: function (value) {
        return parseInt(value.max * 1.2)
      }
    },
    yAxis: {
      type: 'category',
      data: props.data.regions.map((item) => item.name),
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9eb1c8'
      }
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    series: [
      {
        name: '[大区数据信息]',
        type: 'bar',
        colorBy: 'data',
        data: props.data.regions.map(item => ({
          name: item.name,
          value: item.value
        })),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color: '#5D98CE',
          borderRadius: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          postion: 'right',
          color: '#fff'
        }
      }]
  }
  mChart.setOption(options)
}
watch(()=> props.data, ()=>{
  renderChart()
})
</script>

<style lang="scss" scoped></style>
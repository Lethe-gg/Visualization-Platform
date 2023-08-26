<template>
  <div>
    <div>[大区数据信息]</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
console.log(props.data);
const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = echarts.init(target.value)
  renderChart()
})

const renderChart = () => {
  const options = {
    xAxis: {},
    yAxis: {},
    grid: {},
    series: {}
  }
  mChart.setOptions(options)
}
</script>

<style lang="scss" scoped></style>
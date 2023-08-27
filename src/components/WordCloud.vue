<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts'
import 'echarts-wordcloud'

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
    series: {
      type: 'wordCloud',
      sizeRange: [8, 46],
      rotationRange: [0, 0],
      gridSize: 1,
      layoutAnimation: true,
      textStyle: {
        // Color can be a callback function or a color string
        color: function () {
          // Random color
          return 'rgb(' + [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
          ].join(',') + ')';
        }
      },
      emphasis: {
        textStyle: {
          fontWeight: 'bold',
          textShadowColor: '#333'
        }
      },
      data: props.data.datas
    }
  }
  mChart.setOption(options)
}
watch(() => props.data, renderChart)
</script>

<style lang="scss" scoped></style>
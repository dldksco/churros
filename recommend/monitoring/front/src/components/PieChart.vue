<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'PieChart',
  components: { Pie },
  props:{
    dataset: {
        type: Object
    }
  },
  data() {
    return {
      chartData: {
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
            {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
            }
        ]
        },
      chartOptions: {
        responsive: false,
        maintainAspectRatio: false,
        height: '1000px',
        width: '800px'
      }
    }
  },
  watch: {
    dataset(newValue){
        console.log(`newValue : ${newValue}`)
        this.chartData = Object.assign({}, this.chartData, {
            labels : Object.keys(newValue),
            datasets: [{
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: Object.values(newValue)
            }]
        });
    }
  }
}
</script>
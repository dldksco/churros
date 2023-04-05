<template>
  <div id="id">
    <!-- <p>Res: {{ result }} </p> -->
    <PieChart :dataset="result" :height="500" :width="800" class="my-5"/>
  </div>
</template>

<script>
import {api} from "../utils/axios"
import PieChart from "./PieChart"

export default {
    components: {
        PieChart
    },
    data() {
      return {
        result: {},
        keys: [],
        values: [],
      }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData() {
            console.log("mounted!")
            api.dataset()
            .then((res) =>{
                this.result = res.data;
            });
        }
    }
  }
</script>

<style scoped>
    .row {
        display: flex;
    }
</style>
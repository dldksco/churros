<template>
  <div id="id">
    <label for="datepicker_start">검색 시작일</label>
    <b-form-datepicker id="datepicker_start" v-model="start_day" :max="end_day" class="my-2"></b-form-datepicker>
    <label for="datepicker_end">검색 종료일</label>
    <b-form-datepicker id="datepicker_end" v-model="end_day" :min="start_day" class="my-2"></b-form-datepicker>
    <b-button variant="outline-secondary" @click="getData" class="my-2">조회하기</b-button>

    <div class="d-flex justify-content-around">
      <!-- <p> 데이터 수집 성공 </p> -->
      <BarChart :news="data" :info="success" :height="500" :width="800"/>
      <!-- <p> 데이터 수집 실패 </p> -->
      <BarChart :news="data2" :info="fail" :height="500" :width="800"/>
    </div>
    
  </div>
</template>

<script>
import {api} from "../utils/axios"
import BarChart from "./Chart"

export default {
    components: {
      BarChart
    },
    data() {
      const now = new Date();
      return {
        start_day: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        end_day: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        result: {},
        data: [],
        result2: {},
        data2: [],
        success: 0,
        fail: 1,
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
        getData() {
            console.log("click!")
            api.success({"start_day" : this.start_day, "end_day" : this.end_day})
            .then((res) =>{
                this.result = res.data.success;
                this.data = Object.values(this.result);
                this.result2 = res.data.fail;
                this.data2 = Object.values(this.result2);
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
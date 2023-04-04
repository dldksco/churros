<template>
  <div id="id">
    <label for="datepicker_start">검색 시작일</label>
    <b-form-datepicker id="datepicker_start" v-model="start_day" :max="end_day" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ start_day }}'</p>
    <label for="datepicker_end">검색 종료일</label>
    <b-form-datepicker id="datepicker_end" v-model="end_day" :min="start_day" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ end_day }}'</p>
    <b-button variant="outline-secondary" @click="getData" >Secondary</b-button>
    <p>Res: {{ result }} </p>
  </div>
</template>

<script>
import {api} from "../utils/axios"
export default {
    data() {
        const now = new Date()
      return {
        start_day: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        end_day: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        result: ''
      }
    },
    methods:{
        getData() {
            console.log("click!")
            api.success({"start_day" : this.start_day, "end_day" : this.end_day})
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
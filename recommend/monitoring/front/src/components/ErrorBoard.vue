<template>
  <div id="id">
    <label for="datepicker_start">검색 시작일</label>
    <b-form-datepicker id="datepicker_start" v-model="start_day" :max="end_day" class="mb-2"></b-form-datepicker>
    <label for="datepicker_end">검색 종료일</label>
    <b-form-datepicker id="datepicker_end" v-model="end_day" :min="start_day" class="mb-2"></b-form-datepicker>
    
    <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>
    
    <b-button variant="outline-secondary" @click="getData" >조회하기</b-button>
    <p>Res: {{ result }} </p>
    <p>Data: {{ data }} </p>

  </div>
</template>

<script>
import {api} from "../utils/axios"

export default {
    components: {
    },
    data() {
      const now = new Date();
      return {
        start_day: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        end_day: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        selected: [], 
        options: [
          { text: 'CRAWLING', value: 'CRAWLING' },
          { text: 'DB', value: 'DB' },
          { text: 'ETC', value: 'ETC' },
        ],
        result: {},
        data: [],
      }
    },
    methods:{
        getData() {
            console.log("click!")
            api.error({"start_day" : this.start_day, "end_day" : this.end_day, "conditions" : this.selected})
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
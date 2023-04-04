<template>
  <div id="id">
    <label for="datepicker_start">검색 시작일</label>
    <b-form-datepicker id="datepicker_start" v-model="start_day" :max="end_day" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ start_day }}'</p>
    <label for="datepicker_end">검색 종료일</label>
    <b-form-datepicker id="datepicker_end" v-model="end_day" :min="start_day" class="mb-2"></b-form-datepicker>
    <p>Value: '{{ end_day }}'</p>
  </div>
</template>

<script>
export default {
    data() {
      return {
        start_day: '2023-03-01',
        end_day: '2023-03-31',
      }
    }
  }
</script>

<style scoped>
    .row {
        display: flex;
    }
</style>
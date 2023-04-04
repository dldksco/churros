<template>
  <div id="app">
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item to="/" exact exact-active-class="active">수집 현황</b-nav-item>
          <b-nav-item to="/about" exact exact-active-class="active">데이터</b-nav-item>
          <b-nav-item to="/some/route/bar" exact exact-active-class="active">에러</b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body>
        <router-view></router-view>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BNav, BNavItem } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('b-nav', BNav)
Vue.component('b-nav-item', BNavItem)

export default {
  name: 'HomeView',
  components: {
    BNav, 
    BNavItem
  }
}
</script>

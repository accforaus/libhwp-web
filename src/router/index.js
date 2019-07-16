import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/header/Header'
import Body from '../components/body/Body'
import Footer from '../components/footer/Footer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        body: Body,
        footer: Footer
      }
    }
  ]
})

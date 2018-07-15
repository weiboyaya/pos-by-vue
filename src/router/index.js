import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/Pos.vue'
import Goods from '@/components/Goods.vue'
import Member from '@/components/Member.vue'
import Store from '@/components/Store.vue'
import Statistical from '@/components/Statistical.vue'


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },{
      path: '/Pos',
      name: 'Pos',
      component: Pos
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods
    },
    {
      path:'/member',
      name:'member',
      component:Member
    },{
      path:'/store',
      name:'store',
      component:Store
    },{
      path:'/statistical',
      name:'statistical',
      component:Statistical
    }
  ]
})

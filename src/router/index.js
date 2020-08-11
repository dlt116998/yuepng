import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order/index.vue'
import Rhome from '../views/RHome/index.vue'
import Shop from '../views/Shop/index.vue'
import Refund from '../views/Order/Refund.vue'
import Role from '../views/Role/index.vue'
import Relese from '../views/Relese/index.vue'
import Active from '../views/Active/index.vue'
import NotFind from '../views/NotFind.vue'
import Login from '../views/Login/index.vue'
import SetOrder from '../views/Order/SetOrder.vue'
import ShopGood from '../views/Shop/ShopGood.vue'
import Service from '../views/Service/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/rhome',
    children:[{
      path:'rhome',
      name:'Rhome',
      component:Rhome,
      meta:{
        auth:true
      }
    },{
      path:'order',
      name:'Order',
      component:Order,
      meta:{
        auth:true
      }
    },{
      path:'shop',
      name:'Shop',
      component:Shop,
      meta:{
        auth:true
      }
    },{
      path:'refund',
      name:'Refund',
      component:Refund,
      meta:{
        auth:true
      }
    },{
      path:'role',
      name:'Role',
      component:Role,
      meta:{
        auth:true
      }
    },{
      path:'relese',
      name:'Relese',
      component:Relese,
      meta:{
        auth:true
      }
    },{
      path:'active',
      name:'Active',
      component:Active,
      meta:{
        auth:true
      }
    },{
      path:'setorder',
      name:'SetOrder',
      component:SetOrder,
      meta:{
        auth:true
      }
    },{
      path:'shopgood',
      name:'ShopGood',
      component:ShopGood,
      meta:{
        auth:true
      }
    },{
      path:'service',
      name:'Service',
      component:Service,
      meta:{
        auth:true
      }
    }]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'*',
    component:NotFind
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    let token = sessionStorage.getItem("token")
    //console.log(1)
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router

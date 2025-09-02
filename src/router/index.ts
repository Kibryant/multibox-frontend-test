import HomeScreen from '@/screens/HomeScreen.vue'
import PurchaseDetailScreen from '@/screens/PurchaseDetailScreen.vue'
import Purchases from '@/screens/PurchasesScreen.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeScreen
  },
  {
    path: '/purchases',
    name: 'PurchaseList',
    component: Purchases
  },
  {
    path: '/purchases/:id',
    name: 'PurchaseDetail',
    component: PurchaseDetailScreen,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

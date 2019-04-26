import Login from '@/views/login'
import Management from '@/views/management'

let router = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/management',
    component: Management,
    exact: false
  }
]

export default router

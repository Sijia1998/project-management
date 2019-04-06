import Login from '../component/login'
import Management from '../component/management'

let router = [
  {
    path: '/',
    component: Login,
    exact: true
  },
  {
    path: '/management',
    component: Management,
    exact: true
  }
]

export default router

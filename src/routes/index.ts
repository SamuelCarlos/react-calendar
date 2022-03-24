import { RouteConfig } from 'react-router-config'
import App from '../pages/App'
import Calendar from '../pages/Calendar'

const Routes: RouteConfig[] = [
  {
    path: '/',
    component: App,
    exact: true
  },
  {
    path: '/calendar',
    component: Calendar,
    exact: true
  }
]

export default Routes

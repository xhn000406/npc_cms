import {
  getToken
} from '@/utils/session'
import router from '@/router'

export default (to, from, next) => {
  const mToken = getToken()
  if (!mToken) {
    if (
      to.name === 'Login' ||
      to.name === 'Reg'
    ) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
  next()
}

export const setPower = () => {
  router.addRoutes()
}

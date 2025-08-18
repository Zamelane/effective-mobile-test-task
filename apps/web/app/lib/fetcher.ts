import ky from 'ky'

export const api = ky.extend({
  prefixUrl: 'http://localhost:3000/api/',
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const storage = localStorage.getItem('user')

        if (!storage) return

        const user = JSON.parse(storage)

        if (typeof user?.token === 'string') {
          request.headers.set('Authorization', `Bearer ${user.token}`)
        }
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error
        if (response.status === 403) {
          window.location.href = '/logout'
        }

        return error
      },
    ],
  },
})

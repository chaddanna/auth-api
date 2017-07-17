import Authentication from './controllers/authentication'
import passportService from './services/passport'
import passport from 'passport'

const requireAuth = passport.authenticate('jwt', { session: false })

export default (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' })
  })
  app.post('/signup', Authentication.signup)
  app.post('/signin', Authentication.signin)
}

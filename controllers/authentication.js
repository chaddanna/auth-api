import User from '../models/user'

export default {
  signup(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if ( !email || !password ) {
      return res.status(422).send({ error: 'You must provide an email and password' })
    }

    // See if a user with the given email does exist
    User.findOne({ email: email }, (err, existingUser) => {
      if (err) return next(err)

      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' })
      }

      // If a user with email does not exist, create and save user record
      const user = new User({
        email,
        password
      })

      user.save((err) => {
        if (err) return next(err)

        // Respond to request indicating the user was created
        res.json({ success: true })
      })
    })
  },

  signin(req, res, next) {
  }
}

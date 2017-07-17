import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// On Save hook, encrypt password
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    // hash (encrypt) password using salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err)

      // overwrite plain text password with encrypted password
      user.password = hash
      next()
    })
  })
})

// Create model class
const model = mongoose.model('user', userSchema)

// Export the model
export default model

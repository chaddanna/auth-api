import mongoose, { Schema } from 'mongoose'

// Define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// Create model class
const model = mongoose.model('user', userSchema)

// Export the model
export default model

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ek email se ek hi account banega
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user' // Default 'user' rahega, 'admin' role hum manual/special route se denge
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
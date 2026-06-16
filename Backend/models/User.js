import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'recruiter', 'admin'],
    default: 'student',
  },
  isApproved: {
    type: Boolean,
    default: function() {
      // Les étudiants et les admins sont approuvés par défaut.
      // Les recruteurs doivent être approuvés manuellement.
      return this.role === 'student' || this.role === 'admin';
    }
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

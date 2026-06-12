import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['Ouverte', 'Pourvue'],
    default: 'Ouverte',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Mission', missionSchema);

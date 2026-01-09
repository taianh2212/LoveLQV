const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  price: String,
  occasion: String,
  note: String
});

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: String, required: true },
  imageUrl: String
});

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: String,
  avatar: { type: String, required: true },
  dateOfBirth: String,
  anniversaryDate: { type: String, required: true },
  hobbies: [String],
  favoriteThings: [String],
  notes: String,
  phoneNumber: String,
  address: String,
  rating: { type: Number, default: 5, min: 1, max: 5 },
  isFavorite: { type: Boolean, default: false },
  gifts: [giftSchema],
  memories: [memorySchema],
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Partner', partnerSchema);

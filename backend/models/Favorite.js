const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieData: { type: Object, required: true }
}, { collection: 'favorites' });

module.exports = mongoose.model('Favorite', favoriteSchema);
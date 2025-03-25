const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieData: { type: Object, required: true }
}, { collection: 'watchlists' });

module.exports = mongoose.model('Watchlist', watchlistSchema);
const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
});

const Type = mongoose.model('typeList', typeSchema, 'typeList');

module.exports = Type;

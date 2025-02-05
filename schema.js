const mongoose = require('mongoose');

const menu = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required:true
    }
  });
  
const MenuItems = mongoose.model('MenuItem', menu);

module.exports = MenuItems;
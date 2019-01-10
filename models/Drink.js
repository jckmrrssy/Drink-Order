const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates schema for mango database
const recipeLiquorSchema = new Schema({ 
  name: String,
  volume: Number
 });

const drinkSchema = new Schema({
  name: { 
    type: String, 
    required: true 
    },
  liquors: [recipeLiquorSchema],
  // mixers: String,
  // garnishes: String,
  // glassType: String,
  prep: String,
  cost: Number,
  price: Number,
  // added to tie drinks to specific USER
  userID: {
    type: String, 
    required: true
  }
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
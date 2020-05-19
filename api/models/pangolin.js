// pangolin.js
import mongoose from 'mongoose';

const pangolinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  family: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, {collection : 'pangolins'});


pangolinSchema.index({ 'name': 1}, { "unique": true });

let Pangolin = mongoose.model('Pangolin', pangolinSchema);
export default Pangolin;
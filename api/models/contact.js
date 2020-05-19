// contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  pangolin_id: {
    type: String,
    required: true
  },
  contact_id: {
    type: String,
    required: true
  }

}, {collection : 'contacts'});

contactSchema.index({ 'pangolin_id': 1, 'contact_id': 1}, { "unique": true });

let Contact = mongoose.model('Contact', contactSchema);
export default Contact;
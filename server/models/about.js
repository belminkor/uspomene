import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  name: { type: 'String', required: true },
  text: { type: 'String', required: true },
  photo: { type: 'String', default: 'uspomene.png' },
  lastUpdated: { type: 'Date', default: Date.now },
});

export default mongoose.model('About', aboutSchema);

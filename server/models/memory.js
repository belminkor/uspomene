import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import autoincrement from 'mongoose-auto-increment-2';

const memorySchema = new Schema({
  memoryid: { type: 'Number' },
  activated: { type: 'Boolean' },
  personalInfo: {
    name: {
      first: { type: 'String', required: true },
      last: { type: 'String', required: true },
    },
    phone: { type: 'Number', required: true },
    email: { type: 'String', required: true },
    place: {
      city: { type: 'String', default: null },
      address: { type: 'String', default: null },
    },
  },
  deceased: {
    name: {
      first: { type: 'String', required: true },
      last: { type: 'String', required: true },
    },
    biography: { type: 'String', default: null },
    religion: { type: 'String', default: null },
    dateOfBirth: { type: 'Date', required: true },
    dateOfDeath: { type: 'Date', required: true },
    birthPlace: { type: 'String', default: null },
    latinBirthPlace: { type: 'String', default: null },
    placeOfDeath: { type: 'String', default: null },
    latinPlaceOfDeath: { type: 'String', default: null },
    deathCertificate: { type: 'String', required: true },
    photo: { type: ['String'], default: ['logofinalgold2.png'] },
    video: { type: 'String', default: null },
  },
  dateAdded: { type: 'Date', default: Date.now },
  premium: {
    isPremium: { type: 'Boolean', default: false },
    paidAt: { type: 'Date', default: '1970-01-01T21:35:41.969Z' },
    trackId: { type: 'String', default: '' },
    payStatus: { type: 'String', default: null },
  },
  note: { type: 'String', default: null },
  comment: { type: 'String', default: null },
  lastEdited: { type: 'Date', default: Date.now },
  status: { type: 'String', default: 'Obrada' },
});

memorySchema.plugin(autoincrement, { field: 'memoryid' });

export default mongoose.model('Memory', memorySchema);

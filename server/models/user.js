import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import autoincrement from 'mongoose-auto-increment-2';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  userid: { type: 'Number' },
  username: { type: 'String', unique: true, required: true },
  password: { type: 'String', required: true },
  email: { type: 'String', unique: true, required: true },
  permission: { type: 'String', default: 'Moderator' },
  dateAdded: { type: 'Date', default: Date.now },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(autoincrement, { field: 'userid' });

export default mongoose.model('User', userSchema);

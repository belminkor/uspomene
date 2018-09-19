import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const priceSchema = new Schema({ value: { type: Number, required: true } });

export default mongoose.model('Price', priceSchema);

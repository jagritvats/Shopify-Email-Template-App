import mongoose from 'mongoose';
const CatSchema = mongoose.Schema({
	name: String,
});

export const Cat = mongoose.model('Cat', CatSchema);

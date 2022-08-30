import mongoose from 'mongoose';
const TemplateSchema = new mongoose.Schema(
	{
		name: { type: String },

		data: [{}],
	},
	{ strict: false }
);

export const Template = mongoose.model('Template', TemplateSchema);

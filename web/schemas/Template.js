import mongoose from 'mongoose';
const TemplateSchema = mongoose.Schema(
	{
		name: { type: String },

		data: [{}],
	},
	{ strict: false }
);

export const Template = mongoose.model('Template', TemplateSchema);

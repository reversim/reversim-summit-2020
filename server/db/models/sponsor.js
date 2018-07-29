import mongoose from 'mongoose';

const SponsorSchema = new mongoose.Schema({
  name: String,
  logo: String,
  logoHover: String,
  url: String,
  description: String,
  featuredJobInfo: String,
  featuredJobLink: String,
  excludeWebsite: Boolean,
  created_at: Date,
  updated_at: Date
});

export default mongoose.model('Sponsor', SponsorSchema);
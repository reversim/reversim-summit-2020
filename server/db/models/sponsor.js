import mongoose from 'mongoose';

const SponsorSchema = new mongoose.Schema({
  name: String,
  logo: String,
  location: {
    link: String,
    shortAddress: String
  },
  socials: {
    linkdin: String,
    github: String,
    facebook: String,
    tweeter: String,
    medium: String,
  },
  logoHover: String,
  oneLiner: String,
  about: String,
  techStory: {
    text: String,
    technologies: [String]
  },
  openPositions: [{
    title: String,
    city: String,
    description: String,
    link: String
  }],
  url: String,
  images: [String],
  reversimAndUs: String,
  photos: [String],
  isPremium: Boolean,
  created_at: Date,
  updated_at: Date
});

export default mongoose.model('Sponsor', SponsorSchema);

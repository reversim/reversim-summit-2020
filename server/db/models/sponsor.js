import mongoose from 'mongoose';

const SponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  location: {
    link: String,
    shortAddress: String
  },
  socials: [{medium: String, link: String}],
  oneLiner: String,
  about: {
    type: String,
    required: true
  },
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
  url: {
    type: String,
    required: true
  },
  jobUrl: String,
  images: [String],
  reversimAndUs: String,
  isPremium: Boolean,
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Sponsor', SponsorSchema);

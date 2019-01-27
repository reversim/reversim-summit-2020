export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/ReversimSummit19';

export default {
  db
};

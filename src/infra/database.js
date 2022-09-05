import mongoose from 'mongoose';

export default {
  connect() {
    mongoose.connect(process.env.DATABASE_URL);
  },
};

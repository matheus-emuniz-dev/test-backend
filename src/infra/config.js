import dotenv from 'dotenv';

dotenv.config();

class Config {
  environment;

  databaseUrl;

  secret;

  constructor({ databaseUrl, secret }) {
    this.environment = process.env.NODE_ENV || 'development';
    this.databaseUrl = databaseUrl;
    this.secret = secret;
  }
}

const development = new Config({
  databaseUrl: process.env.DEV_DATABASE_URL,
  secret: process.env.DEV_SECRET,
});

const production = new Config({
  databaseUrl: process.env.DATABASE_URL,
  secret: process.env.SECRET,
});

export default {
  get() {
    switch (process.env.NODE_ENV) {
      case 'development':
        return development;
      case 'production':
        return production;
      default:
        return production;
    }
  },
};

class Config {
  environment;

  databaseUrl;

  secret;

  constructor({ databaseUrl, secret }) {
    this.environment = process.env.NODE_ENV;
    this.databaseUrl = databaseUrl;
    this.secret = secret;
  }
}

const development = new Config({
  environment: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  secret: process.env.SECRET,
});

const production = new Config({

});

export default {
  get() {
    switch (process.env.environment) {
      case 'development':
        return development;
      case 'production':
        return production;
      default:
        return development;
    }
  },
};

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/uspomene',
  port: process.env.PORT || 8000,
  secret: 'mernuspomene',
};

export default config;

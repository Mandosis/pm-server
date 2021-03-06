// import * as mongoose from 'mongoose';
import * as winston  from 'winston';

const mongoose = require('mongoose');

export function initializeDatabase(url?: string) {
  mongoose.Promise = require('bluebird');
  let MongoDB: any = mongoose.connect(process.env.DATABASE_URL || url).connection;

  MongoDB.on('open', () => {
    winston.info('Initilized database connection');
  });

  MongoDB.on('error', (err: any) => {
    winston.error(`Failed to connect to database: ${err}`);
  });
}

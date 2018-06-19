/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const chalk = require('chalk');// Terminal string styling done right
const debug = require('debug')('app:models');

/**
 * Connect to MongoDB.
 */
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI).then(
        () => {
            debug('Connect to MongoDB - OK');
        },
        err => {
            console.error(err);
            console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
            process.exit();
        }
    );
};
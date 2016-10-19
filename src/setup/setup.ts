import * as mongoose from 'mongoose';
import { User } from '../models/user';

const prompt = require('prompt');

class Setup {
    private _accountCreationQustions = {
        properties: {
            firstName: {
                name: 'First Name',
                required: true
            },
            lastName: {
                name: 'Last Name',
                required: true
            },
            username: {
                name: 'Username',
                required: true
            },
            email: {
                name: 'Email',
                required: true
            },
            password: {
                name: 'Password',
                hidden: true
            }
        }
    };



    /**
     * Bootstrap Setup
     */
    start() {
        this._askProfileQuestions();
    }


    /**
     * Prompt user for profile information
     */
    private _askProfileQuestions() {
        let questions = this._accountCreationQustions;

        prompt.start();
        prompt.message = '';
        prompt.delimiter = ':';

        prompt.get(questions, (err: any, result: any) => {
            if (err) {
                console.log(err);
            } else {
                this._createUser(result, (err: any, user: any) => {
                    console.log('User created!');
                });
            }
        });
    };

    /**
     * Create a new user account
     */
    private _createUser(result: any, callback: any) {
        let profile = {
            username: result.username,
            password: result.password,
            email: result.email,
            firstName: result.firstName,
            lastName: result.lastName,
            username_lower: result.username
        }

        User.create(profile, (err: any, user: any) => {
            callback(err, user);
        })


    }
};

let setup = new Setup();

setup.start();
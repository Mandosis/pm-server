import * as express from 'express';
import * as jwt     from 'jsonwebtoken';
import * as winston from 'winston';

import { User } from '../../models';

let router: any = express.Router();

router.post('/login', (req: any, res: any) => {
    User.findOne({ email: req.body.email.toLowerCase() }, (err: any, user: any) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Internal error.'
            });
        }

        authenticate(user);

    });

    function authenticate(user: any) {
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Username or password incorrect'
            });
        } else {
            user.comparePassword(req.body.password, (err: any, isMatch: boolean) => {
                if (isMatch) {
                    let profile = {
                        username: user.username,
                        email: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        admin: user.admin,
                        joined: user.joined
                    };

                    let token = jwt.sign(profile, process.env.SECRET, {
                        expiresIn: "1h"
                    });

                    res.json({
                        success: true,
                        message: 'User authenticated.',
                        data: {
                            token: token
                        }
                    });
                }
            })
        }
    }
});

// router.post('/users', (req: any, res: any) => {
//     let profile = {
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         username_lower: req.body.username
//     }

//     User.create(profile, (err: any, user: any) => {
//         if (err) {
//             res.status(500).json({
//                 success: false,
//                 message: 'Internal error.'
//             });
//         }

//         res.status(201).json({
//             success: true,
//             message: 'Account created.'
//         });
//     });

// });

export { router as ApiRoutes };

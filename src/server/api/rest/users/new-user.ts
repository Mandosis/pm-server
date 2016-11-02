import * as express from 'express';

import { User } from '../../../../models';

export function UserCreate(req: express.Request, res: express.Response) {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
    email:    req.body.email,
    first_name: req.body.first_name || req.body.firstName,
    last_name:  req.body.last_name  || req.body.lastName,
    username_lower: req.body.username
  });

  user.save((err: any, user: any) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });

      return;
    }

    res.status(201).json({
      success: true,
      message: 'Account created.'
    });
  });
}
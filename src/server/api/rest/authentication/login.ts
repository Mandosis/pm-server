import * as express from 'express';
import * as winston from 'winston';
import * as jwt     from 'jsonwebtoken';

import { User } from '../../../../models';

export function AuthLogin(req: express.Request, res: express.Response) {
  let email = req.body.email || req.body.username;
  let password = req.body.password;

  if (!email && !password) {
    res.status(400).json({
      success: false,
      message: 'Email or password missing.'
    });

    return;
  }


  User.findOne({ email: email }, (err: any, user: any) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });

      return;
    }

    if (user === undefined || user === null) {
      res.status(200).json({
        success: false,
        message: 'Email or password incorrect'
      });

      return;
    }

    user.comparePassword(password, (err: any, isMatch: boolean) => {
      if (!isMatch) {
        res.status(200).json({
          success: false,
          message: 'Email or password incorrect.'
        });
      }

      let userData = user.toJSON();
      delete userData.password;

      let tokenData: any = { id: userData._id };

      let accessToken = jwt.sign(tokenData, process.env.SECRET, {
        expiresIn: '1h'
      });

      res.json({
        success: true,
        message: 'User authenticated.',
        data: accessToken
      });

    })
  });
}
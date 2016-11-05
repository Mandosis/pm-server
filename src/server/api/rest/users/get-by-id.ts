import * as express from 'express';
import * as winston from 'winston';
import { User } from '../../../../models';

export function GetUserById(req: express.Request, res: express.Response) {
  let userId: string = req.params.id;

  winston.debug('userId:', userId);

  if (!userId) {
    res.status(400).json({
      success: false,
      message: 'User id missing.'
    });

    return;
  }

  User.findById(userId, (err: any, user: any) => {
    if (err) {
      winston.error(err);
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });

      return;
    }

    if (user === null || user === undefined) {
      res.status(404).json({
        success: false,
        message: 'User not found.'
      });

      return;
    }

    user = user.toJSON();
    delete user.password;

    res.status(200).json({
      success: true,
      message: 'User found.',
      data: user
    });
  });
}
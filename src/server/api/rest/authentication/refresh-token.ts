import * as express from 'express';
import * as winston from 'winston';
import * as jwt     from 'jsonwebtoken';

export function AuthRefreshToken(req: express.Request, res: express.Response) {
  let token = req.body.token;


  if (!token) {
    res.status(400).json({
      success: false,
      message: 'Access token missing.'
    });

    return;
  }

  jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(406).json({
        success: false,
        message: 'Access token not valid.'
      });

      return;
    }

    winston.debug(decoded);
    delete decoded.exp;
    let accessToken = jwt.sign(decoded, process.env.SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      success: true,
      message: 'Access token has been refreshed',
      data: accessToken
    });
  });
}
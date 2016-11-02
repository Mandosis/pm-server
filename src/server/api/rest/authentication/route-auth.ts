import * as express from 'express';
import * as jwt     from 'jsonwebtoken';

export function AuthRouteProtection(req: any, res: express.Response, next: express.NextFunction) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({
      success: false,
      message: 'Access token missing.'
    });

    return;
  }

  jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
    if (err) {
      res.status(401).json({
        success: false,
        message: 'Failed to authenticate token.'
      });

      return;
    }

    req.decoded = decoded;
    next();
  })
}
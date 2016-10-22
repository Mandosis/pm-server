import * as express from 'express';
import * as jwt     from 'jsonwebtoken';
import * as winston from 'winston';

import { User } from '../../models';

let router: express.Router = express.Router();

router.post('/auth/login', (req: express.Request, res: express.Response) => {
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
      res.status(200).json({
        success: false,
        message: 'Username or password incorrect'
      });
    } else {
      user.comparePassword(req.body.password, (err: any, isMatch: boolean) => {
        if (isMatch) {
          let tokenData: any = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            joined: user.joined,
          };

          let accessToken = jwt.sign(tokenData, process.env.SECRET, {
            expiresIn: "1h"
          });

          res.json({
            success: true,
            message: 'User authenticated.',
            data: accessToken
          });
        }
      })
    }
  }
});

router.post('/auth/refresh', (req: express.Request, res: express.Response) => {
  let token = req.body.token;

  jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
    if (err || !decoded) {
      res.status(200).json({
        success: false,
        message: 'Access token is not valid.'
      });
    } else {

      let tokenData: any = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        admin: decoded.admin,
        joined: decoded.joined,
      };

      let newToken = jwt.sign(tokenData, process.env.SECRET, {
        expiresIn: '1h'
      });

      res.status(200).json({
        success: true,
        message: 'Access token has been refreshed',
        data: newToken
      });
    }
  });
})


/**
 * Proctects all routes below
 */
router.use((req: any, res: express.Response, next: express.NextFunction) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'No token provided.'
    });
  }
});

router.post('/users', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let profile = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username_lower: req.body.username
    }

    User.create(profile, (err: any, user: any) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Internal error.'
            });

            return next();
        }

        res.status(201).json({
            success: true,
            message: 'Account created.'
        });
    });

});

export { router as ApiRoutes };

import * as express from 'express';
import * as jwt     from 'jsonwebtoken';
import * as winston from 'winston';

import { User } from '../../models';

import {
  AuthLogin,
  AuthRefreshToken,
  AuthRouteProtection
} from '../api/rest/authentication';

import {
  ProjectGetByUrl,
  ProjectCreate
} from '../api/rest/projects';

import {
  UserCreate
} from '../api/rest/users';

let router: express.Router = express.Router();



/**
 * Unprotected Routes
 */
router.route('/auth/login')
  .post(AuthLogin)

router.route('/auth/refresh')
  .post(AuthRefreshToken)

/**
 * Proctects all routes below
 */
router.use(AuthRouteProtection);

router.route('/users')
  .post(UserCreate)

router.route('/projects')
  .post(ProjectCreate)

router.route('/projects/url/:url')
  .get(ProjectGetByUrl)

export { router as ApiRoutes };

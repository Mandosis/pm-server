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
  ProjectRouteAuth,
  ProjectClientAuth
} from '../api/rest/authentication/project-auth';

import {
  UserCreate,
  GetUserById
} from '../api/rest/users';

import { ITGetById } from '../api/rest/issue-tracker/get-by-id';
import { ITNewIssue } from '../api/rest/issue-tracker/new-issue';
import { ITGetIssue } from '../api/rest/issue-tracker/get-issue';

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

router.route('/auth/project')
  .all(ProjectRouteAuth)
  .post(ProjectClientAuth)

router.route('/users')
  .post(UserCreate)

router.route('/users/id/:id')
  .get(GetUserById)

router.route('/projects')
  .all(ProjectRouteAuth)
  .post(ProjectCreate)

router.route('/projects/url/:url')
  .all(ProjectRouteAuth)
  .get(ProjectGetByUrl)

router.route('/projects/issue-tracker')
  .all(ProjectRouteAuth)
  .post(ITGetById)

router.route('/issue-trackers/issues/:id?')
  .all(ProjectRouteAuth)
  .get(ITGetIssue)
  .post(ITNewIssue)

export { router as ApiRoutes };

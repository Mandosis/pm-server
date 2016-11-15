import * as express from 'express';
import * as winston from 'winston';
import * as Promise from 'bluebird';

import { Project } from '../../../../models/project';

export function ProjectRouteAuth(req: express.Request | any, res: express.Response, next: express.NextFunction) {
  let id = req.decoded.id;
  let url = req.body.url || req.params.url;

  winston.debug('project url', url);

  getProjectByUrl(url)
    .then((project: any) => {
      if (!project || !project.isMember(id)) {
        return res.status(401).json({
          success: false,
          message: 'User is not a member or the project does not exist.'
        });
      }

      req.project = project;
      return next();
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });
    });
}

export function ProjectClientAuth(req: express.Request, res: express.Response) {
  res.status(200).json({
    success: true,
    message: 'User is a member.'
  });
}

function getProjectByUrl(url: string) {
  return new Promise((resolve, reject) => {
    Project
      .findOne({ url: url })
      .exec((err: any, project: any) => {
        if (err) {
          winston.error(err);
          return reject(err);
        }

        return resolve(project);
      });
  });
}
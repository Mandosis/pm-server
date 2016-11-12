import * as express from 'express';
import * as winston from 'winston';
import * as Promise from 'bluebird';

import { Project } from '../../../../models/project';

export function ProjectClientAuth(req: express.Request | any, res: express.Response) {
  let id = req.decoded.id;
  let url = req.body.url;

  getProjectByUrl(url)
    .then((project: any) => {
      if (!project || !project.isMember(id)) {
        return res.status(401).json({
          success: false,
          message: 'User is not a member or the project does not exist.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'User is a member.'
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });
    });
}

export function ProjectAPIAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Get user id
  // Get project by url
    // Check if the user is a member
      // If the user is a member
        // Continue (Maybe add project to 'req.project'?)
      // Else
        // Send an error to the client
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
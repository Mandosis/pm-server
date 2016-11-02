import * as express from 'express';
import * as winston from 'winston';
import { Project } from '../../../../models';

export function ProjectGetByUrl(req: express.Request, res: express.Response) {
  let url: string = req.params.url;

  if (!url) {
    res.status(400).json({
      success: false,
      message: 'Project url missing from body'
    });

    return;
  }

  Project.findOne({ url: url }, (err, project) => {

    let isFound: boolean = !(project === null || project === undefined);

    if (err) {
      winston.error(err);

      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });

      return;
    }

    if (!isFound) {
      res.status(404).json({
        success: false,
        message: 'Project not found.'
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project found.',
      data: project.toJSON()
    });
  });
}
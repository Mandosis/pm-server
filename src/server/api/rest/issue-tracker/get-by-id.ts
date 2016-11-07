import * as express from 'express';
import * as winston from 'winston';

import { IssueTracker } from '../../../../models';

export function ITGetById(req: express.Request, res: express.Response) {
  let id = req.body.id;

  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Id missing.'
    });

    return;
  }

  IssueTracker
    .findById(id)
    .populate('issues')
    .populate('tags')
    .exec((err: any, issueTracker: any) => {
      winston.debug('issueTracker', issueTracker.toJSON());
      if (err) {
        winston.error(err);

        res.status(500).json({
          success: false,
          message: 'Internal error.'
        });

        return;
      }


      if (issueTracker === null || issueTracker === undefined) {
        res.status(404).json({
          success: false,
          message: 'Issue tracker not found.'
        });

        return;
      }

      issueTracker = issueTracker.toJSON();

      res.status(200).json({
        success: true,
        message: 'Issue tracker found.',
        data: issueTracker
      });
    })
}
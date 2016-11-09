import * as express from 'express';
import * as winston from 'winston';

import { Issue } from '../../../../models/issue-tracker/issue';

export function ITGetIssue(req: express.Request, res: express.Response) {
  let id = req.params.id;
  
  if (!id) {
    res.status(400).json({
      success: false,
      message: 'Missing issue id.'
    });

    return;
  }


  Issue
    .findById(id)
    .populate('author')
    .exec((err: any, issue: any) => {
      if (err) {
        winston.error(err);

        res.status(500).json({
          success: false,
          message: 'Internal error.'
        });

        return;
      }

      if (issue === null || issue == undefined) {
        res.status(200).json({
          success: false,
          message: 'Issue not found.'
        });

        return;
      }

      issue = issue.toJSON();

      res.status(200).json({
        success: true,
        message: 'Issue found.',
        data: issue
      });
    });
}
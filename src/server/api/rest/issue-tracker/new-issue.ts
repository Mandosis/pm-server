import * as express from 'express';
import * as winston from 'winston';

import { Issue, IssueTracker } from '../../../../models';

export function ITNewIssue(req: express.Request | any, res: express.Response) {

  let requiredData = (
    req.body.issue_tracker &&
    req.body.title &&
    req.body.body
  );

  if (!requiredData) {
    res.status(400).json({
      success: false,
      message: 'Missing required data.'
    });

    return;
  }

  let newIssue = new Issue({
    issue_tracker: req.body.issue_tracker,
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
    author: req.decoded.id,
    assigned: req.body.assigned
  });

  newIssue.save((err: any, issue: any) => {
    if (err) {
      winston.error(err);
      res.status(500).json({
        success: false,
        message: 'Internal error.'
      });

      return;
    }


    IssueTracker.findById(issue.issue_tracker, (err: any, issueTracker: any) => {
      if (err) {
        winston.error(err);

        res.status(500).json({
          success: false,
          message: 'Internal error.'
        });

        return;
      }

      if (issueTracker === undefined || issueTracker === null) {
        winston.debug('issueTracker Empty', issueTracker);
        res.status(500).json({
          success: false,
          message: 'Internal error.'
        });

        return;

      }

      issueTracker.issues.push(issue.id);

      issueTracker.save((err: any) => {
        if (err) {
          winston.error(err);
          res.status(500).json({
            success: false,
            message: 'Internal error.'
          });

          return;
        }

        res.status(201).json({
          success: true,
          message: 'Issue created.',
          data: issue
        });

      })

    })

  });
}
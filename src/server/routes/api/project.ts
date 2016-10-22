import * as express from 'express';
import * as Promise from 'bluebird';
import * as winston from 'winston';
import { Project, IssueTracker } from '../../../models';

export function NewProject(req: express.Request, res: express.Response) {
  let isValid = (
    req.body.title && 
    req.body.description
  );
  let issueTrackerId = new IssueTracker({})._id;

  let newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    admins: req.body.admins,
    members: [],
    issue_tracker_id: issueTrackerId
  });

  let newIssueTracker = new IssueTracker({
    _id: issueTrackerId,
    project_id: newProject._id,
    issues: []
  });

  let saveAll = Promise.join(saveIssueTracker(), saveProject(), () => {});
  
  if (isValid) {
    saveAll
      .then(() => {
        res.status(201).json({
          success: true,
          message: 'Project saved'
        });
      })
      .catch((err) => {
        winston.error(err);
        res.status(500).json({
          success: false,
          message: 'Internal error'
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: 'Required information missing from request.'
    });
  }


  function saveIssueTracker(): Promise<any> {
    winston.info('saveIssueTracker hit');
    return new Promise((resolve, reject) => {
      newIssueTracker.save((err, issueTracker) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }

  function saveProject(): Promise<any> {
    return new Promise((resolve, reject) => {
      newProject.save((err: any, project: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    })
  }
}
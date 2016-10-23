import * as express from 'express';
import * as Promise from 'bluebird';
import * as winston from 'winston';
import { Project, IssueTracker } from '../../../models';

export function NewProject(req: express.Request, res: express.Response) {
  let isValid = (
    req.body.title !== undefined && 
    req.body.description !== undefined
  );


  let newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    admins: req.body.admins || [],
    members: [],
  });


  let newIssueTracker = new IssueTracker({
    issues: []
  });

  let saveAll = Promise.join(saveIssueTracker(), saveProject(), (issueTracker, project) => {
    return { issueTracker: issueTracker, project: project };
  });
  
  if (isValid) {
    saveAll
      .then((data) => {

        data.project.issue_tracker = data.issueTracker._id;
        data.issueTracker.project = data.project._id;

        data.project.save(() => {});
        data.issueTracker.save(() => {});

        res.status(201).json({
          success: true,
          message: 'Project saved',
          data: {
            url: data.project.url
          }
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
    return new Promise((resolve, reject) => {
      newIssueTracker.save((err, issueTracker) => {
        if (err) {
          reject(err);
        } else {
          resolve(issueTracker);
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
          resolve(project);
        }
      })
    })
  }
}
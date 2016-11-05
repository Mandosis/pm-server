import * as express from 'express';
import * as Promise from 'bluebird';
import * as winston from 'winston';

import { Project, IssueTracker } from '../../../../models';

export function ProjectCreate(req: express.Request | any, res: express.Response) {
  let title = req.body.title;
  let description = req.body.title;
  let user = req.decoded.id;

  if (!title || !description) {
    res.status(400).json({
      success: false,
      messsage: 'Missing required information.'
    });

    return;
  }



  let newProject = new Project({
    title: title,
    description: description,
    admins: [user],
    members: [user]
  });

  let newIssueTracker = new IssueTracker({
    issues: []
  });


  const saveProject = () => {
    return new Promise((resolve, reject) => {
      newProject.save((err: any, project: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(project);
      });
    });
  };


  const saveIssueTracker = () => {
    return new Promise((resolve, reject) => {
      newIssueTracker.save((err: any, tracker: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(tracker);
      });
    });
  };


  let saveAll = Promise.join(saveIssueTracker(), saveProject(), (issueTracker, project) => {
    return { issueTracker: issueTracker, project: project };
  });

  saveAll
    .then((data: any) => {

      data.project.issue_tracker = data.issueTracker._id;
      data.issueTracker.project = data.project._id;

      data.project.save(() => {});
      data.issueTracker.save(() => {});

      res.status(201).json({
        success: true,
        message: 'Project created.',
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
}
# 📹 [breakout.team](https://breakout.team/)

**Video breakout rooms made easy.**


## Introduction

Create configurable video breakout rooms. Perfect for people to get together after a talk or a webinar. There's no need to create an account or download software.

It has two modes:

* **Auto grouping** — you specify the number of rooms, and participants will randomly be added to a group when they go to the share URL.
* **Named groups** — participants can choose from a number of groups with different topics, created by you in advance.


## Technologies

* [Gatsby](https://www.gatsbyjs.org/) for the front-end.
* [Architect](https://arc.codes/) for the back-end (via AWS Lambda & DynamoDB).
* [Jitsi.meet](https://jitsi.org/) for the video chat.


## Local development

`yarn start` starts Gatsby. `yarn deploy` will build and deploy to S3, Lambda and DynamoDB via Architect.

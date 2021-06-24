## Tracker NodeJS Exceptions in Docker

This project demonstrates how to track exceptions in a NodeJS application running inside a docker container 

#### Objectives
- Parse docker container logs for any application errors.
- Send email alerts for every application errors that occured in the past 30 minutes.

#### How it works
The application needs an environment (.env) file containing the following variables:
- `SENDGRID_API_KEY`: Your sendgrid API key.
- `MAIL_FROM`: Your authenticated sender address on Sendgrid.
- `MAIL_TO`: Your email address that will receive error alerts.
You can run the application using this commands - `npm run start`.
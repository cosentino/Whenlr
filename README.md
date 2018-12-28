# Whenlr
Simple mobile web app to keep track of when things happen (base on Angular, Material UI, and Firebase Cloud Platform)

## Development and deploy commands

### Setup

Install web project dependencies, the firebase-tools cli, and make you login to firebase google account.

    npm setup

### Serving for local development

Build the web angular project, watch for changes, serve it locally and open it up in the browser.

    npm start

### Deploy

Build the web angular project in the /web/dist/ folder and deploy it to firebase hosting.
Moreover the firestore security rules and the indexes settings will be deployed to firebase.

    npm run deploy

Public url: https://whenlr-b2fe0.firebaseapp.com/

Firebase project console: https://console.firebase.google.com/project/whenlr-b2fe0/overview

## PWA

Progressive Web App capabilities were implemented via the standard Angular NGSW.
Note: the service worker and "Add 2 home screen" features are only enabled on production environment.

Check the Service Worker status: https://whenlr-b2fe0.firebaseapp.com/ngsw/state

## TODO

- sort list by date
- filter list by date range
- update tests
- add description field to items
- on item creation, propose text suggestions based on existing items
- implement item clone action
- PWA:
  - offline mode
  - push notifications

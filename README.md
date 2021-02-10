# Fetch Points
A RESTful Node.js Express web service that allows adding, deducting points and viewing point balance per user.

## Features 
- Add points endpoint to user `/users/{userId}/points/add`
- Deduct points endpoint to user `/users/{userId}/points/deduct`
- View point balance endpoint per user `/users/{userId}/points`

## Install and Run
### Prerequisite
Node.js needs to be installed. Here is the official guide: https://nodejs.dev/learn/how-to-install-nodejs
### Clone Fetch Points project
`git clone https://github.com/cmatthey`
Go to the project root directory
### Run in dev environment
Run these commands or ayour preferred methods to start a Node.js expres webapp:
- `yarn install`
- `NODE_ENV=development DEBUG=fetchpoints:* yarn start`

## API Documentaion
API openapi docs is served at http://localhost:3000/api-docs

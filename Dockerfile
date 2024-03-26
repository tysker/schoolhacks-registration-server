# First stage: build the react app
# FROM tiangolo/node-frontend:10 as build-stage
FROM node:20.0-alpine as build-stage
WORKDIR /server
COPY ./ ./
RUN npm install
CMD ["npm", "run", "start"]
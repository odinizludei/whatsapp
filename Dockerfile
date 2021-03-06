FROM node:7
MAINTAINER V.K

USER root

RUN curl https://install.meteor.com/ | sh
RUN apt-get install npm
RUN npm install -g ionic 
RUN npm install -g cordova
RUN npm install -g angular
RUN npm install 
RUN meteor npm install —save sharp 
RUN ionic plugin add cordova-plugin-image-picker 
RUN ionic plugin add cordova-plugin-sim 
RUN ionic plugin add cordova-plugin-camera
RUN npm run meteor-client:bundle 
RUN ionic serve

EXPOSE 8888

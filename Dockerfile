FROM odinizludei/bearly

USER root

RUN yum install -y node.js
RUN yum install -y mongo
RUN yum install -y meteor
RUN npm install -g ionic cordova
RUN npm install 
RUN meteor npm install —save sharp 
RUN ionic plugin add cordova-plugin-image-picker 
RUN ionic plugin add cordova-plugin-sim 
RUN ionic plugin add cordova-plugin-camera
RUN npm run meteor-client:bundle 

FROM node:18

COPY . /occ

WORKDIR /occ

RUN [ "npm", "ci" ]

RUN [ "npm", "run", "build" ]

ENTRYPOINT ["npm", "run", "client"]
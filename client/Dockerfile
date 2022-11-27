FROM node:18

COPY . /occ

WORKDIR /occ

RUN [ "npm", "ci" ]

ENTRYPOINT ["npm", "run", "client"]
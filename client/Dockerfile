FROM node:18

COPY . /occ

WORKDIR /occ

RUN [ "npm", "install" ]

ENTRYPOINT ["npm", "run", "client"]
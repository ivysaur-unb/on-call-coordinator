# Starting from a base image that already has Node.js installed
# node:18 indicates that we are using the latest release of Node.js 18
FROM node:18 AS client

# Everything in this file's directory is copied to a folder in our container
COPY client /occ/client

# Equivalent to 'cd /occ'
WORKDIR /occ/client

# Load all our dependencies
RUN [ "npm", "ci" ]


# Entrypoint indicates what happens when we start a container
ENTRYPOINT ["npm", "run", "server"]

FROM client AS build
RUN [ "npm", "run", "build" ]
COPY server /occ/server
RUN cp -rf /occ/client/build/* /occ/server/public/

WORKDIR /occ/server
RUN rm -f ./.env
RUN npm ci
EXPOSE 2222

ENTRYPOINT [ "npm", "run", "server"]


# Starting from a base image that already has Node.js installed
# node:18 indicates that we are using the latest release of Node.js 18
FROM node:18

# Everything in this file's directory is copied to a folder in our container
COPY . /occ

# Equivalent to 'cd /occ'
WORKDIR /occ

# Load all our dependencies
RUN [ "npm", "install" ]

# Anything sent to localhost:5000 will be sent to port 5000 of the container
EXPOSE 5000

# Entrypoint indicates what happens when we start a container
ENTRYPOINT ["npm", "run", "server"]
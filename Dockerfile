# Starting from a base image that already has Node.js installed
# node:18 indicates that we are using the latest release of Node.js 18
FROM node:18-alpine AS client

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

# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd 

# Copy the sshd_config file to the /etc/ssh/ directory
COPY sshd_config /etc/ssh/

# Copy and configure the ssh_setup file
RUN mkdir -p /tmp
COPY ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null)

# Open port 2222 for SSH access
EXPOSE 80 2222

ENTRYPOINT [ "npm", "run", "server"]


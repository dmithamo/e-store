# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
RUN npm install 

# add app
COPY . /app

# start app
CMD ["npm", "run", "start"]
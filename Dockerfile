FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/app/
WORKDIR /usr/app



# copy source files
COPY  . .


# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
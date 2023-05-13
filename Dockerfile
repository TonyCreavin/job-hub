FROM node:18-alpine3.16  AS runner

# create & set working directory
RUN mkdir /usr/app/
RUN mkdir /usr/app/cl 
RUN mkdir /usr/app/job-hub
WORKDIR /usr/app




COPY  . .


# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
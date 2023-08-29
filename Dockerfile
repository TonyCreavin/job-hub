FROM node:18-alpine3.16  AS runner

# create & set working directory
RUN mkdir /usr/app/
RUN mkdir /usr/app/cl 
RUN mkdir /usr/app/job-hub
RUN mkdir /usr/app/node_modules
RUN mkdir /usr/app/.vercel
RUN mkdir /usr/app/.next
RUN mkdir /usr/app/build
WORKDIR /usr/app



# copy source files
COPY  . .


# install dependencies
RUN npm install
RUN npm audit fix

ENV NODE_ENV production
# start app
RUN npm run build
EXPOSE 3000
CMD ["npm", "dev"]
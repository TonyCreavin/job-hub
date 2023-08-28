FROM node:18-alpine3.16  AS runner


ENV GROUP_ID=1001 \
    USER_ID=1001

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
COPY  . /usr/app


    
    
 RUN addgroup -g $GROUP_ID www
 RUN adduser -D -u $USER_ID -G www www -s /bin/sh

 RUN chown -R www:www /usr/app/

 USER www

# install dependencies
RUN npm install
# RUN echo "ID20230827" >> /usr/app/.next/BUILD_ID
RUN npm audit fix

ENV NODE_ENV production
# start app
RUN npm run build



EXPOSE 3000
CMD ["npm", "start"]
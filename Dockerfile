FROM node:16.15.0
WORKDIR /test/app
COPY package*.json ./
RUN npm install
COPY . . 
#EXPOSE: 80818
CMD ["npm","start"]

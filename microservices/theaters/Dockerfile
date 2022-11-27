# Base Image
FROM node:alpine

# Important because may cause conflit with OS files
WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
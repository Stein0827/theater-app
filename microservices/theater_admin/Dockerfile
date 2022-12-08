# Base Image
FROM node:alpine

# JSON web token for login authentication
ENV jwtSecret 45fa5fc4668a2414a0fdea8a4cb4bbd47eb41cfecb80f7aca1a84376d9ed1e478b9824fd

# Important because may cause conflit with OS files
WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
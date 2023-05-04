FROM node:20-bullseye

WORKDIR workdir
COPY . .
RUN npm install -g npm &&\
npm install @mui/material @emotion/react @emotion/styled &&\
npm i

EXPOSE 3000
CMD ["npm", "start"]

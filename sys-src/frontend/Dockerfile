FROM node:20-bullseye

WORKDIR workdir
COPY . .
RUN npm install -g npm@latest
RUN npm install @mui/material @emotion/react @emotion/styled
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]

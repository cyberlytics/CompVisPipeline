FROM node:20-alpine

VOLUME [/workdir/node_modules]

RUN apk add --no-cache python3
RUN apk add --no-cache build-base cairo-dev pango-dev libjpeg-turbo-dev giflib-dev librsvg-dev

RUN npm i -g npm@latest

CMD ["/bin/bash"]

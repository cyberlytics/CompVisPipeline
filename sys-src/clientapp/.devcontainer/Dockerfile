FROM node:20-bullseye

WORKDIR workdir
COPY package.json package.json
RUN npm i && rm package.json

CMD ["bin/bash"]
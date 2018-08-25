FROM node:latest
MAINTAINER so@redream.cn
COPY . /code
WORKDIR /code
RUN npm i
CMD ["npm","run"]
# vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
# Build stage
# -------------------------------------------------------------------------------------------------
FROM allenevans/node-build-env:8 as build

ENV NODE_ENV=production

COPY . /usr/src
WORKDIR /usr/src

RUN NODE_ENV=BUILD npm install
RUN npm run lint
RUN npm run runtime
RUN npm test
RUN npm run build-storybook
RUN npm prune --production

RUN mkdir /usr/app && \
    for dir in __*__; do mv $dir /usr/app/; done; \
    mv /usr/src/bin /usr/app/; \
    mv /usr/src/node_modules /usr/app/; \
    mv /usr/src/package* /usr/app/;
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

# vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
# Production Image
# -------------------------------------------------------------------------------------------------
FROM node:8-alpine

ENV NODE_ENV=production PORT=3000
EXPOSE $PORT

WORKDIR /usr/app

COPY --from=build /usr/app/ .

RUN addgroup www; \
    adduser -D -G www nodeusr; \
    chown -R :www /usr/app;

USER nodeusr:www

CMD ["npm", "run", "start"]
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

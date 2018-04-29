# vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
# Build stage
# -------------------------------------------------------------------------------------------------
FROM allenevans/node-build-env:8 as build

ENV NODE_ENV=production

COPY . /usr/src
WORKDIR /usr/src

RUN NODE_ENV=BUILD npm install && \
    NODE_ENV=production npm run runtime

RUN mkdir /usr/app && \
    mv /usr/src/__build__ /usr/app; \
    mv /usr/src/__runtime__ /usr/app; \
    mv /usr/src/bin /usr/app; \
    mv /usr/src/package* /usr/app;


# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

# vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
# Production Image
# -------------------------------------------------------------------------------------------------
FROM node:8-alpine

ENV NODE_ENV=production PORT=3000
EXPOSE $PORT

WORKDIR /usr/app

COPY --from=build /usr/app/ .

RUN npm install

CMD ["npm", "run", "start:production"]

# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

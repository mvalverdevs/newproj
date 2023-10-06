ARG NODE_IMAGE=node:20-bullseye

FROM $NODE_IMAGE as builder

WORKDIR /app
COPY .npmrc package*.json /app/
RUN npm ci

COPY . /app/
RUN npm run build

# #############################################
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

# Copy nginx config
COPY ./compose/production/nginx.conf /etc/nginx/conf.d/default.conf.template
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Add entrypoint
COPY ./compose/production/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

# set env with current GIT commit
ARG GIT_COMMIT="dummy"
ENV GIT_COMMIT=${GIT_COMMIT}

ENTRYPOINT [ "/entrypoint" ]
CMD [ "webserver" ]

EXPOSE 80

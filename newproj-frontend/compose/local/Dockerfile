FROM node:20-bullseye

COPY ./compose/local/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

# set working directory
WORKDIR /app

EXPOSE 4200

ENTRYPOINT ["/entrypoint"]
CMD ["ng", "serve", "--proxy-config", "proxy.conf.json", "--source-map=false", "--no-progress", "--host", "0.0.0.0", "--configuration", "hmr", "--hmr-warning=false", "--poll=10000"]

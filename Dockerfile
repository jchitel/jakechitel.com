FROM node:12

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn prod-build
EXPOSE 80
CMD ["yarn", "prod-start"]
FROM node:12

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
EXPOSE 80
CMD ["node", "index.js"]
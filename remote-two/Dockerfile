# FROM node:16-alpine as builder
# WORKDIR '/app'
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:1.21.4-alpine
# COPY --from=builder /app/dist /usr/share/nginx/html

FROM node:16-alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3001
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

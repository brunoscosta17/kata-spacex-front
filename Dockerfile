# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency configs for optimal build caching
COPY package*.json ./
RUN npm ci

# Copy application source code and compile the production bundle
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the compiled assets using Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spaceX_kata/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

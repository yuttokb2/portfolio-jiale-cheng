# Stage 1: Build the portfolio (build time)
FROM node:20-alpine as builder
WORKDIR /app

# Copy all the package files
COPY package*.json ./
# Intall dependencies
RUN npm ci

# Copy all the source code
COPY . .

# Building the portfolio (This generates the folder /dist )
RUN npm run build

# Stage 2: Server with ngix (runtime)
FROM nginx:alpine

# Copu the config of nginx that we have created
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the files built in the stage 1 to the nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
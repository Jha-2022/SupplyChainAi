# Use the official lightweight Node.js image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Expose the port your server runs on (from your server.js, it's 5000 or process.env.PORT)
EXPOSE 5000

# Run the web service on container startup.
CMD [ "node", "server.js" ]
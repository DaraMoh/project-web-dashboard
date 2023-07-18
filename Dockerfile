# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the React application files into the container
COPY my-app/build ./build
COPY my-app/public ./public

# Install serve to serve the static files (optional, for production-like setup)
RUN npm install -g serve

# Expose the port on which the app will run (if needed)
EXPOSE 3000

# Specify the command to run when the container starts
CMD ["serve", "-s", "build"]

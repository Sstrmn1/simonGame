# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /simonGame

# Copy the application files into the working directory
COPY . /simonGame

# Install the application dependencies
RUN npm install

# Define the entry point for the container
CMD ["npm", "start"]

EXPOSE 3000
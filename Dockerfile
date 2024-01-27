FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy the local files into the container
COPY . .

# Expose port 80 for Nginx
EXPOSE 80
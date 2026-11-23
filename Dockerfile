ARG BASE_IMAGE=harbor.samimhealth.com/hub/nginx:latest
FROM $BASE_IMAGE
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY dist /usr/share/nginx/html
COPY default.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
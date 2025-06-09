FROM python:3.9

# Set build arguments
ARG DEBIAN_FRONTEND=noninteractive
ARG PIP_DISABLE_PIP_VERSION_CHECK=1

# Install dependencies first
RUN pip install --no-cache-dir flask flask-cors

# Copy the server file
COPY data/server.py /server.py

# Copy the products.json file
COPY data/products.json /app/products.json

EXPOSE 5000

ENTRYPOINT ["python", "/server.py"] 
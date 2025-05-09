# Blue-Green Deployment Demo App

This is a sample React application used to demonstrate blue-green deployment strategies in Kubernetes.

## Features

- Simple counter application
- Modern React with TypeScript
- Docker containerization
- Ready for Kubernetes deployment

## Development

To run the application locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000

## Building for Production

To build the application for production:

```bash
npm run build
```

## Docker

To build and run the Docker container:

```bash
# Build the image
docker build -t myapp-blue-green .

# Run the container
docker run -p 80:80 myapp-blue-green
```

The application will be available at http://localhost:80

## Testing

To run the test suite:

```bash
npm test
``` 
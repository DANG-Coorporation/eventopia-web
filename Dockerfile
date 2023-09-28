# Build stage
FROM node:latest as BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci
COPY . .
# Build
RUN npm run build

# Production stage
FROM node:latest
WORKDIR /app

# Copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/.next ./_next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/next.config.js ./
# Expose port
EXPOSE 3000
# Start the application
CMD ["npm", "run", "start"]

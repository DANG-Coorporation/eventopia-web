# Build stage
FROM node:latest as BUILD_IMAGE
WORKDIR /app
COPY package.json package-lock.json ./
# Install dependencies
RUN npm ci
COPY . .
# Build
RUN yarn build

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

# Tahap pertama: Build aplikasi Next.js
# FROM node:16.13.1-alpine AS build

# # Membuat direktori kerja di dalam container
# WORKDIR /app

# # Menyalin package.json dan package-lock.json (jika ada)
# COPY package*.json ./

# # Menjalankan npm install untuk menginstal dependensi aplikasi
# RUN npm install

# # Menyalin semua file aplikasi ke dalam container
# COPY . .

# # Menjalankan perintah untuk membangun aplikasi Next.js
# RUN npm run build

# # Tahap kedua: Menjalankan aplikasi yang sudah dibangun
# FROM node:16.13.1-alpine

# # Membuat direktori kerja di dalam container
# WORKDIR /app

# # Menyalin hanya file yang dibutuhkan dari tahap pertama
# COPY --from=build /app/package.json /app/package-lock.json ./
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/next.config.js ./
# COPY --from=build /app/node_modules ./node_modules


# # Menyalin file lain yang dibutuhkan
# COPY public ./public
# EXPOSE 3000
# # Menjalankan perintah untuk memulai aplikasi Next.js
# CMD ["npm", "start"]

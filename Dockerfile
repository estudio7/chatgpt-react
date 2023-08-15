FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i
#RUN npm run dev
EXPOSE 3000
CMD ["npm", "run", "dev"]
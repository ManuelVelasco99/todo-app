FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]

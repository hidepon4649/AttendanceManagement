# マルチステージビルド

# ---------------------------------------
# ビルド用のイメージ
FROM node:18-alpine AS build

WORKDIR /app

RUN apk add --no-cache git

# 依存関係のインストール
COPY package.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

# ---------------------------------------
# 実行用のイメージ
FROM node:18-alpine

WORKDIR /app

# ビルド成果物をコピー
COPY --from=build /app .

# 依存関係のインストール（本番用）
RUN npm install --only=production

ENV NODE_OPTIONS=--openssl-legacy-provider

# アプリケーションの開始
CMD ["npm", "start"]
# マルチステージビルド

# ---------------------------------------
# ビルド用のイメージ
FROM node:20-alpine AS build

WORKDIR /app/frontend

RUN apk add --no-cache git

# 依存関係のインストール
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# ---------------------------------------
# 開発中はソースコード修正を即時反映をしたいので、
# ホストOSのソースコードをマウントする。
# コンテナ上でnpm install, build, start(docker-compose.ymlで指定)
# ---------------------------------------

# # ---------------------------------------
# # 実行用のイメージ
# FROM node:20-alpine

# WORKDIR /app/frontend

# # ビルド成果物をコピー
# COPY --from=build /app/frontend .

# # 依存関係のインストール（本番用）
# RUN npm install --only=production

# ENV NODE_OPTIONS=--openssl-legacy-provider

# # アプリケーションの開始
# CMD ["npm", "start"]
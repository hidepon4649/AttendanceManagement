# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係のインストール
COPY package.json ./
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# ビルド
# Dockerfileに環境変数を追加
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm run build

# アプリケーションの開始
CMD ["npm", "start"]

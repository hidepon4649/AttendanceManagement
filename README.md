# 出退勤管理システム

## 概要

このアプリケーションは、React, Spring Boot, MySQL を使用した出退勤管理システムです。社員は出勤と退勤を登録でき、管理者は社員の管理および月末帳票を出力できます。

## 使用技術

- **フロントエンド**: React, axios, Bootstrap
- **バックエンド**: Spring Boot, Gradle
- **データベース**: MySQL
- **インフラ**: Docker(コンテナ化), Docker Compose
- **認証認可**: Spring Security, JWT, BCrypt, CSRF

## セットアップ手順

```bash
# リポジトリをクローン
git clone https://github.com/hidepon4649/AttendanceManagement.git
```

## アプリケーション起動手順

```bash
# docker-composeのディレクトリに移動して、下記２つのコマンドを実行して下さい。
docker compose build
docker compose up -d

# ブラウザから下記URL
http://localhost:3000
# 初期管理ユーザ id/pw
itohtohirofumi@email.comr/password
```

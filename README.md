# 出退勤管理システム

## 概要

このアプリケーションは、React, Spring Boot, MySQL を使用した出退勤管理システムです。社員は出勤と退勤を登録でき、管理者は社員の管理および月末帳票を出力できます。

## 使用技術

- **フロントエンド**: React, axios, Bootstrap
- **バックエンド**: Spring Boot, Gradle
- **データベース**: MySQL
- **インフラ**: Docker(コンテナ化), Docker Compose
- **認証認可**: Spring Security, JWT, BCrypt, CSRF
- **自動テスト**: JUnit

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
itohtohirofumi@email.com/password
```

<!--
TODO:主な機能を紹介する
## 主な機能
- 共通機能(一般ユーザ、管理ユーザ)
  - ログイン・認証認可(JWT, CSRF)
  - 出勤・退勤の登録
  - 月次帳票のPDF出力
- 管理機能(管理ユーザ)
  - ユーザの新規登録・編集・削除
  - 出勤・退勤の修正
  - 操作履歴の閲覧
-->

<!--
TODO:デモ画面のキャプチャを載せる
## デモ
![ログイン画面](./docs/login.png)
![出退勤登録](./docs/attendance.png)
-->

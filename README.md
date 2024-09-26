# 出退勤管理システム

## 概要
このアプリケーションは、React, Spring Boot, MySQLを使用した出退勤管理システムです。社員は出勤と退勤を登録でき、管理者は社員の管理および月末帳票を出力できます。

## 使用技術
- **フロントエンド**: React, Bootstrap
- **バックエンド**: Spring Boot, Gradle
- **データベース**: MySQL
- **インフラ**: Docker(コンテナ化), Docker Compose

## セットアップ手順
  ```bash
  # リポジトリをクローン
  git clone https://github.com/hidepon4649/AttendanceManagement.git
  ```
## アプリケーション起動手順
  ```bash
  # docker-composeのディレクトリに移動して、下記２つのコマンドを実行して下さい。
  docker-compose up -d
  ./gradlew bootRun

  # ブラウザから下記URL
  http://localhost:8080
  # id/pw
  user/password
  ```

# ベースイメージ
FROM openjdk:17-jdk-alpine

# 作業ディレクトリ
WORKDIR /app

# Gradleビルドで生成されたjarファイルをコピー
COPY build/libs/*.jar attendance-management-backend.jar

# アプリケーションを起動
ENTRYPOINT ["java", "-jar", "attendance-management-backend.jar"]
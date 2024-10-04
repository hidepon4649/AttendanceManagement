# ベースイメージ
# FROM openjdk:17-jdk-alpine
FROM openjdk

# 作業ディレクトリ
WORKDIR /app

# Gradleビルドで生成されたjarファイルをコピー
COPY build/libs/*.jar attendance-management-backend.jar


# アプリケーションを起動
# ENTRYPOINT ["java", "-jar", "attendance-management-backend.jar"]
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "attendance-management-backend.jar"]

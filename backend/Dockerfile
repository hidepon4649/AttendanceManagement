# マルチステージビルド

# ---------------------------------------
# ビルド用のイメージ
FROM amazoncorretto:17 AS build

WORKDIR /app/backend

RUN yum update -y && \
    yum install -y gcc libstdc++ glibc tar gzip git inotify-tools

# ---------------------------------------
# 開発中はソースコード修正を即時反映をしたいので、
# ホストOSのソースコードをマウントする。
# "java -jar jarファイル"を実行するのではなく、
# bootRunタスクを実行する(docker-compose.ymlで指定)
# ---------------------------------------

# # ---------------------------------------
# # 実行用のイメージ
# FROM amazoncorretto:17

# WORKDIR /app
# COPY --from=build /app/build/libs/attendance-management-backend-0.0.1-SNAPSHOT.jar /app/attendance-management-backend.jar

# RUN yum update -y && \
#     yum install -y gcc libstdc++ glibc tar gzip git

# # JAVA_OPTS環境変数を設定 (devtoolsのリスタートを有効化)

# ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar attendance-management-backend.jar"]
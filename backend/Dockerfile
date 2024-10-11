# ベースイメージ
FROM amazoncorretto:17

# tarコマンドをインストール
RUN yum install -y tar gzip

# GLIBCとlibstdc++をインストール
RUN yum update -y && \
    yum install -y gcc libstdc++ glibc

# 作業ディレクトリ
WORKDIR /app

# ホストのプロジェクトファイルをコンテナにコピー
COPY . /app

# gradlewを実行可能にする
RUN chmod +x ./gradlew

# gradlewでプロジェクトをビルド
RUN ./gradlew clean build

RUN cp build/libs/attendance-management-backend-0.0.1-SNAPSHOT.jar /app/attendance-management-backend.jar

# アプリケーションを起動
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "attendance-management-backend.jar"]


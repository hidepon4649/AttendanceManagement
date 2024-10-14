# マルチステージビルド

# ---------------------------------------
# ビルド用のイメージ
FROM amazoncorretto:17 AS build

WORKDIR /app
COPY . /app

RUN chmod +x ./gradlew
RUN ./gradlew clean build

# ---------------------------------------
# 実行用のイメージ
FROM amazoncorretto:17

WORKDIR /app
COPY --from=build /app/build/libs/attendance-management-backend-0.0.1-SNAPSHOT.jar /app/attendance-management-backend.jar

RUN yum update -y && \
    yum install -y gcc libstdc++ glibc tar gzip

# デバッグ用のポート5005を開放
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "attendance-management-backend.jar"]

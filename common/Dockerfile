FROM azul/zulu-openjdk:17.0.10-jre

ARG JAR_FILE=build/libs/common-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} common_img.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/common_img.jar"]
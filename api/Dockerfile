FROM maven:3.5.2-jdk-8 AS build
COPY . /usr/src/api
RUN mvn -f /usr/src/api/pom.xml clean package

FROM openjdk:8
COPY --from=build /usr/src/api/target/api-shaded.jar /usr/api/api.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/api/api.jar"]
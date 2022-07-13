FROM golang:1.18.3-alpine3.15 as builder
WORKDIR /app/
COPY ./ .
RUN go build -o main server/main.go
EXPOSE 9000
CMD [ "/app/main" ]
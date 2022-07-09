package main

import (
	"flag"
	"log"
	"time"

	proto "emoji-server/server/go-pb"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	serverPort := flag.String("p", "9000", "server port")
	flag.Parse()

	// connect to the server
	conn, err := grpc.Dial("localhost:"+*serverPort, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("could not connect to the service: %v", err)
	}
	defer conn.Close()

	// send a request to the server
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	c := proto.NewEmojiServiceClient(conn)
	resp, err := c.Emojize(ctx, &proto.EmojizeRequest{
		Text: "I like :pizza: and :sushi:!",
	})
	if err != nil {
		log.Fatalf("could not call service: %v", err)
	}
	log.Printf("server says: %s", resp.GetEmojizedText())
}

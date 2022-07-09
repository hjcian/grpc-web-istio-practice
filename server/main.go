package main

import (
	"context"
	"log"
	"net"

	proto "emoji-server/server/go-pb"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	emoji "gopkg.in/kyokomi/emoji.v1"
)

// server is used to implement the EmojiService interface
type server struct{}

// Emojize takes a input string via EmojizeRequest, replaces known keywords with
// actual emoji characters and returns it via a EmojizeReply instance.
func (s *server) Emojize(c context.Context, r *proto.EmojizeRequest) (*proto.EmojizeReply, error) {
	log.Println("Emojize called:", r.Text)
	return &proto.EmojizeReply{EmojizedText: emoji.Sprint(r.Text)}, nil
}

func main() {
	// listen to TCP requests over port 9000
	lis, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	log.Printf("listening on %s", lis.Addr())

	// register the EmojiService implementation with the gRPC server
	s := grpc.NewServer()
	proto.RegisterEmojiServiceServer(s, &server{})
	reflection.Register(s)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

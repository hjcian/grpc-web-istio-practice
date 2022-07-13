/**
 * @fileoverview gRPC-Web generated client stub for web
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.web = require('./emoji_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.web.EmojiServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.web.EmojiServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.web.EmojizeRequest,
 *   !proto.web.EmojizeReply>}
 */
const methodDescriptor_EmojiService_Emojize = new grpc.web.MethodDescriptor(
  '/web.EmojiService/Emojize',
  grpc.web.MethodType.UNARY,
  proto.web.EmojizeRequest,
  proto.web.EmojizeReply,
  /**
   * @param {!proto.web.EmojizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.web.EmojizeReply.deserializeBinary
);


/**
 * @param {!proto.web.EmojizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.web.EmojizeReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.web.EmojizeReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.web.EmojiServiceClient.prototype.emojize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/web.EmojiService/Emojize',
      request,
      metadata || {},
      methodDescriptor_EmojiService_Emojize,
      callback);
};


/**
 * @param {!proto.web.EmojizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.web.EmojizeReply>}
 *     Promise that resolves to the response
 */
proto.web.EmojiServicePromiseClient.prototype.emojize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/web.EmojiService/Emojize',
      request,
      metadata || {},
      methodDescriptor_EmojiService_Emojize);
};


module.exports = proto.web;


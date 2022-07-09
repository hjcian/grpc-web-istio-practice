/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./emoji_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.EmojiServiceClient =
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
proto.EmojiServicePromiseClient =
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
 *   !proto.EmojizeRequest,
 *   !proto.EmojizeReply>}
 */
const methodDescriptor_EmojiService_Emojize = new grpc.web.MethodDescriptor(
  '/EmojiService/Emojize',
  grpc.web.MethodType.UNARY,
  proto.EmojizeRequest,
  proto.EmojizeReply,
  /**
   * @param {!proto.EmojizeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.EmojizeReply.deserializeBinary
);


/**
 * @param {!proto.EmojizeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.EmojizeReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.EmojizeReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.EmojiServiceClient.prototype.emojize =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/EmojiService/Emojize',
      request,
      metadata || {},
      methodDescriptor_EmojiService_Emojize,
      callback);
};


/**
 * @param {!proto.EmojizeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.EmojizeReply>}
 *     Promise that resolves to the response
 */
proto.EmojiServicePromiseClient.prototype.emojize =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/EmojiService/Emojize',
      request,
      metadata || {},
      methodDescriptor_EmojiService_Emojize);
};


module.exports = proto;


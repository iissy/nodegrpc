var grpc = require('grpc');
var PROTO_PATH = './proto/helloworld.proto';

var proto = grpc.load(PROTO_PATH).helloworld;
var client = new proto.Greeter('192.168.1.76:50052', grpc.credentials.createInsecure());

function SayHello(res, params, callback) {
    client.sayHello(params, function(err, response) {
        if (typeof(callback) == "function") {
            callback.call(null, err, response, res);
        }
    });
}

exports.SayHello = SayHello;
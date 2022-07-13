const { EmojizeRequest, EmojizeReply } = require("./web-pb/emoji_pb.js");
const { EmojiServiceClient } = require("./web-pb/emoji_grpc_web_pb.js");

var client = new EmojiServiceClient("https://dev-his.jubo.health/grpc");
var editor = document.getElementById("editor");
editor.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    callBackend();
  }
});

function callBackend() {
  var request = new EmojizeRequest();
  request.setText(editor.innerText);

  client.emojize(request, {}, (err, response) => {
    editor.innerText = response.getEmojizedText();
  });
}

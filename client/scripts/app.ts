class App {
  constructor(id) {
    let messageService = new MessageService('https://api.parse.com/1/classes/messages');

    $(`#${id}`).append($('<div id="messageList"></div>'));
    $(`#${id}`).append($('<div id="messageInput"></div>'));
    console.log(messageService);
    let messageComponent = new MessageList('messageList', messageService);
    let messageInput = new MessageInput('messageInput', messageService)
  }
}
var getUsername = function() {
  var search = window.location.search;
  var userIndex = search.lastIndexOf('=');
  return search.slice(userIndex + 1, search.length);
}
var app = new App('app');





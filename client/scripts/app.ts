class App {
  constructor(id) {
    let messageService = new MessageService('https://api.parse.com/1/classes/messages?order=-createdAt');
    

    $(`#${id}`).append($('<div id="messageList"></div>'));
    $(`#${id}`).append($('<div id="messageInput"></div>'));
    console.log(messageService);
    let messageComponent = new MessageList('messageList', messageService);
    let messageInput = new MessageInput('messageInput', messageService)
  }
}

var app = new App('app');





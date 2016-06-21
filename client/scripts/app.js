var App = (function () {
    function App(id) {
        var messageService = new MessageService('https://api.parse.com/1/classes/messages?order=-createdAt');
        $("#" + id).append($('<div id="messageList"></div>'));
        $("#" + id).append($('<div id="messageInput"></div>'));
        console.log(messageService);
        var messageComponent = new MessageList('messageList', messageService);
        var messageInput = new MessageInput('messageInput', messageService);
    }
    return App;
}());
var app = new App('app');

var MessageList = (function () {
    function MessageList(id, messageService) {
        //messageService.getObservable().subscribe();
        this.node = $("#" + id);
        this.subscribeToService(messageService);
        this.messages = [];
        this.filter = function (message) {
            return true;
        };
    }
    MessageList.prototype.subscribeToService = function (messageService) {
        var _this = this;
        messageService.observable.subscribe(function (message) {
            if (_this.filter(message)) {
                _this.displayMessage(message);
            }
            _this.messages.push(message);
        });
    };
    MessageList.prototype.displayMessage = function (message) {
        // do cross scripting through username
        var messageText = message.username + ': ' + message.text;
        this.node.append($("<div class=\"message\">" + _.escape(messageText) + "</div>"));
    };
    MessageList.prototype.setFilter = function (key, value) {
        // do cross scripting through username
        // First blast currently existing messages
        this.node.html('');
        // Filter preexisting messages
        this.filter = function (message) {
            return message[key] = value;
            s;
        };
        _(this.messages).filter(this.filter).forEach(this.displayMessage.bind(this));
    };
    MessageList.prototype.setRoom = function (room) {
        this.setFilter('roomname', room);
    };
    return MessageList;
}());

var MessageList = (function () {
    function MessageList(id, messageService) {
        //messageService.getObservable().subscribe();
        this.node = $("#" + id);
        this.subscribeToService(messageService);
    }
    MessageList.prototype.subscribeToService = function (messageService) {
        var _this = this;
        messageService.observable.subscribe(function (message) {
            _this.displayMessage(message);
        });
    };
    MessageList.prototype.displayMessage = function (message) {
        // do cross scripting through username
        var messageText = message.username + ': ' + message.text;
        this.node.append($("<div class=\"message\">" + _.escape(messageText) + "</div>"));
    };
    return MessageList;
}());

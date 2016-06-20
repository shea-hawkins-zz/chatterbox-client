var MessageService = (function () {
    function MessageService(url) {
        this.ajaxOptions = {
            url: url,
            contentType: 'application/jsonp',
            jsonp: true
        };
        this._setScheduler();
        this.messages = [];
    }
    MessageService.prototype._isDuplicate = function (message) {
        for (var _i = 0, _a = this.messages; _i < _a.length; _i++) {
            var oldMessage = _a[_i];
            if (oldMessage.objectId === message.objectId) {
                return true;
            }
        }
        return false;
    };
    MessageService.prototype._parseMessages = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var message = data_1[_i];
            if (!this._isDuplicate(message)) {
                this.messages.push(message);
            }
        }
    };
    MessageService.prototype._setScheduler = function () {
        this.scheduler = Rx.Scheduler.default.schedulePeriodic(null, 1000, this.getMessages.bind(this));
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        this.ajaxOptions.type = 'GET';
        this.ajaxOptions.success = function (data) {
            _this._parseMessages(data.results);
            console.log(_this.messages);
        };
        $.ajax(this.ajaxOptions);
        return this.messages;
    };
    MessageService.prototype.postMessages = function () {
        this.ajaxOptions.type = 'POST';
        $.ajax(this.ajaxOptions);
    };
    return MessageService;
}());

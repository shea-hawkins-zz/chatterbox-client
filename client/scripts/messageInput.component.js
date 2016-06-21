var MessageInput = (function () {
    function MessageInput(id, messageService) {
        var _this = this;
        this.node = $("#" + id);
        this.node.append($('<div></div>').html('<input type="text" class="inputForm"></input><button type="submit" class="submit btn btn-primary">Submit</button>'));
        $('.submit').on('click', function () {
            _this.message = $('.inputForm').val();
            messageService.postMessage({ text: _this.message, username: getUsername(), room: 'general' });
        });
    }
    return MessageInput;
}());

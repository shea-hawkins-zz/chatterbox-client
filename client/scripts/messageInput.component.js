var MessageInput = (function () {
    function MessageInput(id, messageService) {
        var _this = this;
        this.node = $("#" + id);
        this.node.append($('<div></div>').html("\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"inputForm form-control\"></input>\n        <button type=\"submit\" class=\"submit btn btn-default\">Send Message</button>\n      </div>\n    "));
        $('.submit').on('click', function () {
            _this.message = $('.inputForm').val();
            messageService.postMessage({
                username: getUsername(),
                text: _this.message,
                roomname: 'general'
            });
            // erase message once sent
            $('.inputForm').val('');
        });
    }
    return MessageInput;
}());

var MenuBar = (function () {
    function MenuBar(id, messageService) {
        this.node = $("#" + id);
        this.messageService = messageService;
        this.rooms = [];
        this.node.html("\n      <div class=\"dropdown\">\n        <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" id=\"roomsButton\">Rooms</button>\n        <ul class=\"dropdown-menu\" id=\"rooms\" aria-labelledby=\"roomsButton\">\n        </ul>\n      </div>  \n     ");
        setInterval(this.getRooms.bind(this), 1000);
    }
    MenuBar.prototype.getRooms = function () {
        // array of rooms
        this.updateRooms(this.messageService.rooms);
    };
    MenuBar.prototype.updateRooms = function (newRooms) {
        var _this = this;
        newRooms.forEach(function (room) {
            if (_this.rooms.indexOf(room) < 0) {
                $('#rooms').append($("<li>" + room + "</li>"));
                _this.rooms.push(room);
            }
        });
    };
    return MenuBar;
}());

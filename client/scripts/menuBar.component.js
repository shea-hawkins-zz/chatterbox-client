var MenuBar = (function () {
    function MenuBar(id, messageService) {
        this.node = $("#" + id);
        this.messageService = messageService;
        this.rooms = [];
        this.node.html("\n      <div class=\"dropdown\">\n        <button class=\"btn btn-primary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" id=\"roomsButton\">Rooms</button>\n        \n        <ul class=\"dropdown-menu\" id=\"rooms\" aria-labelledby=\"roomsButton\">\n          <li><div class=\"form-group\"><input type=\"text\" class=\"form-control dropdownInput\" id=\"newRoom\"></input><button id=\"newRoomButton\" class=\"btn btn-primary\">New Room</button></div></li>\n        </ul>\n      </div>  \n    ");
        this.getRooms();
        this.room = this.rooms[0] || '';
        this.node.append("<div id=\"currentRoom\">" + this.room + "</div>");
        this.onRoomAdd(this.addRoom.bind(this));
        setInterval(this.getRooms.bind(this), 1000);
    }
    MenuBar.prototype.getRooms = function () {
        // array of rooms
        this.updateRooms(this.messageService.rooms);
    };
    MenuBar.prototype.addRoom = function (roomname) {
        var message = {
            text: " has created a new room " + roomname,
            roomname: roomname,
            username: getUsername()
        };
        this.messageService.postMessage(message);
    };
    MenuBar.prototype.onRoomAdd = function (callback) {
        $('#newRoomButton').on('click', function (event) {
            $('#currentRoom').text($('#newRoom').val());
            callback($('#newRoom').val());
        });
    };
    MenuBar.prototype.onRoomChange = function (callback) {
        var _this = this;
        $('#rooms').on('click', function (event) {
            if (event.target.id === 'newRoomButton') {
                return;
            }
            _this.room = event.target.textContent;
            $('#currentRoom').text(_this.room);
            callback(_this.room);
        });
    };
    MenuBar.prototype.changeRoom = function (room) {
    };
    MenuBar.prototype.updateRooms = function (newRooms) {
        var _this = this;
        newRooms.forEach(function (room) {
            room = _.escape(room);
            if (_this.rooms.indexOf(room) < 0) {
                $('#rooms').append($("<li>" + room + "</li>"));
                _this.rooms.push(room);
            }
        });
    };
    return MenuBar;
}());

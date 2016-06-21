class MenuBar {
  constructor (id, messageService) {
    this.node = $(`#${id}`);
    this.messageService = messageService;
    this.rooms = [];
    this.node.html(`
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" id="roomsButton">Rooms</button>
        <ul class="dropdown-menu" id="rooms" aria-labelledby="roomsButton">
        </ul>
      </div>  
     `);
    setInterval(this.getRooms.bind(this), 1000);
    

  }
  
  getRooms() {
    // array of rooms
    this.updateRooms(this.messageService.rooms);
  }

  updateRooms(newRooms) {
    newRooms.forEach(room => {
      if (this.rooms.indexOf(room) < 0) {
        $('#rooms').append($(`<li>${room}</li>`);
        this.rooms.push(room);
      }
    });
  }

}
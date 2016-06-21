class MessageList {
  constructor(id, messageService) {
    //messageService.getObservable().subscribe();
    this.node = $(`#${id}`);
    this.subscribeToService(messageService);
    this.messages = [];
    this.filter = function(message) {
      return true;
    };
  }

  subscribeToService(messageService) {
    messageService.observable.subscribe(message => {
      if (this.filter(message)) {
        this.displayMessage(message);
      }

      this.messages.push(message);
    });
  }

  displayMessage(message) { // Display Messages
    // do cross scripting through username
    var messageText = message.username + ': ' + message.text;
    this.node.append($(`<div class="message">${_.escape(messageText)}</div>`));
  }

  setFilter(key, value) { // Display Messages
    // do cross scripting through username
    // First blast currently existing messages
    this.node.html('');
    // Filter preexisting messages
    this.filter = function(message) {
      return message[key] = value;s
    };

    _(this.messages).filter(this.filter).forEach(this.displayMessage.bind(this));
  }

  setRoom(room) {
    this.setFilter('roomname', room);  
  }

}


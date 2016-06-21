class MessageList {
  constructor(id, messageService) {
    //messageService.getObservable().subscribe();
    this.node = $(`#${id}`);
    this.subscribeToService(messageService);
  }

  subscribeToService(messageService) {
    messageService.observable.subscribe(message => {
      this.displayMessage(message);
    });
  }

  displayMessage(message) {
    // do cross scripting through username
    var messageText = message.username + ': ' + message.text;
    this.node.append($(`<div class="message">${_.escape(messageText)}</div>`));
  }
}
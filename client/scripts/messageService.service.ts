
class MessageService {

  constructor(url) {
    this.ajaxOptions = {
      url: url,
      contentType: 'application/jsonp',
      jsonp: true
    };

    this._setScheduler();
    this.messages = [];
  }

  _isDuplicate(message) {
    for (var oldMessage of this.messages) {
      if (oldMessage.objectId === message.objectId) {
        return true;
      }
    }
    return false;
  }

  _parseMessages(data) { //possible location for optimization
   for (var message of data) {
     if (!this._isDuplicate(message)) {
       this.messages.push(message);
     }
   }
  }
  
  _setScheduler() {
    this.scheduler = Rx.Scheduler.default.schedulePeriodic(
      null,
      1000,
      this.getMessages.bind(this)
    );
  }

  getMessages() {
    
    this.ajaxOptions.type = 'GET';
    this.ajaxOptions.success = (data) => {
      this._parseMessages(data.results);
      console.log(this.messages);
    };
    $.ajax(this.ajaxOptions);
    return this.messages;
  }


  postMessages() {
    this.ajaxOptions.type = 'POST';
    $.ajax(this.ajaxOptions);
  }

  
}


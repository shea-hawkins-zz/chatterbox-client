
class MessageService {

  constructor(url) {
    this.ajaxOptions = {
      url: url,
      contentType: 'application/jsonp',
      jsonp: true
    };
    this.messages = [];
    this.observable = this._createObserver();
    this._setScheduler();
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
       // Observer only exists when the object is currently being subscribed to.
       this.observer.next(message);
      }
    }
  }
  
  _setScheduler() {
    this.getMessages();
    this.scheduler = Rx.Scheduler.default.schedulePeriodic(
      null,
      1000,
      this.getMessages.bind(this)
    );
  }
  
  _createObserver() {
    return Rx.Observable.create(observer => {
      this.observer = observer;
    });
  }

  getMessages() {
    this.ajaxOptions.type = 'GET';
    this.ajaxOptions.success = (data) => {
      this._parseMessages(data.results);
    };
    $.ajax(this.ajaxOptions);
    return this.messages;
  }
  postMessages() {
    this.ajaxOptions.type = 'POST';
    $.ajax(this.ajaxOptions);
  }
}


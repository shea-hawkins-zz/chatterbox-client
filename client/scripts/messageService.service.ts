
class MessageService {

  constructor(url) {
    this.url = url;
    this.getUrl = url + '?order=-createdAt';
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
       // Observer only exists when the object is currenstly being subscribed to.
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
    $.ajax({
      url: this.getUrl,
      type: 'GET',
      contentType: 'application/jsonp',
      jsonp: true,
      success: (data) => {
        this._parseMessages(data.results);
      }
    });
    return this.messages;
  }

  postMessage(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }
}

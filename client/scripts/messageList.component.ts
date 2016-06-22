class MessageList {
  constructor(id, messageService) {
    //messageService.getObservable().subscribe();
    this.node = $(`#${id}`);
    this.subscribeToService(messageService);
    this.messages = [];
    this.friends = [];
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
    if (this.friends.indexOf(message.username) >= 0) {
      var friend = `friend ${message.username}`;
    } else {
      var friend = `${message.username}`;
    }

    this.node.append($('<div class="card"></div>');
    
    this.node.last().append(
      $(`<div class="card-header user ${friend}">${_.escape(message.username)}</div>`)
      .on('click', (event) => {
         if (this.friends.indexOf(event.target.textContent) < 0) {
           this.friends.push(event.target.textContent);
           console.log($(`.${event.target.textContent}`).addClass('friend'));
         }
         console.log(this.friends);
       })).append($(`<div class="card-block message">${_.escape(message.text)}</div>`)).hide().fadeIn(3000);
  }

  setFilter(key, value) { // Display Messages
    // do cross scripting through username
    // First blast currently existing messages
    this.node.html('');
    // Filter preexisting messages
    this.filter = function(message) {
      return message[key] === value;
    };

    _(this.messages).filter(this.filter).forEach(this.displayMessage.bind(this));
  }

  setRoom(room) {
    this.setFilter('roomname', room);  
  }

}


// <div class="card" >
//   <div class="card-header" >
//     Featured
//     < /div>
//     < div class="card-block" >
//       <h4 class="card-title" > Special title treatment< /h4>
//         < p class="card-text" > With supporting text below as a natural lead-in to additional content.</p>
//           < a href= "#" class="btn btn-primary" > Go somewhere< /a>
//             < /div>
//             < /div>

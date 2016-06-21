class MessageInput {
  constructor(id, messageService)  {
    this.node = $(`#${id}`);
    this.node.append($('<div></div>').html('<input type="text" class="inputForm"></input><button type="submit" class="submit btn btn-primary">Submit</button>');
    $('.submit').on('click', () => {
      this.message = $('.inputForm').val();
      messageService.postMessage({ text: this.message, username: getUsername(), roomname: 'general'});
    });
  }
}

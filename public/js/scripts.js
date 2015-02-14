'use strict';

var socket = io.connect();

(function(d) {



  var add_message_form = d.getElementById('add_message_form'),
      the_message = d.getElementById('the_message');

  add_message_form.addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('add message', the_message.value);
  });


})(document);

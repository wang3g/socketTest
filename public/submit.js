
  var socket = io('http://localhost');
  socket.on('welcome', function (data) {
  	$('#greeting').text(data.hello);
  });

 $(document).ready(function(){
    $('#submitMsg').click(function(){
    	var msg = $('#sendMsg').val();
      console.log('submit is clicked!');
    	socket.emit('send message', {sendMsg: msg});
      $('#sendMsg').val('');
    });

    socket.on('broadcast message', function(data){
       $('#received').text(data.broadcast);
    });
  });


var events = require('events');
eventEmitter = new events.EventEmitter();
 eventEmitter.on('print' , function(data){
    console.log("hello  " + data);
 })

 eventEmitter.emit('print' , 'yousif')
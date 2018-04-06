var Sorter = require('sugar-sorting');
var cluster = require('cluster');

// Number of threads we're going to create
var numThreads = 1;

// How many arrays you want to create
var totalArrays = 1000;

// The process will only get inside this if it isn't a worker
if (cluster.isMaster) {
  // Starting time
  var start = Date.now();

  // This variable will hold our sorted arrays
  var sortedArrays = [];

  // Here we're creating enourmous arrays
  // Then we push them into randomArrays
  var randomArrays = [];
  for (var i = 0; i < totalArrays; i++) {
    randomArrays.push(generateRandomArray());
  }

  function generateRandomArray() {
    var array = [];
    var length = 1000;

    for (var i = 0; i < length; i++) {
      array.push(Math.random() * 1000);
    }
    return array;
  }

  // Here we are:
  // Creating the workers;
  // Defining their action's callbacks;
  // Sending them the arrays they should sort;
  for (var t = 0; t < numThreads; t++) {
    var worker = cluster.fork();

    // When the workers send a message with the results we save them
    // After we've got the results we kill the worker
    worker.on('message', function(workerArrays) {
      for (var arr = 0; arr < workerArrays.length; arr++) {
        sortedArrays.push(workerArrays[arr]);
      }
      console.log('Process ' + this.process.pid + '  has finished sorting its arrays.');
      this.destroy();
    });
    
    // Here we're sending some random arrays for the worker to sort
    worker.send(randomArrays.splice(0, (totalArrays/numThreads)));
  }

  cluster.on('exit', function(worker) {
    // When the master has no more workers alive it
    // prints the elapsed time and then kills itself 
    if (Object.keys(cluster.workers).length === 0) {
      console.log('Every worker has finished its job.');
      console.log('Elapsed Time: ' + (Date.now() - start) + 'ms');
      process.exit(1);
    }
  });

} else {
  // This is the work our workers are going to do
  // They start working after getting the message with some random arrays
  process.on('message', function(arrays) {
    console.log('Process ' + process.pid + '  is starting to sort.');
    var arraysIHave = arrays;

    for (var i = 0; i < arraysIHave.length; i++) {
      var s = new Sorter(arraysIHave[i]);
      s.bubbleSort();
      arraysIHave[i] = s.getElements();
    }

    process.send(arraysIHave);
  });
}
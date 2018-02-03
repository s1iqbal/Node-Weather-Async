var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof(a) === 'number' && typeof(b) === 'number') {
        resolve(a+b);
      } else {
        reject('Invalid Arugment. Please enter two numbers.')
      }
    }, 1500);
  });
};


//practice on chaining promises
asyncAdd(5,7).then((res) => {
  console.log('Result: ', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 45, result = ', res );
}).catch((errorMessage) => {
  console.log(errorMessage);
});

//
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Fulfilled promise.'); //you can only have one resolve or reject per promise, unlike callback which u can have multiple of
//     reject('Unable to fullfill promise.');
//   }, 2500);
// }); //Promise() takes a function that either resolves or rejects the promise.
//
// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// }
// );

var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Saad'
  };
  setTimeout(() => {
      callback(user);
  }, 3000); 

};

//calling the function getUser, with id 31, and it runs the callback function
getUser(31, (userObject) => {
  console.log(userObject);
});

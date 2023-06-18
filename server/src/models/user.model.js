const dbConn = require('../../configs/db.configs');

const User = function(user) {
    this.fullname = user.fullname;
    this.username = user.username;
    this.password = user.password;
}


User.getAllUser = (result) => {
  dbConn.query(`SELECT * FROM users`, (err, res) => {
      if(err) {
          console.log('Error while fetching Contacts', err);
          result(null, err);
      } else {
          console.log('Contacts fetched success');
          result(null, res);
      }
  });
}


User.login = (userData, result) => {
    dbConn.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
      [userData.username, userData.password], 
      (err, res) => {
        if(err) throw res.send(err);

        // console.log(res);
        if(res.length == 0) {
            result(null, err);
        }


        userData.password = undefined;
        result(null, res);
      }
    )
}

module.exports = User;
const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'exams'
});


dbConn.connect((error) => {
    if(error) throw error;
    console.log('Database connectec successfully');
});

module.exports = dbConn;
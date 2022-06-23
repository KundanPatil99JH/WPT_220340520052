let dbconnect = {
	host: 'locahost',
	user: 'shirpur',
	password: 'cdac',
	database: 'student',
	port: 3306
};
const mysql = require('mysql2');
const con = mysql.createConnection(dbconnect);
console.log('Database connect establish');

app.get('/checkBookId', (req, res) => {
	console.log("inside /checkBookId");
	console.log(req.query);
	let input = req.query.x;
	console.log(input);

	let output = { status: false, bookDetails: { bookid: 0, bookname: '', price: 0 } }
	con.query('select * from book where bookid=?', [input],
		(err, rows) => {
			console.log(rows);
			if (err) {
				console.log("Error feaching rows from database");
			}
			else {
				if (rows.lenght > 0) {
					output.status = true;
					output.bookDatails = rows[0];
				}
			}
			res.send(output);
		});
});

app.listen(8081, function () {
	console.log("server listening at port 8081...");
});
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database('mydb.db');

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to get email submissions
app.get('/emails', (req, res) => {
	db.all('SELECT * FROM email_submissions', [], (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

// Endpoint to submit email
app.post('/submit-email', (req, res) => {
	const { email } = req.body;

	db.run(
		'INSERT INTO email_submissions (email) VALUES (?)',
		[email],
		function (err) {
			if (err) {
				return res.status(500).json({ error: err.message });
			}
			res.status(200).json({ id: this.lastID, email: email });
		}
	);
});

// Socket.io logic
io.on('connection', (socket) => {
	console.log('New client connected');

	// Emit button click count
	db.get('SELECT count FROM button_clicks WHERE id = 1', (err, row) => {
		if (err) {
			console.error(err.message);
		}
		socket.emit('updateCounter', row.count);
	});

	socket.on('incrementCounter', () => {
		db.run('UPDATE button_clicks SET count = count + 1 WHERE id = 1', (err) => {
			if (err) {
				console.error(err.message);
			}
			// Emit updated count to all clients
			db.get('SELECT count FROM button_clicks WHERE id = 1', (err, row) => {
				if (err) {
					console.error(err.message);
				}
				io.emit('updateCounter', row.count);
			});
		});
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(3000, () => {
	console.log('Server running on port 3000');
});

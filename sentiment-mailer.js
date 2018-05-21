const sqlite3 = require('sqlite3').verbose();
const events = require('events');
const mailsender = require('./sendmail.js');


const eventEmitter = new events.EventEmitter();

let db = new sqlite3.Database('./db/twitter_stream_v1.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the test database.');
});
let rowIds = [];


db.serialize(() => {
    db.all(`SELECT *  FROM Tweets WHERE is_analyzed AND NOT is_handled`, (err, rows) => {
        rows.forEach(row => {

            if (row.sentiment < -0.5 || row.anger > 0.5 ||
                row.disgaust > 0.5 || row.sadness > 0.5) {
                mailsender(row);
                rowIds.push(row.id);
            }

        });

        eventEmitter.emit('mail_complete');

    });

});


eventEmitter.on('mail_complete', function () {

    db.run('UPDATE Tweets SET is_handled = 1 WHERE id IN (' + rowIds.toString() + ')', [], function (err) {
        if (err) {
            console.log('error is' + err);
        }
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });

});
# Sentiment Mailer
A simple node utility to email sentiments about any topic
This application uses a gmail address to send and receive sentiment emails.

Credentials to verify if an email has been received
* User name - `Your username`
* Pwd       - `Your password`

It expects a sqlite db named `twitter_stream_v1.db` to be present under the db folder.
It uses a relative path so if something needs to be changed, adjust the connection string accordingly.

# Pre-requisites
* NodeJS installed (https://nodejs.org/en/)

# Dependencies
This application has the following dependencies

* sqlite3 - 4.0.0 - To connect to sqlite database
* nodemailer - 4.6.4 - To email using gmail.


# Install application dependencies
* Open a terminal
* Navigate to the sentiment-mailer directory
* Run the following command to install the project dependencies.
```bash
    npm install
```
# To run the application
```bash
    node sentiment-mailer.js 
```

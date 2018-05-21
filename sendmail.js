const template = require('./email-template.js');
let nodemailer = require('nodemailer');
let transporter = null;


const getHtml = function (tweet) {
    var header = `&#x1F61E;`;
    if (tweet.anger > 0.7)
        header += ` &#x1F620`;

    if (tweet.sadness > 0.7)
        header += ` &#x1F622`;

    if (tweet.fear > 0.6)
        header += ` &#x1F628`;


    var html = `<pLooks like someone is unhappy with either our products or services. On ` + tweet.twitter_created + `, <b>` + tweet.twitter_username +
        `</b> expressed some discontentment tweeting this.</p>`;

    html += `<p><i>&quot;` + tweet.tweet + `&quot;</i></p>`;
    return template.getTemplateHtml(header, html);
}

const getMailOptions = function (row) {
    return {
        from: 'Sentiment-mailer <yourusername@gmail.com>', // sender address
        to: 'yourusername@gmail.com', // list of receivers
        subject: 'We have an unhappy customer', // Subject line
        text: row.id + ' - Sentiment not so good ✔', // plaintext body
        html: getHtml(row) // template.templateHtml // html body
    };
}
module.exports = function (row) {
    // create reusable transporter object using SMTP transport
    if (!transporter) {
        // console.log('creating transporter');
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'yourusername@gmail.com',
                pass: 'YourPassword'
            }
        });
    }

    // send mail with defined transport object
    transporter.sendMail(getMailOptions(row), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}
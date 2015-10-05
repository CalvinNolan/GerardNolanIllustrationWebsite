//Created by Calvin Nolan
//With help from Conor Brennan (https://github.com/c-brenn), Eoin Houlihan (https://github.com/houli) and Ian Connolly (https://github.com/IanConnolly)

var express = require('express');
var app = express();
var port = parseInt(process.argv[2], 10);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

//Uncomment the next line to see all requests to the server in the console.
//app.use(morgan('dev'));

app.use(bodyParser());
app.use('/static', express.static(__dirname + '/static'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');

//Html redirect requests.
app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/Contact', function(req, res) {
	res.render('contact.html');
});

app.get('/About', function(req, res) {
	res.render('about.html');
});

app.get('/Aras', function(req, res) {
	res.render('Aras.html');
});

app.get('/AutumnGirl', function(req, res) {
	res.render('AutumnGirl.html');
});

app.get('/BirdOfPrayer', function(req, res) {
	res.render('BirdOfPrayer.html');
});

app.get('/BuccaneerDreams', function(req, res) {
	res.render('BuccaneerDreams.html');
});

app.get('/Dreams', function(req, res) {
	res.render('Dreams.html');
});

app.get('/HalloweenDreams', function(req, res) {
	res.render('HalloweenDreams.html');
});

app.get('/MonkeyPuzzleDreams', function(req, res) {
	res.render('MonkeyPuzzleDreams.html');
});

app.get('/Oscar', function(req, res) {
	res.render('Oscar.html');
});

app.get('/Prison', function(req, res) {
	res.render('Prison.html');
});

app.get('/Tabby', function(req, res) {
	res.render('Tabby.html');
});

app.get('/TabbyTypography', function(req, res) {
	res.render('TabbyTypography.html');
});

app.get('/ThreeKings', function(req, res) {
	res.render('ThreeKings.html');
});

app.get('/WishKindle', function(req, res) {
	res.render('Wishkindle.html');
});

app.get('/ThreeKingsModel', function(req, res) {
	res.render('3KingsModel.html');
});

app.get('/ThreeKingsInner', function(req, res) {
	res.render('3KingsInner.html');
});

app.get('/ThreeKingsOuter', function(req, res) {
	res.render('3KingsOuter.html');
});

app.get('/Smedley', function(req, res) {
	res.render('Smedley.html');
});

app.get('/TabbyRockingHorse', function(req, res) {
	res.render('TabbyRockingHorseSpread.html');
});

app.get('/JamesJoyce', function(req, res) {
	res.render('JamesJoyce.html');
});

app.get('/May22nd', function(req, res) {
	res.render('May22nd.html');
});

app.get('/Bunboozle', function(req, res) {
	res.render('Bunboozle.html');
});

app.get('/BunboozleCarousel', function(req, res) {
	res.render('BunboozleCarousel.html');
});

app.get('/ASadState', function(req, res) {
	res.render('ASadState.html');
});

//Auto-mailer for the Contact form.
app.post('/html_form_send', function(req, res) {
	var body = req.body;
	console.log(body.email);

	// setup e-mail data with unicode symbols
	if(body.email != "" && body.name != "" && body.message != "")
	{
		var mailOptions = {
		    from: 'GN Illustration: ' + body.name, // sender address
		    to: 'gtnolan@gmail.com', // list of receivers
		    subject: body.subject, // Subject line
		    text: 'text', // plaintext body
		    html: "<p>Message from: " + body.name + "</p>" 
		    	+ "<p>Email address: " + body.email + "</p>" 
		    	+ "<p>Subject: " + body.subject + "</p>" 
		    	+ "<p>Message: " + body.message + "</p>"// html body
		};
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});
	}

	

	res.redirect('/contact');
});

app.listen(port);
console.log('Server listening on port: ' + port);

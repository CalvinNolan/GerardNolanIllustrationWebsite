//Created by Calvin Nolan
//With help from Conor Brennan (https://github.com/c-brenn), Eoin Houlihan (https://github.com/houli) and Ian Connolly (https://github.com/IanConnolly)

var express = require('express');
var app = express();
var port = parseInt(process.argv[2], 10);

var morgan = require('morgan');
var bodyParser = require('body-parser');
var helper = require('sendgrid').mail

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

app.get('/Bunboozle', function(req, res) {
	res.render('Bunboozle.html');
});

app.get('/BunboozleCarousel', function(req, res) {
	res.render('BunboozleCarousel.html');
});

app.get('/ASadState', function(req, res) {
	res.render('ASadState.html');
});

app.get('/RainbowPants', function(req, res) {
	res.render('RainbowPants.html');
});

app.get('/JonathanSwift', function(req, res) {
	res.render('JonathanSwift.html');
});

app.get('/WBYeats', function(req, res) {
	res.render('WBYeats.html');
});

app.get('/BramStoker', function(req, res) {
	res.render('BramStoker.html');
});

app.get('/PeekAndBoo', function(req, res) {
  res.render('PeekAndBoo.html');
});

app.get('/PeekAndBooMouse', function(req, res) {
  res.render('PeekAndBooMouse.html');
});

app.get('/PeekAndBooBaboon', function(req, res) {
  res.render('PeekAndBooBaboon.html');
});

app.get('/PeekAndBooSun', function(req, res) {
  res.render('PeekAndBooSun.html');
});

app.get('/PeekAndBooBus', function(req, res) {
  res.render('PeekAndBooBus.html');
});

app.get('/Wrensong', function(req, res) {
  res.render('Wrensong.html');
});

//Auto-mailer for the Contact form.
app.post('/html_form_send', function(req, res) {
	var body = req.body;

	from_email = new helper.Email(body.email);
	to_email = new helper.Email("gerardnolanillustration@gmail.com");
  	subject = body.name + ": " + body.subject;
  	content = new helper.Content("text/plain", body.message)
  	mail = new helper.Mail(from_email, subject, to_email, content)

  	var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
  	var requestBody = mail.toJSON();
  	var request = sg.emptyRequest();
  	request.method = 'POST';
  	request.path = '/v3/mail/send';
  	request.body = requestBody;
  	sg.API(request, function (response) {
  	  console.log(response.statusCode)
  	  console.log(response.body)
  	  console.log(response.headers)
  	});

	res.redirect('/contact');
});

app.listen(port);
console.log('Server listening on port: ' + port);

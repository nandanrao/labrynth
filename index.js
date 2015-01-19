var express = require('express'),
		app = express(),
		needle = require('needle'),
		bodyParser = require('body-parser')

app.use(express.static(__dirname + ''))
app.use(bodyParser.json());


var base = 'http://challenge2.airtime.com:7182/';
var options = {
	headers: {
		'X-Labyrinth-Email' : 'nandanmarkrao@gmail.com'
	},
	json: true
}

app.get('/navigate/:q', function(req, res, next){
	var data = req.query
	needle.request(req.method, base + req.params.q, data, options, function(err, resp){
		res.json(resp.body)
	})
})

app.post('/navigate/report', function(req, res, next){
	needle.post(base + 'report', req.body, options, function(err, resp){
		console.log('we heard back', err, resp.body)
	})
})

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'))
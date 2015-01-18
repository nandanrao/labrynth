var express = require('express'),
		app = express(),
		needle = require('needle')

app.use(express.static(__dirname + ''))

var base = 'http://challenge2.airtime.com:7182/';
var options = {
	headers: {
		'X-Labyrinth-Email' : 'nandanmarkrao@gmail.com'
	}	
}

app.use('/navigate/:q', function(req, res, next){
	var data = req.query
	needle.request(req.method, base + req.params.q, data, options, function(err, resp){
		res.json(resp.body)
	})
})

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'))
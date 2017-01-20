var express = require('express');
var router = express.Router();
var request = require('request');
var md5 = require('md5');

router.get('/', function(req, res, next) {
    var url = decodeURIComponent(req.query.url);
    request(url, function(error, response, body) {
        var jsonResponse = {};
        if (error) {
            jsonResponse['status'] = 'request failed';
            jsonResponse['path'] = url;
        }
        if (response.statusCode !== 200) {
            jsonResponse['status'] = response.statusCode;
            jsonResponse['path'] = url;
            jsonResponse['length'] = '';
            jsonResponse['md5'] = '';
        } else {
            jsonResponse['status'] = response.statusCode;
            jsonResponse['path'] = url;
            jsonResponse['length'] = (response.headers['content-length'] / 1000) + 'kb';
            jsonResponse['md5'] = md5(response.body);
        }

        res.send(jsonResponse);
    });
});

module.exports = router;

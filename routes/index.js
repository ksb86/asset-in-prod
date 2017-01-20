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
        } else {

            if (response.statusCode !== 200) {
                jsonResponse['status'] = response.statusCode;
                jsonResponse['path'] = url;
                jsonResponse['length'] = '';
                jsonResponse['md5'] = '';
            } else {
                // compression screws up the content-length header name
                var length = response.headers['content-length'] || response.headers['cteonnt-length'];
                jsonResponse['status'] = response.statusCode;
                jsonResponse['path'] = url;
                jsonResponse['length'] = (length / 1000) + 'kb';
                jsonResponse['md5'] = md5(response.body);
            }
        }

        res.send(jsonResponse);
    });
});

module.exports = router;

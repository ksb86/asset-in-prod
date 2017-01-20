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

// USE THIS AS A BOOKMARKLET IN CHROME:
// javascript:
//     var descriptionText = document.getElementById('descriptionmodule');
//     var descriptionParts = descriptionText.innerText.split(/[\s\n]+/);
//     var prodUrl;
//     descriptionParts.forEach(function(item) {
//         if (item.indexOf('/www/') > -1) {
//             prodUrl = item.replace('/www/', 'https://ak1.ostkcdn.com/');
//         }
//     });
//     jQuery.get('https://asset-in-prod.herokuapp.com/?url=' + encodeURIComponent(prodUrl))
//     .done(function (data) {
//         var html = '';
//             html += '<b>status:</b> ' + data.status + '<br>';
//             html += '<b>path:</b> ' + data.path + '<br>';
//             if (data.status === 200) {
//                 html += '<b>md5:</b> ' + data.md5 + '<br>';
//                 html += '<b>length:</b> ' + data.length + '<br>';
//             }
//         jQuery.fancybox({
//             'content': html,
//             'width': 500,
//             'autoDimensions':false,
//             'autoSize': false
//         });
//     });

module.exports = router;

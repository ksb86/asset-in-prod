// USE THIS AS A BOOKMARKLET IN CHROME:
// javascript:
var descriptionText = document.getElementById('descriptionmodule');
if (descriptionText) {

    var descriptionParts = descriptionText.innerText.split(/[\s\n]+/);
    var prodUrl;
    descriptionParts.forEach(function(item) {
        if (item.indexOf('/www/') > -1) {
            prodUrl = item.replace('/www/', 'https://ak1.ostkcdn.com/');
        }
    });
    jQuery.get('https://asset-in-prod.herokuapp.com/?url=' + encodeURIComponent(prodUrl)).done(function(data) {
        var html = '';
        html += '<b>status:</b> ' + data.status + '<br>';
        html += '<b>path:</b> ' + data.path + '<br>';
        if (data.status === 200) {
            html += '<b>md5:</b> ' + data.md5 + '<br>';
            html += '<b>length:</b> ' + data.length + '<br>';
        }
        jQuery.fancybox({
            'content': html,
            'width': 500,
            'autoDimensions': false,
            'autoSize': false
        });
    });
}

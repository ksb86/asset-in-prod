function() {
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
            var deployMessage = 200 === data.status ? "DEPLOYED TO PROD! BOOM BOOM!" : "NOT DEPLOYED";
            html += '<b>Path:</b> ' + data.path + '<br>';
            html += "<b>Deploy Status:</b> " + deployMessage + '<br><hr>';
            if (data.status === 200) {
                html += '(' + data.md5 + ')';
            }
            jQuery.fancybox({
                'content': html,
                'width': 500,
                'autoDimensions': false,
                'autoSize': false
            });
        });
    }

}();

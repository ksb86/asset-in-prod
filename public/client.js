(function() {
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
            var styleTag = "<style>"
            var html = '';
            var deployMessage = 'DEPLOYED TO PROD!';
            var statusColor = '#118c01';
            if (data.status !== 200) {
                deployMessage = 'NOT ' + deployMessage;
                statusColor = '#a30000';
            }
            html += '<div style="font-weight: bold;font-size: 24px;border-bottom: 1px solid lightgrey;padding-bottom: 20px;margin: 20px 0;color:' + statusColor + ';">' + deployMessage + '</div>';
            html += '<div style="color: #484848;"><strong style="width: 85px; display: inline-block; padding-bottom: 5px;">Path:</strong> ' + data.path + '</div>';
            html += '<div style="color: #484848;"><strong style="width: 85px; display: inline-block;">Prod md5:</strong> ' + data.md5 + '</div>';
            jQuery.fancybox({
                'content': html,
                'width': 500,
                'height': 150,
                'autoDimensions': false,
                'autoSize': false
            });
        });
    }
})();

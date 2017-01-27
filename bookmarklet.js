// USE THIS AS A BOOKMARKLET IN CHROME:


// javascript:
(function() {
    var a = document.createElement("script"),
        c = (new Date).getTime(),
        e = "https://asset-in-prod.herokuapp.com/client.js";
    a.setAttribute("src", e + "?t=" + c), document.body.appendChild(a)
})();

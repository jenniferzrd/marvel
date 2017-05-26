var app = (function app() {
  "use strict";

  var btn, getDataFormApi, createCard, res, displayData, reqLimit = 100, results, apiKey ="356c6eb2432ef8decb74dcc22d70d776";

  log("ready");

     window.onload = function start(){
         btn = byId("get_data");
         res = byId("results");

         btn.onclick = getDataFormApi;
     };

     createCard = function createCard(data) {
var links = (function getLinks() {
  var str = "";
  function createLinks(url, cls) {
    return '<a href="${url}" class="icon ${cls}" target="_blank"></a>';
  }
  data.urls.forEach(function parse(u) {

if (u.type === "detail") {
    str += '<a href="${u.url}" class="icon fa fa-info-circle" target="_blank"></a>';
} else if (u.type === "wiki"){
    str += '<a href="${u.url}" class="icon fa fa-wikipedia-w" target="_blank"></a>';
} else if (u.type === "comicLink"){
  str += '<a href="${u.url}" class="icon fa fa-info-circle" target="_blank"></a>';
}
});
return str;
}());
  return '<div class=\"card\">card<input type="hidden" value="${data.id}"><h3 class=\"title\">${data.name}</h3><img class="img" src="${data.thumbnail.path}.${data.thumbnail.extension}"></div><div class="links">$.{links}</a></div>';

     };

     displayData = function displayData(dataSet){
         dataSet.forEach(function parse(data) {
             log(data);
             res.innerHTML += createCard(data);
         });
     };

     getDataFormApi = function getDataFormApi() {
         log("click");
         var req, xhr;

         req = "https://gateway.marvel.com:443/v1/public/characters?limit=" + reqLimit +"&apikey=" + apiKey;

         xhr = new XMLHttpRequest();
         xhr.open("get", req);

         xhr.onload = function getResponse(res) {
           res = JSON.parse(this.response);
             log(res);
             displayData(res.data.results);
         };
         xhr.send();
     };
}());

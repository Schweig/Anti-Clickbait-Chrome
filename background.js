//Chrome extension to remove clickbait with keywords about page

for(var i = 0, l=document.links.length; i<l; i++) {
  if (document.links[i].innerHTML.toLowerCase().includes("You Won't Believe".toLowerCase())) {
    document.links[i].innerHTML = document.links[i].href;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27", false);
    xhr.setRequestHeader("Content-type", "application/json");
    var payload = {
  url:document.links[i].href,
  "features": {
    "entities": {
      "emotion": true,
      "sentiment": true,
      "limit": 2
    },
    "keywords": {
      "emotion": true,
      "sentiment": true,
      "limit": 2
    }
  }
};
    xhr.send(JSON.stringify(payload));
    var result = JSON.parse(xhr.response);
    document.links[i].innerHTML = result.keywords[0].text
    console.log(result )
  }
}

var TWITCHY = TWITCHY || {};


TWITCHY.Main = (function() {
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  var apiurl = 'https://wind-bow.gomix.me/twitch-api';  // channels/freecodecamp/';
  var cardtemplate =
      '<div class="col-sm-6"> \
          <div class="card"> \
            <div class="card-block">\
              <h3 class="card-title">{{STREAMTITLE}}</h3>\
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>\
              <a href="#" class="btn btn-primary">Go somewhere</a>\
            </div>\
          </div>\
        </div>';

  function hello() {
    console.log('hello from twitchy');
  }

  function listStreams() {
    console.log('listStreams ENTER');
    var url = proxy + apiurl + '/streams/featured';
    $.getJSON(url, function(data) {
      //console.log(data);
      var streams = $('#streams');
      console.log('streams:', streams);
      for (var i=0; i < data.featured.length; i++) {
	$(cardtemplate.replace("{{STREAMTITLE}}", data.featured[i].title)).appendTo(streams);
      }
    }).fail(function() {
      console.log('call to', url, 'failed');
    });
  }

  return {
    hello: hello,
    listStreams: listStreams
  };

})();

var oldtwitchy = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    url: 'https://wind-bow.gomix.me/twitch-api/channels/freecodecamp/',

    test: function() {
        $.getJSON(this.proxy + this.url, function(data) {
            console.log(data);
        }).done(function() {
            console.log("done");
        }).fail(function() {
            console.log("fail");
            console.log(arguments);
        });
    },

    getChannels: function () {
        console.log("getChannels: not implemented yet");
    },

    getChannelInfo: function () {
        console.log("getChannelInfo not implemented yet");
    }
};

TWITCHY.Main.hello();
TWITCHY.Main.listStreams();

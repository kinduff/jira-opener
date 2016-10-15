(function() {
  // Look ma, I can jQuery!
  var $ = function(e) { return document.querySelector(e); }


  // Elements
  var $textarea = $('#text');
  var $result = $('#result');
  var $issueList = $('#issue-list');
  var $issueCount = $('#issue-count');
  var $urlPrefix = $('#url-prefix');


  // IT BEGINS!
  var JiraOpener = function(urlPrefix) {
    var _this = this;

    // Properties
    _this.issues = [];
    _this.issueCount = 0;

    // Options
    _this.urlPrefix = '';

    _this.setOptions();

    // Setup JIRA box
    $textarea.addEventListener('keyup', _this.startJIRAThing.bind(this));
    $textarea.addEventListener('keydown', _this.startJIRAThing.bind(this));
    $urlPrefix.addEventListener('keyup', _this.updateOptions.bind(this));
    document.addEventListener('keydown', function(e) {
      if (e && ((e.ctrlKey || e.metaKey) && e.keyCode == 13)) {
        e.preventDefault();
        _this.openThemAll();
      }
    });

    _this.startJIRAThing();
  }

  //
  // Public methods
  //

  JiraOpener.prototype = {
    // Naming functions like a boss
    startJIRAThing: function(e) {
      this.issues = findAndParseIssues($textarea.textContent);

      this.issues = this.issues.filter(function(val, i, self) {
        return self.indexOf(val) === i;
      });

      this.updateIssueData();

      if (this.issues.length < 1) {
        return;
      }
    },

    // Pokemon
    openThemAll: function() {
      if (!this.urlPrefix) {
        return;
      }

      var issues = this.issues;
      for (var i = 0; i < issues.length; i++) {
        var issue = issues[i];
        window.open(this.urlPrefix + '/' + issue);
      }
    },

    // React for the poors
    updateIssueData: function() {
      this.updateIssueCount();
      this.updateIssueList();
    },

    updateIssueCount: function(num) {
      $issueCount.innerHTML = this.issues.length;
    },

    updateIssueList: function() {
      var colors = ["#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
      var curColorInt = 0;
      var curColor = colors[curColorInt];
      var issues = this.issues;
      $issueList.innerHTML = '';

      var replaceObj = new Object();
      $result.innerHTML = $textarea.innerHTML;

      for (var i = 0; i < issues.length; i++) {
        var li = document.createElement('li');

        if (this.urlPrefix) {
          var cur = issues[i];

          var a = document.createElement('a');
          var url = this.urlPrefix + '/' + cur;

          li.style.backgroundColor = curColor;

          // Compares current with next one in order
          // to separate the sorted array of issues
          var next = issues[i + 1];
          if (next) {
            var curPrefix = cur.split('-')[0];
            var nextPrefix = next.split('-')[0];

            if (curPrefix != nextPrefix) {
              li.className = "spacer";
              curColor = colors[curColorInt + 1];
              curColorInt = (curColorInt + 1) % (colors.length - 1);
            }
          }

          a.href = url;
          a.target = 'blank';
          a.appendChild(document.createTextNode(issues[i]));

          li.appendChild(a);

          // Converts content with links
          replaceObj[cur] = '<a href="'+ url +'" target="blank">' + cur + '</a>';
        } else {
          li.appendChild(document.createTextNode(issues[i]));
        }

        $issueList.appendChild(li);
      }
      var replaceObjKeys = Object.keys(replaceObj);
      if (replaceObjKeys.length > 0) {
        var re = new RegExp(replaceObjKeys.join("|"),"gi");
        $result.innerHTML = $result.innerHTML.replace(re, function(matched){
          return replaceObj[matched];
        });
      }
    },

    updateOptions: function() {
      // urlPrefix
      var url = $urlPrefix.value;
      localStorage.urlPrefix = url;
      this.urlPrefix = url;
      updateQueryStringParam('urlPrefix', url);
    },

    setOptions: function() {
      // urlPrefix
      var url = getParameterByName('urlPrefix') || localStorage.urlPrefix || '';
      this.urlPrefix = url;
      $urlPrefix.value = url;
      updateQueryStringParam('urlPrefix', url);
    }
  };

  //
  // Private methods
  //

  // Like a car
  function reverse(s) {
    return s.split('').reverse().join('');
  }

  function findAndParseIssues(text) {
    var _jira_ = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
    var matches = reverse(text).match(_jira_);
    var result = [];

    if (!matches || matches.length < 1) {
      return result;
    }

    for (var i = 0; i < matches.length; i++) {
      result[i] = reverse(matches[i]);
    }
    return result.reverse().sort();
  }

  // Grabbed from http://stackoverflow.com/a/901144
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // Grabbed from https://gist.github.com/excalq/2961415
  function updateQueryStringParam(key, value) {
    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        keyRegex = new RegExp('([\?&])' + key + '[^&]*');

        // If param exists already, update it
        if (urlQueryString.match(keyRegex) !== null) {
            params = urlQueryString.replace(keyRegex, "$1" + newParam);
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }
    window.history.replaceState({}, "", baseUrl + params);
  }

  // On init...
  var Jira = new JiraOpener();
})();
// This comment represents the end of the script

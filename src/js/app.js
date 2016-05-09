(function() {
  // Look ma, I can jQuery!
  var $ = function(e) { return document.querySelector(e); }


  // Elements
  var $textarea = $('#text');
  var $issueList = $('#issue-list');
  var $issueCount = $('#issue-count');
  var $urlPrefix = $('#url-prefix');
  var $filterUnique = $('#filter-unique');


  // IT BEGINS!
  var JiraOpener = function(urlPrefix) {
    // Properties
    this.issues = [];
    this.issueCount = 0;

    // Options
    this.urlPrefix = '';
    this.filterUnique = true;

    this.setOptions();

    // Setup JIRA box
    $textarea.addEventListener('keyup', this.startJIRAThing.bind(this));
    $textarea.addEventListener('keydown', this.startJIRAThing.bind(this));
    $urlPrefix.addEventListener('keyup', this.updateOptions.bind(this));
    $filterUnique.addEventListener('change', this.updateOptions.bind(this));
  }

  //
  // Public methods
  //

  JiraOpener.prototype = {
    // Naming functions like a boss
    startJIRAThing: function(e) {
      this.issues = findAndParseIssues($textarea.value);

      if (this.filterUnique) {
        this.issues = this.issues.filter(function(val, i, self) {
          return self.indexOf(val) === i;
        });
      }

      this.updateIssueData();

      if (this.issues.length < 1) {
        return;
      }

      // Apple should pay us for this support
      if (e && ((e.ctrlKey || e.metaKey) && e.keyCode == 13)) {
        e.preventDefault();
        this.openThemAll();
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
        window.open(this.urlPrefix + issue);
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
      var issues = this.issues;
      $issueList.innerHTML = '';

      for (var i = 0; i < issues.length; i++) {
        var li = document.createElement('li');

        if (this.urlPrefix) {
          var a = document.createElement('a');
          a.href = this.urlPrefix + issues[i];
          a.target = 'blank';
          a.appendChild(document.createTextNode(issues[i]));
          li.appendChild(a);
        } else {
          li.appendChild(document.createTextNode(issues[i]));
        }

        $issueList.appendChild(li);
      }
    },

    updateOptions: function() {
      // urlPrefix
      var url = $urlPrefix.value;
      localStorage.urlPrefix = url;
      this.urlPrefix = url;
      updateQueryStringParam('urlPrefix', url);

      // filterUnique
      var unique = $filterUnique.checked;
      localStorage.filterUnique = unique;
      this.filterUnique = unique;
      updateQueryStringParam('filterUnique', unique);

      this.startJIRAThing();
    },

    setOptions: function() {
      // urlPrefix
      var url = getParameterByName('urlPrefix') || localStorage.urlPrefix || '';
      this.urlPrefix = url;
      $urlPrefix.value = url;
      updateQueryStringParam('urlPrefix', url);

      // filterUnique
      var unique = getParameterByName('filterUnique') == null ? localStorage.filterUnique : getParameterByName('filterUnique');
      unique = !(unique === 'false'); // true is default
      this.filterUnique = unique;
      $filterUnique.checked = unique;
      updateQueryStringParam('filterUnique', unique);
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
    return result.reverse();
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
  };

  // On init...
  var Jira = new JiraOpener();
})();
// This comment represents the end of the script

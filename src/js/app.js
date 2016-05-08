(function() {
  // Look ma, I can jQuery!
  var $ = function(e) { return document.querySelector(e); }


  // Elements
  var $textarea = $('#text');
  var $issueList = $('#issue-list');
  var $issueCount = $('#issue-count');
  var $urlPrefix = $('#url-prefix');


  // IT BEGINS!
  var JiraOpener = function(urlPrefix) {
    // Properties
    this.issues = [];
    this.issueCount = 0;
    this.urlPrefix = urlPrefix || '';

    // Configure
    this.setOptions();
    this.updateFieldOptions();

    // Setup JIRA box
    $textarea.addEventListener('keyup', this.startJIRAThing.bind(this));
    $textarea.addEventListener('keydown', this.startJIRAThing.bind(this));
    $urlPrefix.addEventListener('keyup', this.updateOptions.bind(this));
  }

  //
  // Public methods
  //

  JiraOpener.prototype = {
    // Naming functions like a boss
    startJIRAThing: function(e) {
      var issues = findAndParseIssues($textarea.value);
      this.issues = issues.filter(function(val, i, self) {
        return self.indexOf(val) === i;
      });
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
      var urlPrefix = $urlPrefix.value;
      localStorage.urlPrefix = urlPrefix;
      this.setOptions();
      this.startJIRAThing();
    },

    setOptions: function() {
      this.urlPrefix = localStorage.urlPrefix || null;
    },

    updateFieldOptions: function() {
      $urlPrefix.value = this.urlPrefix;
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

  // On init...
  var Jira = new JiraOpener();
  Jira.startJIRAThing();
})();
// This comment represents the end of the script

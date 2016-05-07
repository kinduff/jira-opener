(function() {
  // Look ma, I can jQuery!
  var $ = function(e) { return document.querySelector(e); }

  // IT BEGINS!
  var $textarea = $('#text');
  var $issueList = $('#issue-list');
  var $issueCount = $('#issue-count');

  // Like a car
  function reverse(s) {
    return s.split('').reverse().join('');
  }

  // I stole this from stackoverflow
  function findAndParse(e) {
    var _jira_ = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
    var matches = reverse($textarea.value).match(_jira_);
    var result = [];

    if (!matches || matches.length < 1) {
      return result;
    }

    for (var i = 0; i < matches.length; i++) {
      result[i] = reverse(matches[i]);
    }
    return result.reverse();
  }

  // Naming functions like a boss
  function startJIRAThing(e) {
    var matches = findAndParse(e);
    updateIssueData(matches);

    if (matches.length < 1) {
      return;
    }

    // Apple should pay us for this support
    if (((e.ctrlKey || e.metaKey) && e.keyCode == 13)) {
      e.preventDefault();
      var urlPrefix = $('#url-prefix').value;
      for (var i = 0; i < matches.length; i++) {
        var issue = matches[i];
        window.open(urlPrefix + issue);
      }
    }
  }

  function updateIssueData(matches) {
    updateIssueCount(matches.length);
    updateIssueList(matches);
  }

  // React for the poors
  function updateIssueCount(num) {
    $issueCount.innerHTML = num;
  }

  function updateIssueList(issues) {
    var urlPrefix = $('#url-prefix').value;
    $issueList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = urlPrefix + issues[i];
      a.target = 'blank';
      a.appendChild(document.createTextNode(issues[i]));
      li.appendChild(a);
      $issueList.appendChild(li);
    }
  }

  // Setup JIRA box
  $textarea.addEventListener('keyup', startJIRAThing);
  $textarea.addEventListener('keydown', startJIRAThing);
  startJIRAThing();
})();
// This comment represents the end of the script

(function(){var e=function(e){return document.querySelector(e)};var t=e("#text");var n=e("#result");var r=e("#issue-list");var i=e("#issue-count");var a=e("#url-prefix");var s=function(e){var n=this;n.issues=[];n.issueCount=0;n.urlPrefix="";n.setOptions();t.addEventListener("keyup",n.startJIRAThing.bind(this));t.addEventListener("keydown",n.startJIRAThing.bind(this));a.addEventListener("keyup",n.updateOptions.bind(this));document.addEventListener("keydown",function(e){if(e&&((e.ctrlKey||e.metaKey)&&e.keyCode==13)){e.preventDefault();n.openThemAll()}});n.startJIRAThing()};s.prototype={startJIRAThing:function(e){this.issues=o(t.textContent);this.issues=this.issues.filter(function(e,t,n){return n.indexOf(e)===t});this.updateIssueData();if(this.issues.length<1){return}},openThemAll:function(){if(!this.urlPrefix){return}var e=this.issues;for(var t=0;t<e.length;t++){var n=e[t];window.open(this.urlPrefix+"/"+n)}},updateIssueData:function(){this.updateIssueCount();this.updateIssueList()},updateIssueCount:function(e){i.innerHTML=this.issues.length},updateIssueList:function(){var e=["#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#d35400","#c0392b","#bdc3c7","#7f8c8d"];var i=0;var a=e[i];var s=this.issues;r.innerHTML="";var u=new Object;n.innerHTML=t.innerHTML;for(var o=0;o<s.length;o++){var l=document.createElement("li");if(this.urlPrefix){var c=s[o];var f=document.createElement("a");var d=this.urlPrefix+"/"+c;l.style.backgroundColor=a;var h=s[o+1];if(h){var p=c.split("-")[0];var v=h.split("-")[0];if(p!=v){l.className="spacer";a=e[i+1];i=(i+1)%e.length}}f.href=d;f.target="blank";f.appendChild(document.createTextNode(s[o]));l.appendChild(f);u[c]='<a href="'+d+'" target="blank">'+c+"</a>"}else{l.appendChild(document.createTextNode(s[o]))}r.appendChild(l)}var g=Object.keys(u);if(g.length>0){var x=new RegExp(g.join("|"),"gi");n.innerHTML=n.innerHTML.replace(x,function(e){return u[e]})}},updateOptions:function(){var e=a.value;localStorage.urlPrefix=e;this.urlPrefix=e;c("urlPrefix",e)},setOptions:function(){var e=l("urlPrefix")||localStorage.urlPrefix||"";this.urlPrefix=e;a.value=e;c("urlPrefix",e)}};function u(e){return e.split("").reverse().join("")}function o(e){var t=/\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;var n=u(e).match(t);var r=[];if(!n||n.length<1){return r}for(var i=0;i<n.length;i++){r[i]=u(n[i])}return r.reverse().sort()}function l(e,t){if(!t)t=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)"),r=n.exec(t);if(!r)return null;if(!r[2])return"";return decodeURIComponent(r[2].replace(/\+/g," "))}function c(e,t){var n=[location.protocol,"//",location.host,location.pathname].join(""),r=document.location.search,i=e+"="+t,a="?"+i;if(r){keyRegex=new RegExp("([?&])"+e+"[^&]*");if(r.match(keyRegex)!==null){a=r.replace(keyRegex,"$1"+i)}else{a=r+"&"+i}}window.history.replaceState({},"",n+a)}var f=new s})();
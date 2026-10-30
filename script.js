document.addEventListener('DOMContentLoaded', function() {
  function closest (element, selector) {
    if (Element.prototype.closest) {
      return element.closest(selector);
    }
    do {
      if (Element.prototype.matches && element.matches(selector)
        || Element.prototype.msMatchesSelector && element.msMatchesSelector(selector)
        || Element.prototype.webkitMatchesSelector && element.webkitMatchesSelector(selector)) {
        return element;
      }
      element = element.parentElement || element.parentNode;
    } while (element !== null && element.nodeType === 1);
    return null;
  }
  var currentLocation = window.location.href;
  console.log("currentLocation:", currentLocation);
  if(currentLocation == 'https://success.stellarcyber.ai/hc/en-us'){
    jQuery('body').addClass("absolute");
  }
console.log("Testing")
  Array.prototype.forEach.call(document.querySelectorAll('.share a'), function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(this.href, '', 'height = 500, width = 500');
    });
  });

  var commentContainerTextarea = document.querySelector('.comment-container textarea'),
    commentContainerFormControls = document.querySelector('.comment-form-controls, .comment-ccs');

  if (commentContainerTextarea) {
    commentContainerTextarea.addEventListener('focus', function focusCommentContainerTextarea() {
      commentContainerFormControls.style.display = 'block';
      commentContainerTextarea.removeEventListener('focus', focusCommentContainerTextarea);
    });

    if (commentContainerTextarea.value !== '') {
      commentContainerFormControls.style.display = 'block';
    }
  }

  $.get("/auth/v2/login/signin?return_to=%2Fhc%2Fen-us&theme=hc&locale=en-us&brand_id=360000604032&auth_origin=360000604032%2Cfalse%2Ctrue", function(data, status){
    var iframeHTML = data;
    var loginHTML = jQuery(iframeHTML).find(".services.internal").html();
    if(loginHTML){
    	jQuery("#loginForm").html(loginHTML);
    	jQuery("#return_to").val("/hc/en-us");
    }
  });

$.get("/api/v2/users/me.json", function(currentUser, status){
    jQuery(currentUser.user.tags).each(function(index, tag){
        if(tag == "supportmember"){
            jQuery('.blocks-item:nth-child(1)').hide();
        }
    });
});

  $('.toggle-nav-menu').click(function(){
      $(".tab-nav-menu").toggle();
      $(".burg").toggleClass("activeBurg");
      $("#tab-navigation").toggle();
  });

  var showRequestCommentContainerTrigger = document.querySelector('.request-container .comment-container .comment-show-container'),
    requestCommentFields = document.querySelectorAll('.request-container .comment-container .comment-fields'),
    requestCommentSubmit = document.querySelector('.request-container .comment-container .request-submit-comment');

  if (showRequestCommentContainerTrigger) {
    showRequestCommentContainerTrigger.addEventListener('click', function() {
      showRequestCommentContainerTrigger.style.display = 'none';
      Array.prototype.forEach.call(requestCommentFields, function(e) { e.style.display = 'block'; });
      requestCommentSubmit.style.display = 'inline-block';
      if (commentContainerTextarea) {
        commentContainerTextarea.focus();
      }
    });
  }

  var requestMarkAsSolvedButton = document.querySelector('.request-container .mark-as-solved:not([data-disabled])'),
    requestMarkAsSolvedCheckbox = document.querySelector('.request-container .comment-container input[type=checkbox]'),
    requestCommentSubmitButton = document.querySelector('.request-container .comment-container input[type=submit]');

  if (requestMarkAsSolvedButton) {
    requestMarkAsSolvedButton.addEventListener('click', function () {
      requestMarkAsSolvedCheckbox.setAttribute('checked', true);
      requestCommentSubmitButton.disabled = true;
      this.setAttribute('data-disabled', true);
      closest(this, 'form').submit();
    });
  }

  var requestCommentTextarea = document.querySelector('.request-container .comment-container textarea');

  if (requestCommentTextarea) {
    requestCommentTextarea.addEventListener('input', function() {
      if (requestCommentTextarea.value === '') {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-translation');
        }
        requestCommentSubmitButton.disabled = true;
      } else {
        if (requestMarkAsSolvedButton) {
          requestMarkAsSolvedButton.innerText = requestMarkAsSolvedButton.getAttribute('data-solve-and-submit-translation');
        }
        requestCommentSubmitButton.disabled = false;
      }
    });
  }

  if (requestCommentTextarea && requestCommentTextarea.value === '') {
    requestCommentSubmitButton.disabled = true;
  }

  Array.prototype.forEach.call(document.querySelectorAll('#request-status-select, #request-organization-select'), function(el) {
    el.addEventListener('change', function(e) {
      e.stopPropagation();
      closest(this, 'form').submit();
    });
  });

  function toggleNavigation(toggleElement) {
    var menu = document.getElementById('user-nav');
    var isExpanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', !isExpanded);
    toggleElement.setAttribute('aria-expanded', !isExpanded);
  }

  var requestOrganisationSelect = document.querySelector('#request-organization select');

  if (requestOrganisationSelect) {
    requestOrganisationSelect.addEventListener('change', function() {
      closest(this, 'form').submit();
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.collapsible-nav, .collapsible-sidebar'), function(el) {
    el.addEventListener('click', function(e) {
      e.stopPropagation();
      var isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
    });
  });

  const seeAllTrigger = document.querySelector("#see-all-sections-trigger");
  const subsectionsList = document.querySelector(".section-list");

  if (subsectionsList && subsectionsList.children.length > 6) {
    seeAllTrigger.setAttribute("aria-hidden", false);

    seeAllTrigger.addEventListener("click", function(e) {
      subsectionsList.classList.remove("section-list--collapsed");
      seeAllTrigger.parentNode.removeChild(seeAllTrigger);
    });
  }
});

$(function(){
  $('.search_button').click(function(){
    $(this).prev().submit();
  });
  $('.orange_bar_notification').slideDown();
  $('.notification_close_button a').click(function(){
    $('.orange_bar_notification').slideUp();
  });
});

function scGetSearchBoxValue() {
  var el =
    document.querySelector('.search_box input[type="search"]') ||
    document.querySelector('.search_box input[name="query"]') ||
    document.querySelector('.search-full input') ||
    document.querySelector('.search_box input');
  return el ? el.value.trim() : '';
}

var SC_ROUTING_FIELD_ID = '45728853515405';
var SC_ROUTING_VALUE = 'triage';

// Note: the "Search Query" conversation field created in Admin Center
// (Objects and rules → Tickets → Fields) is no longer used by this file —
// Triage's procedure only ever checks the customer's typed message, not
// conversation fields, so the query is sent as a real message instead (see
// scRunSearchPageAI below). The field itself can be left in place unused,
// or deleted later if it's not useful for anything else.

function scOpenTriageAgentImpl() {
  var text = scGetSearchBoxValue();

  function startConversation() {
    if (!text) {
      try { zE('messenger', 'open'); } catch(e) {}
      return;
    }
    try {
      zE('messenger:ui', 'newConversation', {
        message: {
          content: { type: 'text', text: text }
        }
      }, function(error) {
        if (error) {
          console.error('scOpenTriageAgent: newConversation failed', error.reason, error.message);
          try { zE('messenger', 'open'); } catch(e) {}
        }
      });
    } catch(e) {
      try { zE('messenger', 'open'); } catch(e2) {}
    }
  }

  try {
    zE('messenger:set', 'conversationFields', [
      { id: SC_ROUTING_FIELD_ID, value: SC_ROUTING_VALUE }
    ], startConversation);
  } catch(e) {
    startConversation();
  }
}

function scOpenTriageAgent() {
  if (typeof zE === 'undefined') {
    var tries = 0;
    var poll = setInterval(function() {
      tries++;
      if (typeof zE !== 'undefined') {
        clearInterval(poll);
        scOpenTriageAgentImpl();
      } else if (tries > 20) {
        clearInterval(poll);
        console.error('scOpenTriageAgent: zE never became available');
      }
    }, 250);
    return;
  }
  scOpenTriageAgentImpl();
}

function scGoToAskAI() {
  var text = scGetSearchBoxValue();
  var url = '/hc/en-us/p/ask-ai';
  if (text) {
    url += '?ai_message=' + encodeURIComponent(text);
  }
  window.location.href = url;
}

// ===== Search page embedded AI panel =====
//
// Confirmed via the Triage procedure's actual build (2026-09-11): every
// step and Check condition in it evaluates the customer's typed MESSAGE —
// there is no step type that reacts to a Conversation Field instead. So the
// query must be sent as a real message for the procedure to do anything
// useful with it. To avoid the query looking like a stray, out-of-context
// word (e.g. bare "connector"), it's wrapped into a natural sentence before
// being sent — this also means it flows correctly into the procedure's
// first real Check condition (e.g. "I need help with a new connector or
// integration request") instead of being invisible to it.
//
// Each search starts its own fresh conversation (no persistence across
// searches) — simplest, most predictable behavior, and avoids any
// accumulating-thread complexity.
function scRunSearchPageAI(targetElementId, query) {
  function whenReady(cb) {
    if (typeof zE === 'undefined') { setTimeout(function(){ whenReady(cb); }, 250); return; }
    cb();
  }

  whenReady(function () {
    zE('messenger:set', 'conversationFields', [
      { id: SC_ROUTING_FIELD_ID, value: SC_ROUTING_VALUE }
    ], function () {
      try {
        zE('messenger:set', 'customization', {
          common: { stylingPreset: 'minimalistic', hideHeader: true }
        });
      } catch (e) {}

      zE('messenger', 'render', {
        mode: 'embedded',
        widget: { targetElement: '#' + targetElementId }
      }, function (error) {
        if (error) { console.error('scRunSearchPageAI: render failed', error.reason); return; }
        try { zE('messenger', 'useSessionAuth'); } catch (e) {}

        if (!query) return;

        var messageText = "I'm looking for information about " + query;

        setTimeout(function () {
          zE('messenger:ui', 'newConversation', {
            message: { content: { type: 'text', text: messageText } }
          }, function (err) {
            if (err) console.error('scRunSearchPageAI: newConversation failed', err.reason);
          });
        }, 800);
      });
    });
  });
}

function scToggleAIPanelSize(containerId, expandedClass) {
  var el = document.getElementById(containerId);
  if (el) el.classList.toggle(expandedClass);
}
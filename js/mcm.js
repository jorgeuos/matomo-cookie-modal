/**
 * Javascript for a simple Cookie modal.
 * I've tried to follow Material design guidelines for buttons and interactions.
 * But I'm sure there is a lot that can be improved, such as contrast between font-color and background.
 * I have no plans of changing styling for now. It's good enough for me.
 * @license MIT 
 * Check License file
 */


/**
 * Check if Doc is ready.
 */
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

/**
 * Add a Cookie consent modal
 */
docReady(function() {
  var _paq = window._paq = window._paq || [];
  var cookies = document.cookie;
  var consent = (cookies.match(/^(?:.*;)?\s*mcm_consent_given\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
  if (consent === null) {
    // No consent given
    // Build our modal

    /**
     * Our config.
     */
    const mcm = {
      cookieText: "We use Integrity safe Matomo to analyze our web usage. No data is shared with third party. ",
      readMore: "Read more.",
      privacyPolicy: "Privacy policy",
      privacyLink: "https://mcm.example/privacy-policy/",
      iAcceptCheckbox: "I accept.",
      acceptToProceed: " You need to accept to proceed.", // Prepend with space to avoid squeezing.
      declinedMessage: "Ok. We won't track your visit. Welcome back!",
      acceptButtonText: "I understand!",
      declineButtonText: "No, thanks.",
    };



    /**
     * Wrapper
     */
    const wrapper_blur = document.createElement("div");
    wrapper_blur.id = ["cookie-consent-blur"];
    wrapper_blur.className = "cookie-blur";

    const wrapper = document.createElement("div");
    wrapper.id = ["cookie-consent-wrapping"];
    wrapper.className = "cookie-wrapping";

    const modal_div = document.createElement("div");
    modal_div.id = "cookie-consent-modal";
    modal_div.className = "cookie-consent-modal";

    /**
     * Paragraph
     */
    const modal_paragraph = document.createElement("p");
    modal_paragraph.id = "cookie-consent-paragraph";
    modal_paragraph.className = "cookie-text";
    
    const modal_cookie_text = document.createTextNode(mcm.cookieText);
    modal_paragraph.appendChild(modal_cookie_text);
    
    const modal_policy_link = document.createElement("a");
    const modal_policy_link_text = document.createTextNode(mcm.readMore);
    modal_policy_link.title = mcm.privacyPolicy;
    modal_policy_link.href = mcm.privacyLink;
    modal_policy_link.appendChild(modal_policy_link_text);
    modal_paragraph.appendChild(modal_policy_link);

    modal_div.appendChild(modal_paragraph);
    
    /**
     * Action
     */
    const modal_action_p = document.createElement("p");
    modal_action_p.id = "cookie-consent-paragraph";
    modal_action_p.className = "accept-checkbox-p";

    const modal_action_checkbox = document.createElement("input");
    modal_action_checkbox.type = "checkbox";
    modal_action_checkbox.id = "cookie-consent-checkbox";
    modal_action_checkbox.className = "accept-checkbox";
    const modal_action_label = document.createElement("label");
    modal_action_label.id = "cookie-consent-checkbox-label";
    modal_action_label.htmlFor = "cookie-consent-checkbox";
    modal_action_label.className = "accept-checkbox-label";
    const modal_action_label_text = document.createTextNode(mcm.iAcceptCheckbox);
    modal_action_p.appendChild(modal_action_checkbox);
    modal_action_label.appendChild(modal_action_label_text);
    modal_action_p.appendChild(modal_action_label);
    modal_div.appendChild(modal_action_p);
    
    /**
     * Messages
     */
    const modal_action_message_span = document.createElement("span");
    modal_action_message_span.className = "not-accepted";
    const modal_action_message = document.createTextNode(mcm.acceptToProceed);
    modal_action_message_span.appendChild(modal_action_message);

    const modal_declined_message_p = document.createElement("p");
    modal_declined_message_p.className = "not-accepted";
    const modal_declined_message = document.createTextNode(mcm.declinedMessage);
    modal_declined_message_p.appendChild(modal_declined_message);

    /**
     * Buttons
     */
    const modal_accept_button = document.createElement("button");
    modal_accept_button.id = "cookie-accept";
    modal_accept_button.className = "mtmo-cookie-button";
    const accept_text = document.createTextNode(mcm.acceptButtonText);
    modal_accept_button.appendChild(accept_text);
    modal_div.appendChild(modal_accept_button);
    
    const modal_decline_button = document.createElement("button");
    modal_decline_button.id = "cookie-decline";
    modal_decline_button.className = "mtmo-cookie-button";
    const decline_text = document.createTextNode(mcm.declineButtonText);
    modal_decline_button.appendChild(decline_text);
    modal_div.appendChild(modal_decline_button);

    const modal_close_button = document.createElement("button");
    modal_close_button.id = "modal-close-icon";
    modal_close_button.className = "mtmo-close-icon";
    modal_div.appendChild(modal_close_button);
    
    /**
     * Grouping Functions here:
     */
     modal_action_checkbox.addEventListener("change", function(e){
      // Remove declined message if they decide to stay.
      if (modal_div.contains(modal_declined_message_p)===true){
        modal_div.removeChild(modal_declined_message_p);
      }
      // Remove accept message if they behave.
      if (modal_action_p.contains(modal_action_message_span)===true){
        modal_action_p.removeChild(modal_action_message_span);
      }
    });

    const acceptFunction = function(e){

      // Remove declined message if they decide to stay.
      if (modal_div.contains(modal_declined_message_p)===true){
        modal_div.removeChild(modal_declined_message_p);
      }

      if (modal_action_checkbox.checked===false){
        modal_action_p.appendChild(modal_action_message_span);
        return;
      }
      _paq.push(["forgetUserOptOut"]);
      
      // We use our own cookie in case Matomo is down
      const d = new Date();
      d.setTime(d.getTime() + (365*24*60*60*1000));
      let expires = "expires=" + d.toGMTString();
      document.cookie = "mcm_consent_given=true;" + expires + ";path=/";

      _paq.push(['rememberCookieConsentGiven']);
      _paq.push(['setCookieConsentGiven']);
      _paq.push(['trackPageView']);
      console.log('Setting cookie!');
      wrapper.remove();
      e.preventDefault();
    }

    modal_accept_button.addEventListener( 'click', acceptFunction );
    modal_close_button.addEventListener( 'click', acceptFunction );


    /**
     * Decline button function.
     */
    modal_decline_button.addEventListener('click', (function(e){
      // remove cookies if we have any
      document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
      // revoke tracking consent
      _paq.push(['forgetConsentGiven']);
      _paq.push(['optUserOut']);

      // Perhaps we just can show a message saying, Naaw or something.
      // history.back();

      if (modal_div.contains(modal_declined_message_p)===true){
        modal_div.removeChild(modal_declined_message_p);
      }
      else {
        modal_div.appendChild(modal_declined_message_p);
      }
      e.preventDefault();
    }));
    
    // Add everything to the div
    wrapper.appendChild(modal_div);
    // Let's not blur for now.
    // document.getElementsByTagName('body')[0].appendChild(wrapper_blur);
    document.getElementsByTagName('body')[0].appendChild(wrapper);
  }
  else {
    // Just for Readability, for now.
    // console.log("Consent already given");
    _paq.push(['rememberCookieConsentGiven']);
    _paq.push(['setCookieConsentGiven']);
    _paq.push(['trackPageView']);
  }
});

if(typeof Notify === 'undefined'){
  Notify = {};
}

Notify.setError = function(msg, options) {
  return Notify.render(msg, 'danger', options);
};

Notify.setSuccess = function(msg, options) {
  return Notify.render(msg, 'success', options);
};

Notify.setWarning = function(msg, options) {
  return Notify.render(msg, 'warning', options);
};

Notify.render = function(msg, type, options) {
  var timeoutId;
  if (options && options.sticky) {
    return this.renderSticky(msg, type, options);
  } else {
    if (Session.get('currentTimeout')) {
      Meteor.clearTimeout(Session.get('currentTimeout'));
    }
    $('#notification-top').remove();
    $('body').append(new Handlebars.SafeString(Template['notificationTop']({
      message: msg,
      type: type
    })).string);
    $('#notification-top').fadeIn();
    timeoutId = Meteor.setTimeout(function() {
      return $('#notification-top').fadeOut(500, function() {
        return $('#notification-top').remove();
      });
    }, 3000);
    return Session.set('currentTimeout', timeoutId);
  }
};

Notify.renderSticky = function(msg, type, options) {
  $('body').append(new Handlebars.SafeString(Template['notificationTop']({
    message: msg,
    type: type,
    html: options.html,
    sticky: options.sticky
  })).string);
  return $('#notification-top').alert();
};


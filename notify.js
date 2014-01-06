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
    Session.set('notify', {msg: msg, type: type});
    timeoutId = Meteor.setTimeout(function() {
      return $('#notification-top').fadeOut(500, function() {
        Session.set('notify', null);
      });
    }, 3000);
    return Session.set('currentTimeout', timeoutId);
  }
};

Notify.renderSticky = function(msg, type, options) {
  Session.set('notify', {msg: msg, type: type, options: options});
  return $('#notification-top').alert();
};

Handlebars.registerHelper('errorMessageTop', function(){
    if(Session.get('notify'))
      return true;
    return false;
  }
);

Template.notificationTop.helpers({
  type: function(){
    notify = Session.get('notify');
    if(notify)
      return notify.type;
    return '';
  },
  message: function(){
    notify = Session.get('notify');
    if(notify)
      return notify.msg;
    return '';
  },
  sticky: function(){
    notify = Session.get('notify');
    if(notify && notify.options)
      return notify.options.sticky;
    return false;
  }
});
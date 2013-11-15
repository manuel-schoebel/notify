Package.describe({
  summary: "Meteor notifications"
});

Package.on_use(function(api){

  api.use('jquery', 'client');
  api.use(['templating'], 'client');

  if (typeof api.export !== 'undefined'){
    api.export('Notify');
  }

  api.add_files("notify.html", "client");
  api.add_files("notify.js", "client");

});
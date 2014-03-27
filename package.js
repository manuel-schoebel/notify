Package.describe({
  summary: "Meteor notifications"
});

Package.on_use(function(api){
  
  api.use(['templating', 'jquery', 'ui'], 'client');

  if (typeof api.export !== 'undefined'){
    api.export('Notify');
  }

  api.add_files("notify.html", "client");
  api.add_files("notify.js", "client");

});
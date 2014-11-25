window.Assisster = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (options) {
    new Assisster.Routers.AppRouter({
      $rootEl: options.$rootEl
    });
    Backbone.history.start();
  }
}
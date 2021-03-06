window.Assisster = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (options) {
		window.Doctor = {
			id: options.doctor_id,
			country_code: "34"
		};
		if (options.page === "doctor") {
	    new Assisster.Routers.DoctorRouter({
	      $rootEl: options.$rootEl
	    });			
		} else {
	    new Assisster.Routers.PatientRouter({
	      $rootEl: options.$rootEl
	    });
		}

    Backbone.history.start();
  }
}


// AppAcademy Composite View extension!!
// Added: onRender, resetSubviews, attachPrependSubview, attachPrependSubviews
Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview);
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.render().$el);
    // Bind events in case `subview` has previously been removed from
    // DOM.
    subview.delegateEvents();
  },

  attachSubviews: function () {
    // I decided I didn't want a function that renders ALL the
    // subviews together. Instead, I think:
    //
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    //
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },
	
  attachPrependSubview: function (selector, subview) {
    this.$(selector).prepend(subview.render().$el);
    subview.delegateEvents();
  },

  attachPrependSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachPrependSubview(selector, subview);
      });
    });
  },
  
  onRender: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        subview.onRender();
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },
	
	resetSubviews: function () {
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
				subview.remove();
			});
    });
		this._subviews = {};
	},

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
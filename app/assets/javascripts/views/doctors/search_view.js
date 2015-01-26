Assisster.Views.SearchView = Backbone.View.extend({
	template: JST["doctors/search"],
	className: "col-xs-12 search-container",
	
	events: {
		"keyup #email-search": "emailSearch",
		"keyup #fname-search": "fnameSearch",
		"keyup #lname-search": "lnameSearch"
	},
	
	initialize: function (options) {
		this.results = [];
		this.email = "";
		this.fname = "";
		this.lname = "";
	},
	
	emailSearch: function (event) {
		this.email = $(event.currentTarget).val().toLowerCase();
		
		this.search();
		
		this.render();
		var strLength = this.email.length * 2;

		this.$("#email-search")[0].setSelectionRange(strLength, strLength);
		this.$("#email-search").focus();
	},
	
	fnameSearch: function (event) {
		this.fname = $(event.currentTarget).val().toLowerCase();
		
		this.search();
		
		this.render();
		var strLength = this.fname.length * 2;

		this.$("#fname-search")[0].setSelectionRange(strLength, strLength);
		this.$("#fname-search").focus();
	},
	
	lnameSearch: function (event) {
		this.lname = $(event.currentTarget).val().toLowerCase();
		
		this.search();
		
		this.render();
		var strLength = this.lname.length * 2;

		this.$("#lname-search")[0].setSelectionRange(strLength, strLength);
		this.$("#lname-search").focus();
	},
	
	render: function () {
		var renderedContent = this.template({
			results: this.results,
			email: this.email,
			fname: this.fname,
			lname: this.lname
		});
		this.$el.html(renderedContent);
		
		return this;
	},
	
	search: function () {
		var view = this;
		this.results = this.collection.filter( function (appointment) {
			var match = true;
			if (view.email !== "" && appointment.escape('email').toLowerCase().search(view.email) === -1) {
				return false;
			}
			if (view.fname !== "" && appointment.escape('fname').toLowerCase().search(view.fname) === -1) {
				return false;
			}
			if (view.lname !== "" && appointment.escape('lname').toLowerCase().search(view.lname) === -1) {
				return false;
			}
			return match;
		});
	},
	
})
Assisster.Views.SearchView = Backbone.View.extend({
	template: JST["doctors/search"],
	className: "col-xs-12 search-container",
	
	events: {
		"keyup #email-search": "emailSearch"
	},
	
	initialize: function (options) {
		this.results = [];
		this.email = "";
		this.fname = "";
		this.lname = "";
	},
	
	emailSearch: function (event) {
		var value = $(event.currentTarget).val();
		this.email = value;
		this.results = this.collection.filter( function (appointment) {
			return appointment.escape('email').search(value) !== -1;
		});
		
		this.render();
		var strLength= value.length * 2;

		this.$("#email-search").focus();
		this.$("#email-search")[0].setSelectionRange(strLength, strLength);
		this.$("#email-search").focus();
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
	
})
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
		this.email = $(event.currentTarget).val();
		
		this.search();
		
		this.render();
		var strLength = this.email.length * 2;

		this.$("#email-search")[0].setSelectionRange(strLength, strLength);
		this.$("#email-search").focus();
	},
	
	fnameSearch: function (event) {
		this.fname = $(event.currentTarget).val();
		
		this.search();
		
		this.render();
		var strLength = this.fname.length * 2;

		this.$("#fname-search")[0].setSelectionRange(strLength, strLength);
		this.$("#fname-search").focus();
	},
	
	lnameSearch: function (event) {
		this.lname = $(event.currentTarget).val();
		
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
		this.results = this.collection.filter( function (appointment) {
			return appointment.escape('email').search(this.email) !== -1 && 
						 appointment.escape('fname').search(this.fname) !== -1 &&
						 appointment.escape('lname').search(this.lname) !== -1;
		});
	},
	
})
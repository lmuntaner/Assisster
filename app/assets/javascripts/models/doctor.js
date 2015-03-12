Assisster.Models.Doctor = Backbone.Model.extend({
  url: "/api/doctors",
  
    appointments: function () {
        if (!this._appointments) {
            this._appointments = new Assisster.Collections.Appointments([], { doctor: this });
        }

        return this._appointments;
    },
	
	services: function () {
		if (!this._services) {
			this._services = new Assisster.Collections.Services([], {doctor: this });
		}
		
		return this._services;
	},
  
    parse: function (payload) {
        if (payload.appointments) {
              this.appointments().set(payload.appointments, { parse: true });
              this.appointments().trigger('parseSync');
              delete payload.appointments;
        }
    	
    	if (payload.services) {
    		this.services().set(payload.services, {parse: true});
    		this.services().trigger('parseSync');
    		delete payload.services
    	}

        return payload;
    }
})
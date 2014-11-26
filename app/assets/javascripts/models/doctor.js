Assisster.Models.Doctor = Backbone.Model.extend({
  url: "/api/doctors",
  
  appointments: function () {
    if (!this._appointments) {
      this._appointments = new Assisster.Collections.Appointments([], { doctor: this });
    }
    
    return this._appointments;
  },
  
  parse: function (payload) {
    if (payload.appointments) {
      this.appointments().set(payload.appointments, { parse: true });
      delete payload.appointments;
    }
    
    return payload;
  }
})
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")

tomorrow_appointment = DateTime.tomorrow.noon
day_after_tomorrow_appointment = tomorrow_appointment.tomorrow

first_doctor.appointments.create(title: "Someone who wants happinness",
                           startTime: tomorrow_appointment,
                           endTime: tomorrow_appointment.in(3600))
                           
first_doctor.appointments.create(title: "This one needs love",
                          startTime: tomorrow_appointment.in(7200),
                          endTime: tomorrow_appointment.in(10800))

first_doctor.appointments.create(title: "Go out and work out!",
                           startTime: day_after_tomorrow_appointment,
                           endTime: day_after_tomorrow_appointment.in(3600))

first_doctor.appointments.create(title: "Healthy guy!",
                           startTime: day_after_tomorrow_appointment.in(7200),
                           endTime: day_after_tomorrow_appointment.in(10800))

first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")

now = DateTime.now
#
# tomorrow_appointment = DateTime.tomorrow.noon
# day_after_tomorrow_appointment = tomorrow_appointment.tomorrow
#
# first_doctor.appointments.create(title: "Someone who wants happinness",
#                            startTime: tomorrow_appointment,
#                            endTime: tomorrow_appointment.in(3600))
#
# first_doctor.appointments.create(title: "This one needs love",
#                           startTime: tomorrow_appointment.in(7200),
#                           endTime: tomorrow_appointment.in(10800))
#
# first_doctor.appointments.create(title: "Go out and work out!",
#                            startTime: day_after_tomorrow_appointment,
#                            endTime: day_after_tomorrow_appointment.in(3600))
#
# first_doctor.appointments.create(title: "Healthy guy!",
#                            startTime: day_after_tomorrow_appointment.in(7200),
#                            endTime: day_after_tomorrow_appointment.in(10800))
                           
5.times do |i|
  appointment = now.next_day(i).noon.in(7200 * i);
  first_doctor.appointments.create(title: Faker::Hacker.say_something_smart,
                             email: Faker::Internet.email,
                             fname: Faker::Name.first_name,
                             lname: Faker::Name.last_name,
                             startTime: appointment,
                             endTime: appointment.in(3600))
end
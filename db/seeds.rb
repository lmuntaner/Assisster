
first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")
first_doctor.services.create(title: "Full recovery", duration_min: 60,
                             description: "This is the best service ever")
first_doctor.services.create(title: "Quit wheat", duration_min: 45,
                            description: "Helping to quit the wheat vice")
first_doctor.services.create(title: "Holistic consultation", duration_min: 90,
                             description: "This appointment addresses the patient in an holistic way")
first_doctor.services.create(title: "Gut problems", duration_min: 30,
                            description: "We will focus our efforts on solving you gut problems")

day = DateTime.now.change(hour: 8)
                           
7.times do |i|
  new_day = day.next_day(i)
  next if new_day.saturday? || new_day.sunday?
  4.times do |j|
    appointment = new_day.in(7200 * j);
    first_doctor.appointments.create(title: first_doctor.services.sample.title,
                               email: Faker::Internet.email,
                               fname: Faker::Name.first_name,
                               lname: Faker::Name.last_name,
                               appointment_status: "Approved",
                               startTime: appointment,
                               endTime: appointment.in(3600))
  end
  first_doctor.appointments.create(title: "office hour",
                                   appointment_status: "Approved",
                                   startTime: new_day,
                                   endTime: new_day.in(3600 * 8),
                                   office_hour: true)
end
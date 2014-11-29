
first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")

now = DateTime.now
                           
5.times do |i|
  appointment = now.next_day(i).noon.in(7200 * i);
  first_doctor.appointments.create(title: Faker::Hacker.say_something_smart,
                             email: Faker::Internet.email,
                             fname: Faker::Name.first_name,
                             lname: Faker::Name.last_name,
                             startTime: appointment,
                             endTime: appointment.in(3600))
end
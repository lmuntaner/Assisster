
first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")
first_doctor.services.create(title: "Full recovery", duration_min: 60,
                             description: "This is the best service ever")

now = DateTime.now
zone = ActiveSupport::TimeZone.new("Pacific Time (US & Canada)")
                           
5.times do |i|
  5.times do |j|
    appointment = now.next_day(i).midnight.in(7200 * j);
    first_doctor.appointments.create(title: Faker::Hacker.say_something_smart,
                               email: Faker::Internet.email,
                               fname: Faker::Name.first_name,
                               lname: Faker::Name.last_name,
                               startTime: appointment,
                               endTime: appointment.in(3600))
  end
  
  office_hour = now.next_day(i).midnight
  first_doctor.appointments.create(title: "office hour",
                                   startTime: office_hour,
                                   endTime: office_hour.in(3600 * 8),
                                   office_hour: true)
end
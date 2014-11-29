
first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly")

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
end
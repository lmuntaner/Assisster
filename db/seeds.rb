
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
statuses = ['Approved', 'Pending']
writers = [ %w(John Fante), %w(Charles Bukowski), %w(Truman Capote), %w(Sebastian Horsley),
            %w(Vladimir Nabokov), %w(Bram Stoker), %w(Quentin Crisp), %w(Umberto Eco),
            %w(Kennedy Toole), %w(Shalom Auslander), %w(Irvine Wlesh), %w(Dan Fante),
            %w(GeorgeRR Margin), %w(Ben Brooks), %w(Knut Hamsun), %w(Raul Nunez),
            %w(David-Foster Wallace), %w(Michel Houellebecq), %w(Stewart Home), %w(Alexander Trocchi),
            %w(Jack Kerouac), %w(Hubert Selby), %w(Herbert Huncke), %w(Patxi Irurzun),
            %w(William Burroughs), %w(Victor-Hugo Viscarra), %w(Carson McCullers), %w(Isaac Asimov),
            %w(Bret-Easton Ellis), %w(JK Rowling), %w(Henry Miller)]
                           
14.times do |i|
  new_day = day.next_day(i)
  next if new_day.saturday? || new_day.sunday?
  4.times do |j|
    appointment = new_day.in(7200 * j + 1800);
    patient = writers.sample
    first_doctor.appointments.create(title: first_doctor.services.sample.title,
                               email: Faker::Internet.email,
                               fname: patient.first,
                               lname: patient.last,
                               appointment_status: statuses.sample,
                               startTime: appointment,
                               endTime: appointment.in(3600))
  end
  first_doctor.appointments.create(title: "office hour",
                                   appointment_status: "Approved",
                                   startTime: new_day,
                                   endTime: new_day.in(3600 * 8),
                                   office_hour: true)
end
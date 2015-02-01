
first_doctor = Doctor.create!(email: "william@wheat.com", password:"wheatbelly",
                              country_code:"34", name:"William Davis", domain_name: "randomdoctor.com",
                              subdomain_name:"williamdavis", sub_title: "Autor de <em>'Sin Trigo Gracias'</em>",
                              latitude: 37.7821343, longitude: -122.4006397,
                              street_address: "795 Folsom Ave, Suite 600", city_address: "San Francisco, CA 94107",
                              phone_number: "1234567890",
                              description: "<p>Over 80% of the people I meet today are pre-diabetic or diabetic.
                                            In an effort to reduce blood sugar, I asked patients to remove all
                                            wheat products from their diet based on the simple fact that, with
                                            few exceptions, foods made of wheat flour raise blood sugar higher
                                            than nearly all other foods. Yes, that’s true for even whole grains.
                                            More than table sugar, more than a Snickers bar. Organic, multigrain,
                                            sprouted–it makes no difference.</p>
                                            <p>I witnessed incredible experiences like the 26-year old man incapacitated
                                            by full-body joint pains who started to jog again, pain-free. And the 38-year
                                            old schoolteacher who, just weeks before her surgeon scheduled colon
                                            removal and ileostomy bag, experienced a cure from ulcerative colitis and
                                            intestinal hemorrhage and stopped all medications.</p>")
first_doctor.services.create(title: "Recuperación total", duration_min: 60,
                             description: "El mejor servicio")
first_doctor.services.create(title: "Dejar el trigo", duration_min: 45,
                            description: "Ayudar a dejar el vicio del trigo")
first_doctor.services.create(title: "Consulta holistica", duration_min: 90,
                             description: "Una consulta con una vision holistica del cuerpo")
first_doctor.services.create(title: "Problemas digestivos", duration_min: 30,
                            description: "<p>Centramos los esfuerzos en mejorar la salud intestinal del paciente</p>")
                            
second_doctor = Doctor.create!(email: "anna@rosell.com", password:"annarosell",
                              country_code:"34", name:"Anna Rosell",
                              subdomain_name:"annarosell", sub_title: "Osteopata",
                              latitude: 39.57671, longitude: 2.65074,
                              street_address: "C/ Cecili Metel, 14 1r Pis", city_address: "07003 Palma de Mallorca - Illes Balears",
                              phone_number: "629482664",
                              description: "Another test description")
second_doctor.services.create(title: "Primera visita", duration_min: 60,
                             description: "El mejor servicio de Mallorca")
second_doctor.services.create(title: "Trigo caca", duration_min: 45,
                            description: "Ayudar a dejar el vicio del trigo para siempre jamas")
second_doctor.services.create(title: "Super holistica", duration_min: 90,
                             description: "Una super consulta con una vision holistica del cuerpo")
second_doctor.services.create(title: "Tipica", duration_min: 30,
                            description: "Centramos los esfuerzos en mejorar la salud intestinal del paciente")

day = DateTime.now.change(hour: 8)
statuses = ['Confirmed', 'Pending', 'Confirmed', 'Confirmed']
writers = [ %w(John Fante), %w(Charles Bukowski), %w(Truman Capote), %w(Sebastian Horsley),
            %w(Vladimir Nabokov), %w(Bram Stoker), %w(Quentin Crisp), %w(Umberto Eco),
            %w(Kennedy Toole), %w(Shalom Auslander), %w(Irvine Wlesh), %w(Dan Fante),
            %w(GeorgeRR Margin), %w(Ben Brooks), %w(Knut Hamsun), %w(Raul Nunez),
            %w(David-Foster Wallace), %w(Michel Houellebecq), %w(Stewart Home), %w(Alexander Trocchi),
            %w(Jack Kerouac), %w(Hubert Selby), %w(Herbert Huncke), %w(Patxi Irurzun),
            %w(William Burroughs), %w(Victor-Hugo Viscarra), %w(Carson McCullers), %w(Isaac Asimov),
            %w(Bret-Easton Ellis), %w(JK Rowling), %w(Henry Miller), %w(Michael Pollan),
            %w(Ernest Hemingway)]
                           
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
   patient2 = writers.sample
   second_doctor.appointments.create(title: second_doctor.services.sample.title,
                              email: Faker::Internet.email,
                              fname: patient2.first,
                              lname: patient2.last,
                              appointment_status: statuses.sample,
                              startTime: appointment,
                              endTime: appointment.in(3600))
  end
  first_doctor.appointments.create(title: "office hour",
                                   appointment_status: "Confirmed",
                                   startTime: new_day,
                                   endTime: new_day.in(3600 * 8),
                                   office_hour: true)
  second_doctor.appointments.create(title: "office hour",
                                   appointment_status: "Confirmed",
                                   startTime: new_day,
                                   endTime: new_day.in(3600 * 8),
                                   office_hour: true)
end
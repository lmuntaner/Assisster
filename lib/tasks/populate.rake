namespace :populate do
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

	desc 'Populates William Davis calendar for the next two weeks'
	task :william_davis => :environment do
		william = Doctor.find(1)
		14.times do |i|
		  new_day = day.next_day(i)
		  next if new_day.saturday? || new_day.sunday?
		  # Open one office hour per that day
		  william.appointments.create(title: "office hour",
                                  appointment_status: "Confirmed",
                                  startTime: new_day,
                                  endTime: new_day.in(3600 * 8),
                                  office_hour: true)
		  # Create 4 appointments per that day
		  4.times do |j|
		    appointment = new_day.in(7200 * j + 1800);
		    patient = writers.sample
		    william.appointments.create(title: william.services.sample.title,
			                              email: Faker::Internet.email,
			                              fname: patient.first,
			                              lname: patient.last,
			                              appointment_status: statuses.sample,
			                              startTime: appointment,
			                              endTime: appointment.in(3600))
		  end
		end
	end
end
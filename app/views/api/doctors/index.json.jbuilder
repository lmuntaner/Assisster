json.extract!(@doctor, :id, :email, :country_code, :created_at, :updated_at)
json.appointments @doctor.appointments do |appointment|
  json.extract!(appointment, :id, :title, :startTime, :endTime, :office_hour,
														 :email, :fname, :lname, :created_at, :updated_at,
														 :appointment_status, :country_code, :phone_number)
end
json.services @doctor.services do |service|
	json.extract!(service, :id, :title, :description, :duration_min, :price, :created_at, :updated_at)
end
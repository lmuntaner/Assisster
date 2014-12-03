json.array! @appointments do |appointment|
  json.extract!(appointment, :id, :title, :startTime, :endTime, :office_hour,
														 :email, :fname, :lname, :created_at, :updated_at,
														 :appointment_status)
end
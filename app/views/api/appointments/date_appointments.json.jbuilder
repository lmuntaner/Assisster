json.array! @appointments do |appointment|
	json.extract!(appointment, :id, :title, :doctor_id,
														 :startTime, :endTime, :office_hour)
end
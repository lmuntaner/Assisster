json.array! @services do |service|
	json.extract!(service, :id, :title, :doctor_id, :description, :duration_min)
end
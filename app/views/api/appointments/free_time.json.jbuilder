json.array! @time_slots do |time_slot|
	if time_slot.is_a?(Hash)
		json.extract!(time_slot, :title, :startTime, :endTime, :fname, :lname)
	else
		json.extract!(time_slot, :id, :title, :doctor_id, :startTime, :endTime, :fname, :lname)
	end
end
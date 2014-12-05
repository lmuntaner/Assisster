json.array! @time_slots do |time_slot|
	if time_slot.is_a?(Hash)
		json.extract!(time_slot, :title, :startTime, :endTime)
	else
		json.extract!(time_slot, :id, :title, :doctor_id, :startTime, :endTime)
	end
end
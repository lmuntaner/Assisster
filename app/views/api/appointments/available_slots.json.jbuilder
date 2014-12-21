json.array! @available_slots do |available_slot|
	json.extract!(available_slot, :title, :startTime, :endTime)
end
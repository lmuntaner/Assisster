json.array! @dates do |date|
	json.extract!(date, :to_date)
end
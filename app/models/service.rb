class Service < ActiveRecord::Base
  validates :title, :doctor, :duration_min, presence: true
  
  belongs_to :doctor
end

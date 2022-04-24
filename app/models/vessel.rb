# frozen_string_literal: true

class Vessel < ApplicationRecord
  scope :by_name, -> { order(name: :asc) }

  belongs_to :organization
  has_many :employments

  validates_presence_of :name

  def move_users_to_other_vessel(new_vessel_id)
    employments.update_all(vessel_id: Vessel.find_by(id: new_vessel_id)&.id)
  end
end

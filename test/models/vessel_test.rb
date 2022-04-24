# frozen_string_literal: true

require "test_helper"

class VesselTest < ActiveSupport::TestCase
  def test_employment_is_invalid_when_name_is_blank
    v = Vessel.new
    v.valid?
    assert_includes v.errors.keys, :name
  end

  def test_vessel_is_invalid_without_organization
    vessel = Vessel.new
    vessel.valid?
    assert_includes vessel.errors.keys, :organization
  end

  test "move_users_to_other_vessel with valid new_vessel_id" do
    vessel.employments.create(user: user, organization: organization)
    new_vessel = Vessel.create(name: "New Vessel", organization: organization)
    vessel.move_users_to_other_vessel(new_vessel.id)

    assert_equal(new_vessel.employments.count, 1)
  end

  test "move_users_to_other_vessel with valid or blank new_vessel_id" do
    employment = vessel.employments.create(user: user, organization: organization)
    vessel.move_users_to_other_vessel(" ")

    assert_nil(employment.reload.vessel_id)
  end

  private

  def vessel
    @vessel ||= Vessel.create(name: "M/S Freja", organization: organization)
  end

  def organization
    @organization ||= Organization.create(name: "Lorem ipsum")
  end

  def user
    @user ||= UserFactory.create(
      email: "user@example.com",
      password: "password",
      first_name: "User",
      last_name: "Example"
    )
  end
end

class Api::UserPropertiesController < ApplicationController
  def index
    @user_properties = UserProperty.all
    render json: @user_properties, status: 200
  end

  def create
    @property = Property.find_by(portland_id: params[:portland_id])
    @user = User.find(params[:user_id])
    UserProperty.create(property: @property, user: @user)
  end

  def find
    @property = Property.find_by(portland_id: params[:portland_id])
    @user_property = UserProperty.find_by(property_id: @property.id, user_id: params[:user_id])
    render json: @user_property, status: 200
  end

  def destroy
    @property = Property.find_by(portland_id: params[:portland_id])
    @user_property = UserProperty.find_by(property_id: @property.id, user_id: params[:user_id])
    @user_property.destroy
    render json: @property, status: 200
  end
end

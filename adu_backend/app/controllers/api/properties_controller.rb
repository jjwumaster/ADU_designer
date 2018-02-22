class Api::PropertiesController < ApplicationController

  def index
    @properties = Property.all
    render json: @properties
  end

  def create
    @property = Property.find_or_create_by(properties_params)
    if @property.valid?
      @property.save
      render json: @property, status: 200
    end
  end

  def get
    @property = Property.find_by(portland_id: params[:id])
    render json: @property, status: 200
  end

  private

  def properties_params
    params.require(:property).permit(:id, :portland_id, :address)
  end

end

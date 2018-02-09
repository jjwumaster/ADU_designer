class Api::PropertiesController < ApplicationController

  def index
    @properties = Property.all
    render json: @properties
  end

  def create
    @property = Property.find(params.id)
    # if @property.create(params)
    #
    # else
    #   # return an error
    # end
  end


  private

  def properties_params
    params.require(:property).permit(:name, :address, :city, :zip, :lat, :long)
  end

end

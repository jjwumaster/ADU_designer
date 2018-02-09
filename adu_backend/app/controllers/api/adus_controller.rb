class Api::AdusController < ApplicationController

  def index
    @adus = Adu.all
    render json: @adu
  end

end

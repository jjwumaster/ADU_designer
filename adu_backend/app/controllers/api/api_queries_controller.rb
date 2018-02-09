class Api::ApiQueriesController < ApplicationController

  def query
    @result = ApiQuery.query(params[:id], params[:request])
    render json: @result
  end

  # FAILED TO USE STRONG PARAMS

  # private

  # def query_params
  #   params.require(:api_query).permit(:id, :request)
  # end

end

class Api::SuggestionsController < ApplicationController

  def suggest
    suggestion = Suggestion.suggest(suggest_params[:query])
    render json: suggestion
  end

  private

  def suggest_params
    params.require(:suggestion).permit(:query)
  end

end

class Suggestion < ApplicationRecord

  PORTLAND_ROOT = "https://www.portlandmaps.com/api"
  API_KEY = "api_key=A9B7971CAE4719C7E6C53F304C2D24BD"

  def self.suggest(query)
    response = RestClient.get("#{PORTLAND_ROOT}/suggest?alt_ids=1&query=#{query}&#{API_KEY}")
    JSON.parse(response)
  end

end

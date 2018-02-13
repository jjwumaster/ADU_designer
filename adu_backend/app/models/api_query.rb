class ApiQuery < ApplicationRecord

  PORTLAND_ROOT = "https://www.portlandmaps.com/api"
  API_KEY = "api_key=A9B7971CAE4719C7E6C53F304C2D24BD"

  def self.query(id, request)
    case request
    when "detail"
      response = RestClient.get("#{PORTLAND_ROOT}/detail?detail_type=property&sections=*&detail_id=#{id}&#{API_KEY}")
    when "assessor"
      response = RestClient.get("#{PORTLAND_ROOT}/detail?detail_type=assessor&sections=*&detail_id=#{id}&#{API_KEY}")
    when "latlong"
      response = RestClient.get("#{PORTLAND_ROOT}/assessor?property_id=#{id}&#{API_KEY}")
    else
      puts "whut"
    end

    JSON.parse(response)
  end

end

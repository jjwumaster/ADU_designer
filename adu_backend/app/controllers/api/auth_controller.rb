class Api::AuthController < ApplicationController

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: {email: user.email, id: user.id, jwt: JWT.encode({user_id: user.id}, ENV['secret_key_base'], 'HS256')}
    else
      render json: {error: "User invalid"}, status: 401
    end
  end

  def show

    # show what i need in the right format

    if current_user

      render json: {
        id: current_user.id,
        email: current_user.email
      }
    else
      render json: {error: 'No id present on headers'}, status: 404
    end
  end

end

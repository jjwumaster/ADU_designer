class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users, status: 200
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      render json: @user, status: 200
    else
      render json: {errors: @user.errors.full_messages}, status: 200
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end

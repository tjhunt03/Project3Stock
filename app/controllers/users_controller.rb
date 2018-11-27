class UsersController < ApplicationController



  def new
    @user = User.new
  end

  def create
    user = User.create user_params #strong params
    if user.persisted?
      #acc created successfully
      session[:user_id] = user.id #log in the new user!
      redirect_to root_path
      # (username)  #go to the show page for this user
    else
      # Acc not created: show error
      #set a flash to show on the next page: it will be an array of error strings
      flash[:errors] = user.errors.full_messages
      redirect_to new_user_path
    end
  end

  def show
    @user = User.find params[:id]
  end

  def edit

  end

  def update
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
    #stuff
  end
end

class SessionController < ApplicationController
  def new
    end

    def search
    end

    def create
      #see if the email address entered actuallly corresponds to a user in the create_table
      user = User.find_by email: params[:email]

      if user.present? && user.authenticate(params[:password])
        #successful login
        #get rails to create a new sesion key variable to store the user's ID
        #this is the sesion which we will check if the user
        #is logged in on all future pages
        session[:user_id] = user.id

        redirect_to "/#/news"
        # (user.id)
      else
        # Bad credentials, i.e unsuccessful login

        flash[:error] = "invalid email address or password"
        redirect_to (login_path)
      end
    end

    def destroy
      session[:user_id] = nil # logs user out
      redirect_to root_path

    end



  end

class FriendsController < ApplicationController
  before_action :set_friend, only: [:show, :edit, :update, :destroy]

  # GET /friends
  # GET /friends.json
  def index
    @friends = current_user.user_friends
    @friend = Friend.new
  end

  # GET /friends/1
  # GET /friends/1.json
  def show
  end

  # GET /friends/new
  def new
    @friend = Friend.new
  end

  # GET /friends/1/edit
  def edit
  end

  # POST /friends
  # POST /friends.json
  def create

    
		@parameter = params[:friend][:email]
		
		if  @parameter.empty?
      respond_to do |format|
        format.html { redirect_to friends_path, notice: 'Email was Empty Cant add.' }
      end
		else #check if it is the same user
			#if it is a wrong type
      if User.exists? email: @parameter
              puts "ok fine it is a user"
            #check if he is the same user		
            if @parameter == current_user.email 
              respond_to do |format|
                format.html { redirect_to friends_path, notice: 'Cant Add You self.' }
              end
            else
              #check if the friend exist or not
              @fid = User.find_by(email: @parameter )
              @user = current_user
              if @user.owned_friends.exists? friend_id: @fid.id
                respond_to do |format|
                  format.html { redirect_to friends_path, notice: 'you friend  to him !.' }
                end
              else
               
                @user = current_user
                @friend = Friend.create(user: current_user, friend: @fid)
                respond_to do |format|
                  format.html { redirect_to friends_path, notice: 'Friend was successfully add.' }
                  format.json { head :no_content }
                  end		
              end		
            end
      else
        respond_to do |format|
          fformat.html { render :index }
          format.json { render json: @friend, status: :unprocessable_entity }	
      end	
		end
  end
end

  # DELETE /friends/1
  # DELETE /friends/1.json
  def destroy
    groups = @friend.user.groups.all
    groups.each do |group|
      f =group.users.find_by(id: @friend.friend_id)
      if f
        GroupMember.find_by(group: group,user: @friend.friend).destroy
      end
    end

    @friend.destroy
    respond_to do |format|
      format.html { redirect_to friends_url, notice: 'Friend was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def friend_params
      params.require(:friend).permit(:friend_id, :user_id)
    end
end
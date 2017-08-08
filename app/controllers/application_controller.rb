class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def home
    @countries = Country.all.map(&:name)
  end

  def states
    params.permit([:country])
    country = Country.find_country_by_name(params[:country])
    country.states.each do |state|
      s = State.new(name: state[1].name, country: country) unless State.where(name: state[1].name).exists?
      s.save unless s.nil?
    end
    @states = State.where(country: params[:country])
    respond_to do |format|
      format.json { render json: @states }
    end
  end
end

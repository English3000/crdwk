require 'rails_helper'

feature 'User auth.', js: true do
  before (:each) do
    visit('/')
    # expect(page).to have_field('.capybara')
  end

  scenario 'default page: Home' do
    expect(page).to have_content('Home Page')
  end

  #both fail--not hydrating...
  feature 'AuthForm' do
    scenario 'handles invalid Sign Up' do
      click_button 'Sign Up'
      expect(page).to have_content 'invalid'
    end

    scenario 'handles invalid Sign In' do
      click_button 'Sign In'
      expect(page).to have_content 'Invalid'
    end
  end
end

class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: {minimum: 8, allow_nil: true}
  # Check that a user enters a long enough password.
  # `allow_nil` is there because passwords are NOT stored in the database as a security measure.

  after_initialize :ensure_token
  # When a new user is created, assign them a session token.
  def ensure_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  def reset_token
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save
    self.session_token
  end

  attr_reader :password
  def password=(password) #encrypts new user's password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def password_match?(password) #decrypts & validates user's password on sign in
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password) #authenticates user
    user = User.find_by(email: email)

    # If a user exists with the email submitted
    #  AND the password submitted is correct,
    #  return this user. Otherwise, return nothing.
    user && user.password_match?(password) ? user : nil
  end
end

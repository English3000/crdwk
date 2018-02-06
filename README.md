### Setup

Open **Terminal**.

`rails new Project --database=postgresql --webpack=react`

`cd Project && atom .`

Add to **Gemfile**,
```ruby
gem 'rails_12factor'
gem 'react-rails'
gem 'pry-rails'

group :development, :test do
  gem 'capybara-webkit'

  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'rails-controller-testing'
  gem 'faker'
  gem 'guard-rspec'
  gem 'launchy'
  gem 'shoulda-matchers'

  gem 'letter_opener'
end

group :development do
  gem 'annotate'
  gem 'better_errors'
  gem 'binding_of_caller'
end
```

`bundle update`

`rails g react:install`

`npm install --save babel-core babel-loader babel-polyfill babel-preset-env lodash react-redux react-router-dom redux redux-thunk webpack`

`npm install --save-dev enzyme enzyme-adapter-react-16 jest redux-logger redux-mock-store`

Add to **package.json**,
```json
"main": "webpack.config.js",
"scripts": {
  "start": "npm install",
  "postinstall": "webpack",
  "test": "jest",
  "test:watch": "npm test --watch"
},
"engines": {
  "node": "6.10.1",
  "npm": "3.10.10"
},
```

`atom webpack.config.js`

Copy & paste (refer to **webpack.config.js**).

~ ~ ~

**GitHub Setup**

`git add -A && git commit -m '-'`

Open your browser, go to **GitHub.com**, and sign up/in.

Click the **+** button in the top-right corner, and select **New repository**.

Enter a repository name, then click **Create repository**.

Under **…or create a new repository on the command line**, copy the lines `git remote add origin`... _(URL to your repo)_ and `git push -u origin master`.

NOTE: Whenever you make a very minor change, `git add -A && git commit -m '...' && git push`.

~ ~ ~

Create /**frontend** folder (at root-level of directory).

# [Skip to coding instructions]()

_Or_, `git clone https://github.com/English3000/crdwk`

## Notes on my experience learning how to code

### GIVEN
Education
* I graduated from a high school that did not require any Computer Science courses.
* I completed undergrad.

Access
* I have no friends or family in tech/programming.
* I gained familiarity with programming on my own through Codecademy.

### UNIQUE FACTORS
Ability
+ I graduated from high school in 2 years and undergrad in 2.5 years, both with perfect GPAs _(so I'm strong academically and time-effective)_.
+ I had an interest in public service from a young age. As a result, I've had professional experiences since middle school _(so I've excelled in another area)_.

Previous Exposure
+ a municipal internship building HTML webpages
+ a high school class using Dreamweaver to make HTML webpages

### GAPS

Regarding my previous exposure:

In government, this was my first experience in a public office so my focus was on what it was like being in government, as opposed to learning more about websites. Additionally, I did not create a new project; I built webpages upon my boss's framework.

In my high school course, we used Dreamweaver--which I didn't own--and the course was slow-paced for me. The teacher never mentioned CSS or JavaScript, so the course solely consisted of my gaining familiarity with HTML elements.

As a result, Codecademy was my first exposure to everything except HTML! Codecademy is good for walking you through the syntax of a language. However, that is the limitation of its projects: they teach you the syntax of programming languages, NOT what people actually use them for.

### MOTIVATION

I "got into tech" (interest + first piece of conceptual understanding) by chance: I applied to the Massachusetts Attorney General's Office and was selected for an internship in its IT Division.

>I think these kind of by-chance experiences are how a lot young adult who weren't exposed to programming in adolescence "get into tech"--they work at some institution's IT department because they applied to the institution--without knowing anything in particular about IT. Nonetheless, on the job they are exposed to tech and taught something.

In my case, I was exposed to the preparation for building an app: documenting requirements of the users (users = lawyers; requirements re: case management, across all areas of law). What made the experience interesting were the experience of documenting business processes (which I liked) and how well-run the division was (particularly, my experience participating in and listening to their technical discussions on how they would build the tool and how they would release it to their users).

In all, the internship presented an area of work that was more robust than past internships'. Additionally, when building something, 100 percent of my work would go into the end product, whereas with law (what I was considering at the time) a good percentage of my time would be consumed with administrative paperwork.

### ENTRY POINT

>Possible entry points into tech:
>* **access** _(family/friends who teach you, as a child/teenager)_
>* **education** _(high school & college, middle school if lucky--due to intellectual interest, assuming your school has curriculum and resources)_
>* **professional experience** _(doing something tech-related in the workplace, as a young professional)_
>* **higher education** _(a post-undergrad Computer Science program, or coding bootcamp)_

>If you have access at a young age (which is often accompanied by intellectual interest), you can supplement what your family/friends teach you around middle school age (or younger) with more advanced material offered in high school and college.

>By the time you are a young adult, you can build something worth millions of dollars.

>With education (and good academic performance), you can enter tech after undergrad and maybe you'll have produced a cool app people use.

>Otherwise, if you come to tech at a later age, all you'll know is the experience that got you interested and you'll need to research resources to learn more (namely a coding bootcamp or university program).

In my case, I got into tech via experience and further education.

My experience in the IT Division was the summer prior to my last semester of college. As a result, with a degree in Political Science and a minor in Economics, I was applying to tech companies!

With strong academic credentials, I landed a technical consulting role with a company that sets up Oracle software for its clients.

>So in my case, my exposure to tech came during an internship, and my first technical experience (once I had an interest in tech) was with a separate company. Others may gain both exposure and experience at the same organization.

In this role, I saw what more complex software looked like, gained experience using SQL in a professional setting, and gained some perspective from a business standpoint: seeing how my company operated, interacting with customers, setting up software, and seeing its pitfalls.

This experience confirmed for me the desire to delve deeper into tech, i.e. to become a software engineer/to have a career in tech.

So I did some research. I tried an online graduate-level course and saw its pitfalls. So I looked at full-time, in-person coding bootcamps.

>Most coding bootcamps just do an interview to see if you'd be a fit. The next tier up give you some prep work and make you pass a coding challenge, along with interviewing you for fit.

I initiated the application process for the top _full-stack_ bootcamps listed on SwitchUp.

### What does 'full-stack' mean?

A software engineer builds software: interactive websites, apps accessed via one's browser, mobile apps, or desktop apps.

From a technical standpoint, a website has 4 parts:

* the 'frontend', which your browser displays (made up of HTML, CSS, and JavaScript)

* the database, which stores information for each user (there are databases that use SQL and ones that don't--NoSQL)

* the 'backend', which is a server that handles requests from the frontend to your database (e.g. switching to another page on the website, or creating, updating, deleting, or displaying--aka "reading"--something)

* the host, e.g. [Heroku](https://www.heroku.com/) (your website is actually a bunch of files and folders stored in a directory--or root folder, root as in the root of a tree... with folders inside the directory as branches; as a result, if you develop a website on your computer, it is local to your computer--only you can access it; you need a hosting service to put it online, for others)

### App Academy

...was my top choice of the coding bootcamps I applied to, and I made it through their application process.

App Academy provided:

* a curriculum on Ruby on Rails (backend), SQL (database), and React (frontend), along with instructions for hosting a website on Heroku

* guided projects, mostly to be completed in pairs via a process known as [pair-programming](https://prepwork.appacademy.io/pair-programming/)

* guidelines for our own projects

* support from TAs

* job search advice

* mini-curriculum on Computer Science subjects

App Academy taught via learn-by-doing. The day would start with a lecture introducing content we would use in that day's project. We would spend the rest of the class day pair-programming on a guided project, able to request a TA if we got stuck or had questions. Then we would have readings/videos in the evenings and sometimes a brief coding assignment.

>One more thing to note about App Academy if you're considering it: they have an assessment-based curriculum--i.e. if you fail 2 (plus a re-take assessment), you fail out. On the flipside, the tuition is deferred until you land a job (and prorated if you fail out).

And there were the added benefits of structure, social support, and corresponding productivity.

### POST-CURRICULUM

I consider App Academy a gift:

1. They bear the risk of your education
2. The curriculum is streamlined and clear

Post-curriculum, looking at other languages and technologies' documentation, the minority of it is accessible to "junior-level" developers, even fewer of them have even one guided project, and most of them take longer to actually get a project running--and with uglier syntax!

### SETUP = Ruby on Rails (server- & client-side rendering) + PostgreSQL + React + Heroku

Open **Terminal** _(or your preferred Command Line Interface, e.g. Powershell on Windows)_.

> Install **[Ruby](https://www.ruby-lang.org/en/downloads/)** _(_`brew install ruby` _for Macs with_ **[Homebrew](https://brew.sh/)**_)_ and **[Node.js](https://nodejs.org/en/download/)**.

`rails new Project --database=postgresql --webpack=react`

> Install and setup **[Postgres](https://postgresapp.com/)** and **[Atom](https://atom.io/)**.

> **Atom Setup**

> Open **Atom** and navigate to Settings, _aka Preferences_ (`⌘,` on Mac).

> Click the **Install** tab. Install:

> _for JavaScript:_
linter-eslint
language-babel

> _for Ruby:_
linter-rubocop

> _for React:_
nuclide
linter-flow

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

`rails g react:install` (if you get a message saying you need to install Yarn, follow the URL)

In **./app/assets/javascripts/application.js**, add `//= require react`

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

Copy & paste (refer to this project's **webpack.config.js**).

>**GitHub Setup**

>`git add -A && git commit -m '-'`

>Open your browser, go to **[GitHub.com](https://github.com/)**, and sign up/in.

>Click the **+** button in the top-right corner, and select **New repository**.

>Enter a repository name, then click **Create repository**.

>Under **…or create a new repository on the command line**, copy the lines `git remote add origin`... _(URL to your repo)_ and `git push -u origin master`.

>NOTE: Whenever you make a very minor change, `git add -A && git commit -m '...' && git push`

`mkdir frontend` (at root-level of directory)

`cd frontend && atom index.js`

Copy & paste (refer, in **frontend**, to this project's **index.js**).

In **../app/views/layouts/application.html.erb**, add `<%= javascript_pack_tag 'application' %>` and wrap **yield** in a `div`:

```erb
<div id='replace-with-js'>
  <%= yield %>
</div>
```

`atom setup.js` Copy & paste.

`atom store.js` Copy & paste.

`atom App.jsx` Copy & paste.

`mkdir reducers && cd reducers`

`atom root.js && echo "export default () => ({});" >> root.js`

`cd .. && mkdir components && cd components`

`atom HomePageContainer.jsx` Copy & paste.

`rails g react:component HomePageContainer --es6`

`⌘ t` in Atom, type HomePageContainer, select the file in **app/javascript/components/HomePageContainer.js** _(see [react-rails](https://github.com/reactjs/react-rails#component-generator) for details)_, copy & paste.

In **../config/routes.rb**, add `root to: 'application#home'` _--sets the default route `/`_

In **../app/controllers/application_controller.rb**, add:

```ruby
def home
end
```

In **app/views** create an /**application** folder. In that folder, create a file **home.html.erb**. Copy & paste.

`rails s`

In another tab (`⌘ t` in Terminal), `webpack --watch`

Open your browser & go to localhost:3000. You should see the text `Client-rendered`.

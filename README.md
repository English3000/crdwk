### Project Stages

0. Project setup + [documentation](https://github.com/English3000/Intro-to-Coding/tree/master) **(generic)**
1. User auth + SSR & [mobile](https://github.com/English3000/crdwk-app) integrations + testing **(generic)** + styling + refactoring
  * `capybara-webkit`, Selenium `driven_by :headless_chrome` & Jest tests fail

2. User search + integrations + styling
3. MVPs for first features: Ideas & Projects

_What distinguishes an idea from a project?_

**AN idea is a discussion:**
- [x] it has a name & a description **_(make formattable later)_**
+ it can be commented on, liked, or requested (indicating one would like to collaborate on it as a project)
+ an idea can only be converted into a project by its owner
- [x] an idea can be retired/archived
> notepad feature

**UI**
An idea & its comments are displayed reverse-chronologically, with the most recent revision displayed page-center.

An idea can be edited in case of typos, or revised. The revised idea joins the reverse-chronological queue.

A visitor can scroll up to read comments since the revision or down to review earlier considerations. There is also a comment button on the idea/revision which brings the visitor to the top of the page to comment.


**A project is an idea that has been fleshed out:**
+ it has a name & a formattable description (can only be edited, not 'revised')
+ it lists its members (users)
+ it can link to a URL
+ it has a Join/Leave button, which prompts a message box (Why do you want to join?/Why are you leaving?)--this is sent to members' inboxes with an Add button
+ on the Project Page, members can lookup, add & remove users
+ members can create & assign tasks
> more, once built up to here

**COMPETITOR:** Facebook's [Workplace](https://play.google.com/store/apps/details?id=com.facebook.work) -- its weakness is the platform is just a spin-off of Facebook...

**Fancy Features:**
* [videochat](https://medium.com/@jeanpaulsio/an-intro-to-webrtc-for-rails-developers-453c79a0d6a1)

# rails db:seed
#
# movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Idea.destroy_all

user1 = User.create(name: 'Test User',
                    email: 'test@crd.wk',
                    password: 'testUser')

idea1 = Idea.create(name: 'Test Idea',
                    body: "Here's an idea...",
                    user_id: user1.id)
idea2 = Idea.create(name: 'New Idea',
                    body: "This one's even better...",
                    user_id: user1.id)
idea3 = Idea.create(name: 'Old Idea',
                    body: "Someone already did this.",
                    user_id: user1.id,
                    active: false)

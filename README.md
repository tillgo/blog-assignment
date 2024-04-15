# Blog Publishing Platform

This project is a Medium like, simple publishing platform, where users can read and write articles.
Currently, it is themed about sharing the journey towards a life goal, but it can be easily changed to any other theme.

I built it as a part of a Node.js + Express college assignment. It uses TypeScript for the backend, 
Handlebars as a templating engine and MongoDB as a database.

Currently hosted here: https://blog-ception-639890926140.herokuapp.com/ (might not be available at all times)

**Features:**
- User registration / login
- Read articles
- Search for articles
- Write articles as any user
- Update / Delete your articles
- Comment on articles
- Tags
- Admin moderation dashboard (moderate users and articles on platform)
- Dark mode

## Development

**Prerequisites:**
- Node.js installed
- MongoDB running somewhere (locally or MongoDB Atlas free tier)

**Steps:**
1. Run `npm install`
2. Create a `.env` file. You can copy the `.env.example` file and fill in the values.
3. Run `npm run dev` to start the server in development mode.
4. Open `http://localhost:3000` in your browser.

After you registered an account, you can make yourself an admin by changing the `isAdmin` 
field in the database to `true` for your user.
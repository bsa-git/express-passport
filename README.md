Express Passport
================

This application is written to demonstrate examples of user authentication
and authorization. This application uses [Passportjs](http://passportjs.org/).
As the basis of my project, I took a wonderful application
[Hackathon-starter](https://github.com/sahat/hackathon-starter).


**Live Demo**: https://hackathon-starter-2018.herokuapp.com

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Obtaining API Keys](#obtaining-api-keys)
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [License](#license)

Features
--------

- **Local Authentication** using Email and Password
- **OAuth 1.0a Authentication** via Twitter
- **OAuth 2.0 Authentication** via Facebook, Google, GitHub, LinkedIn, Instagram
- Flash notifications
- MVC Project Structure
- Bootstrap 3 + jQuery
- Contact Form (powered by Sendgrid)
- **Account Management**
 - Gravatar
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Link multiple OAuth strategies to one account
 - Delete Account
- CSRF protection
- **API Examples**: Facebook, Foursquare, Last.fm, Tumblr, Twitter, Stripe, LinkedIn and more.

Prerequisites
-------------

- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 8.0+](http://nodejs.org)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/bsa-git/express-passport.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
npm run dev
```

Obtaining API Keys
------------------

To use any of the included APIs or OAuth authentication methods, you will need
to obtain appropriate credentials: Client ID, Client Secret, API Key, or
Username & Password. You will need to go through each provider to generate new
credentials.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1000px-Google_2015_logo.svg.png" width="200">

- Visit <a href="https://cloud.google.com/console/project" target="_blank">Google Cloud Console</a>
- Click on the **Create Project** button
- Enter *Project Name*, then click on **Create** button
- Then click on *APIs & auth* in the sidebar and select *API* tab
- Click on **Google+ API** under *Social APIs*, then click **Enable API**
- Next, under *APIs & auth* in the sidebar click on *Credentials* tab
- Click on **Create new Client ID** button
- Select *Web Application* and click on **Configure Consent Screen**
- Fill out the required fields then click on **Save**
- In the *Create Client ID* modal dialog:
 - **Application Type**: Web Application
 - **Authorized Javascript origins**: http://localhost:3000
 - **Authorized redirect URI**: http://localhost:3000/auth/google/callback
- Click on **Create Client ID** button
- Copy and paste *Client ID* and *Client secret* keys into `.env`

**Note:** When you ready to deploy to production don't forget to
add your new url to *Authorized Javascript origins* and *Authorized redirect URI*,
e.g. `http://my-awesome-app.herokuapp.com` and
`http://my-awesome-app.herokuapp.com/auth/google/callback` respectively.
The same goes for other providers.

<hr>

<img src="http://www.doit.ba/img/facebook.jpg" width="200">

- Visit <a href="https://developers.facebook.com/" target="_blank">Facebook Developers</a>
- Click **My Apps**, then select **Add a New App* from the dropdown menu
- Enter a new name for your app
- Click on the **Create App ID** button
- Find the Facebook Login Product and click on **Facebook Login**
- Instead of going through their Quickstart, click on **Settings** for your app in the top left corner 
- Copy and paste *App ID* and *App Secret* keys into `.env`
- **Note:** *App ID* is **FACEBOOK_ID**, *App Secret* is **FACEBOOK_SECRET** in `.env`
- Enter `localhost` under *App Domains*
- Choose a **Category** that best describes your app
- Click on **+ Add Platform** and select **Website**
- Enter `http://localhost:3000` under *Site URL*
- Click on the *Settings* tab in the left nav under Facebook Login
- Enter `http://localhost:3000/auth/facebook/callback` under Valid OAuth redirect URIs

**Note:** After a successful sign in with Facebook, a user will be redirected back to home page with appended hash `#_=_` in the URL. It is *not* a bug. See this [Stack Overflow](https://stackoverflow.com/questions/7131909/facebook-callback-appends-to-return-url) discussion for ways to handle it.

<hr>

<img src="https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Logo.png" width="200">

- Go to <a href="https://github.com/settings/profile" target="_blank">Account Settings</a>
- Select **Developer settings** from the sidebar
- Then inside click on **Register new application**
- Enter *Application Name* and *Homepage URL*
- For *Authorization Callback URL*: http://localhost:3000/auth/github/callback
- Click **Register application**
- Now copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>

<img src="https://g.twimg.com/ios_homescreen_icon.png" width="90">

- Sign in at <a href="https://apps.twitter.com/" target="_blank">https://apps.twitter.com</a>
- Click **Create a new application**
- Enter your application name, website and description
- For **Callback URL**: http://127.0.0.1:3000/auth/twitter/callback
- Go to **Settings** tab
- Under *Application Type* select **Read and Write** access
- Check the box **Allow this application to be used to Sign in with Twitter**
- Click **Update this Twitter's applications settings**
- Copy and paste *Consumer Key* and *Consumer Secret* keys into `.env` file

<hr>

<img src="http://www.danpontefract.com/wp-content/uploads/2014/02/logo-linkedin.png" width="200">

- Sign in at <a href="https://developer.linkedin.com/" target="_blank">LinkedIn Developer Network</a>
- From the account name dropdown menu select **API Keys**
 - *It may ask you to sign in once again*
- Click **+ Add New Application** button
- Fill out all the *required* fields
 - **OAuth 2.0 Redirect URLs**: http://localhost:3000/auth/linkedin/callback
 - **JavaScript API Domains**: http://localhost:3000
- For **Default Application Permissions** make sure at least the following is checked:
 - `r_basicprofile`
- Finish by clicking **Add Application** button
- Copy and paste *API Key* and *Secret Key* keys into `.env` file
 - *API Key* is your **clientID**
 - *Secret Key* is your **clientSecret**

<hr>

<img src="https://stripe.com/img/about/logos/logos/black@2x.png" width="200">

- <a href="https://stripe.com/" target="_blank">Sign up</a> or log into your <a href="https://manage.stripe.com" target="_blank">dashboard</a>
- Click on your profile and click on Account Settings
- Then click on **API Keys**
- Copy the **Secret Key**. and add this into `.env` file

<hr>

<img src="https://pixabay.com/static/uploads/photo/2015/05/26/09/37/paypal-784404_960_720.png" width="200">

- Visit <a href="https://developer.paypal.com" target="_blank">PayPal Developer</a>
- Log in to your PayPal account
- Click **Applications > Create App** in the navigation bar
- Enter *Application Name*, then click **Create app**
- Copy and paste *Client ID* and *Secret* keys into `.env` file
- *App ID* is **client_id**, *App Secret* is **client_secret**
- Change **host** to api.paypal.com if you want to test against production and use the live credentials

<hr>

<img src="http://33.media.tumblr.com/ffaf0075be879b3ab0b87f0b8bcc6814/tumblr_inline_n965bkOymr1qzxhga.png" width="200">

- Go to <a href="https://developer.foursquare.com" target="_blank">Foursquare for Developers</a>
- Click on **My Apps** in the top menu
- Click the **Create A New App** button
- Enter *App Name*, *Welcome page url*,
- For **Redirect URI**: http://localhost:3000/auth/foursquare/callback
- Click **Save Changes**
- Copy and paste *Client ID* and *Client Secret* keys into `.env` file

<hr>

<img src="http://img4.wikia.nocookie.net/__cb20130520163346/logopedia/images/8/8d/Tumblr_logo_by_x_1337_x-d5ikwpp.png" width="200">

- Go to <a href="http://www.tumblr.com/oauth/apps" target="_blank">http://www.tumblr.com/oauth/apps</a>
- Once signed in, click **+Register application**
- Fill in all the details
- For **Default Callback URL**: `http://localhost:3000/auth/tumblr/callback`
- Click **✔Register**
- Copy and paste *OAuth consumer key* and *OAuth consumer secret* keys into `.env` file

<hr>

<img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Steam_logo.svg" width="200">

- Go to <a href="http://steamcommunity.com/dev/apikey" target="_blank">http://steamcommunity.com/dev/apikey</a>
- Sign in with your existing Steam account
- Enter your *Domain Name*, then and click **Register**
- Copy and paste *Key* into `.env` file

<hr>

<img src="https://sendgrid.com/brand/sg-logo-300.png" width="200">

- Go to <a href="https://sendgrid.com/user/signup" target="_blank">https://sendgrid.com/user/signup</a>
- Sign up and **confirm** your account via the *activation email*
- Then enter your SendGrid *Username* and *Password* into `.env` file

<hr>

<img src="https://s3.amazonaws.com/ahoy-assets.twilio.com/global/images/wordmark.svg" width="200">

- Go to <a href="https://www.twilio.com/try-twilio" target="_blank">https://www.twilio.com/try-twilio</a>
- Sign up for an account.
- Once logged into the dashboard, expand the link 'show api credentials'
- Copy your Account Sid and Auth Token

Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **config**/mongod.config.yml       | Config for MongoDB.                                          |
| **config**/passport.js             | Passport Local and OAuth strategies, plus login middleware.  |
| **controllers**/api.js             | Controller for /api route and all api examples.              |
| **controllers**/contact.js         | Controller for contact form.                                 |
| **controllers**/home.js            | Controller for home page (index).                            |
| **controllers**/index.js           | Initializing Controllers.                                    |
| **controllers**/user.js            | Controller for user account management.                      |
| **data**/**db**/**mongod**         | MongoDB database location folder.                            |
| **data**/**log**/**mongod**        | Log for MongoDB database location folder.                    |
| **data**/**uploads**               | Uploads files location folder.                               |
| **models**/index.js                | Connect to MongoDB database.                                 |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (css, js, images).                             |
| **views/account**/                 | Templates for *login, password reset, signup, profile*.      |
| **views/api**/                     | Templates for API Examples.                                  |
| **views/partials**/flash.pug       | Error, info and success flash notifications.                 |
| **views/partials**/header.pug      | Navbar partial template.                                     |
| **views/partials**/footer.pug      | Footer partial template.                                     |
| **views**/contact.pug              | Contact template.                                            |
| **views**/error.pug                | Error template.                                              |
| **views**/home.pug                 | Home page template.                                          |
| **views**/layout.pug               | Base template.                                               |
| .env                               | Your real API keys, tokens, passwords and database URI.      |
| .env.example                       | Your example API keys, tokens, passwords and database URI.   |
| .gitignore                         | Folder and files ignored by git.                             |
| app.js                             | The main application file.                                   |
| package.json                       | NPM dependencies.                                            |
| package-lock.json                  | Contains exact versions of NPM dependencies in package.json. |
| server.js                          | Start local server.                                          |

**Note:** There is no preference how you name or structure your views.
You could place all your templates in a top-level `views` directory without
having a nested folder structure, if that makes things easier for you.
Just don't forget to update `extends ../layout`  and corresponding
`res.render()` paths in controllers.

List of Packages
----------------

| Package                         | Description                                                             |
| ------------------------------- | ------------------------------------------------------------------------|
| @octokit/rest                   | GitHub API library.                                                     |
| @sendgrid/mail                  | Mail library.                                                           |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                         |
| body-parser                     | Node.js body parsing middleware.                                        |
| chalk                           | Terminal string styling done right.                                     |
| cheerio                         | Scrape web pages using jQuery-style syntax.                             |
| clockwork                       | Clockwork SMS API library.                                              |
| compression                     | Node.js compression middleware.                                         |
| cross-env                       | Setting environment variables.                                          |
| debug                           | Debug library.                                                          |
| dotenv                          | Loads environment variables from .env file.                             |
| express                         | Node.js web framework.                                                  |
| express-flash                   | Provides flash messages for Express.                                    |
| express-session                 | Simple session middleware for Express.                                  |
| express-status-monitor          | Reports real-time server metrics for Express.                           |
| express-validator               | Easy form validation for Express.                                       |
| fbgraph                         | Facebook Graph API library.                                             |
| instagram-node                  | Instagram API library.                                                  |
| lastfm                          | Last.fm API library.                                                    |
| lob                             | Lob API library.                                                        |
| lusca                           | CSRF middleware.                                                        |
| mongoose                        | MongoDB ODM.                                                            |
| morgan                          | HTTP request logger middleware for node.js.                             |
| multer                          | Node.js middleware for handling `multipart/form-data`.                  |
| node-foursquare                 | Foursquare API library.                                                 |
| node-linkedin                   | LinkedIn API library.                                                   |
| passport                        | Simple and elegant authentication library for node.js.                  |
| passport-facebook               | Sign-in with Facebook plugin.                                           |
| passport-github                 | Sign-in with GitHub plugin.                                             |
| passport-google-oauth           | Sign-in with Google plugin.                                             |
| passport-instagram              | Sign-in with Instagram plugin.                                          |
| passport-linkedin-oauth2        | Sign-in with LinkedIn plugin.                                           |
| passport-local                  | Sign-in with Username and Password plugin.                              |
| passport-openid                 | Sign-in with OpenId plugin.                                             |
| passport-oauth                  | Allows you to set up your own OAuth 1.0a and OAuth 2.0 strategies.      |
| passport-twitter                | Sign-in with Twitter plugin.                                            |
| paypal-rest-sdk                 | PayPal APIs library.                                                    |
| pug (jade)                      | Template engine for Express.                                            |
| request                         | Simplified HTTP request library.                                        |
| stripe                          | Offical Stripe API library.                                             |
| tumblr.js                       | Tumblr API library.                                                     |
| twilio                          | Twilio API library.                                                     |
| twit                            | Twitter API library.                                                    |
| validator                       | Used in conjunction with express-validator in **controllers/api.js**.   |


License
-------

The MIT License (MIT)

Copyright (c) 2018 Sergey Beskorovainy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

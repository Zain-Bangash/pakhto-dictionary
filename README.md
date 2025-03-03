A full-stack Pashto Dictionary web app for preserving the Bangash dialect of the Pashto language.
Built with React, Node.js, Express, and MongoDB.

Features implemented so far:


    Displaying words
    Users can add words (which will show once approved by admin)
    Dynamic page content based on account type
    Admin can approve words
    Login / Logout

Features of implement in the near future:


    User Registration
    Email authentication
    Search words / Categorize words
    Add token verification to backend functions that require login (such as add and approve)
    User management dashboard for admin
    Potential expansion to the database may include the following fields: 

        synonyms
        masculine
        feminine
        plural
        isVerified
        verifiedBy
        verifiedAt
        addedBy
        addedAt
    
Commands:

    git clone https://github.com/yourusername/pashto-dictionary.git
    cd pashto-dictionary

    cd server
    npm install
    npm install cors
    node index.js

    cd client
    npm install
    npm install react-scripts@latest
    npm install bootstrap
    npm start


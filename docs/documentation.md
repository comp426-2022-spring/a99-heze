# Project Tructure
    ## data

        **databases**

            1. log.db: Maintains information access of our app

            2. survey.db: Maintains survey results of submited survey

    ## docs

        1. documentation.md: this file

        2. planning_notes.md: Contains our teams planning notes and roles

        3. user_notes: contains information we used to outline our project

    ## public

        #**html**
            1. index.html: our main webpage

            2. resources.html: our resources tab

            3. results.html: our results tab

            4. survey.html: our survey tab

        #**css**
            1. bootstrap.min.css: contains so styling we really liked
            2. style.css: contains our websites styles
        #**png**
            1. myHealthLogo.png: picture for our website

    ## src

        #**services**

            1. database.js: contains the code for the survey database code

            2. logdb.js: contains the code for the logdb database

        #**utils**

            1. util: has our helper functions to determine water intake and sleep

    ## server.js - contains our endpoints as well as server code

        1. /app/survey/ - POST - gets user information and then adds it to the database

        2. /app/results/ - GET - gets the user input and then runs it through our helper functions





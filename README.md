# National Park Note APP - Database Version - Client

All the information you need to know about your favorite National Parks in the United States in one easy to use APP. You can narrow down your <b>search by State and Activities</b>. Once your park(s) are located, you can see <b>more pictures</b> and/or <b>YouTube videos</b> for a particular park.

<p>This APP also allows the user to <b>create his/her own account</b>; Once logged in, beside the feature mentioned above, the user will be able to save a park's information to his/her account, rate it with a <b>rating number</b> and add <b>custom notes</b>. All the information will be stored in the APP and can be viewed later. The user can also sort the stored parks by using the following criteria: <b>Park Number, Park Name, Rating, State Name, and  Activity.</b>

# APP's Inspiration

The APP's inspiration came from my love of nature and the outdoors, and the unspoiled state of National Parks in the United States.

# APP's Features

* Select/Display Any National Parks by State.
* Further Narrow Down The Park With Your Choice of Activity.
* For Each Park, The APP Will Show a Feature Picture of The Park, The Park's Official Page Link, And Address. 
* Visually Explore Your Favorite Park With The 'More Picture' And 'Videos' Buttons.
* User Can Create His/Her Own Account Via The Registration Page
* User Can Log in to His/Her Own Account With A Password
* Logged-in User Can Save a Park to His/Her Account
* Logged-in User Can Add Note to His/Her Favorite Park
* Logged-in User Can Rate His/Her Favorite Park
* Logged-in User Can Sort His/Her Favorite Parks


# Live Demo link and User-Flow Diagram

- [Live Demo Link - Vercel](https://national-park-note-app-client.vercel.app/)

- [GitHub Code Link - Database Version - Client](https://github.com/davetam88/Nation-Park-Note-App-Client)

- [GitHub Code Link - Database Version - Server](https://github.com/davetam88/Nation-Park-Note-App-Server)

- [GitHub Code Link - Memory Store Version](https://github.com/davetam88/National-Park-Note-App)

- [User-Flow Diagram](src/images/readme/user-flow.jpg)

# Project Summary:

This <b>Capstone Project</b> converts the <b>National Park Note APP</b> [Memory Store Version](https://github.com/davetam88/National-Park-Note-App) which use memory as its data store into a persistence datastore version. These API endpoints were provided by [National Park Note APP - Server/API](https://github.com/davetam88/Nation-Park-Note-App-Server) with PostgreSQL as the database engine.

An online version of this client app hosted by [Vercel](https://vercel.com) can be launch [here](https://national-park-note-app-client.vercel.app/). The API endpoint server was deployed online and is hosted by [Heroku](https://heroku.com).


# APP's Screenshots

## Home page <<<
![home_page](src/images/readme/home_page.jpg)

## More picture page <<<
![more_picture_page](src/images/readme/more_picture_page.jpg)

## More video page <<<
![more_video_page](src/images/readme/more_video_page.jpg)

## Play video page - via YouTube API <<< 
![play_video_page](src/images/readme/play_video_page.jpg)

## About page <<<
![about_page](src/images/readme/about_page.jpg)

## Register for a new user account <<<
![Register_for_a_new_user_account](src/images/readme/register_for_a_new_user_account.jpg)

## Login as user 'Demo' <<<
![login_as_user_demo_page](src/images/readme/login_as_user_demo_page.jpg)

## User search park page <<<
![user_search_park_page](src/images/readme/user_search_park_page.jpg)

## User favorite park page <<<
![user_favorite_park_page](src/images/readme/user_favorite_park_page.jpg)

## User favorite parks sorted by park name <<<
![user_favorite_park_page_sort_by_park_name](src/images/readme/user_favorite_park_page_sort_by_park_name.jpg)

## User favorite parks sorted by rating <<<
![user_favorite_park_page_sort_by_rating](src/images/readme/user_favorite_park_page_sort_by_rating.jpg)

## User favorite parks sorted by state name <<<
![user_favorite_park_page_sort_by_state_name](src/images/readme/user_favorite_park_page_sort_by_state_name.jpg)

## 'New park' to be saved <<<
![new_park_to_be_saved](src/images/readme/new_park_to_be_saved.jpg)

## Add note page for the new park <<<
![add_note_page_for_the_new_park](src/images/readme/add_note_page_for_the_new_park.jpg)

## New park as shown at the 'user favorite park page' <<<
![user_favorite_park_page_with_new_park_saved](src/images/readme/user_favorite_park_page_with_new_park_saved.jpg)

## New park as shown at the 'search park page' <<<<
![new_park_at_the_user_search_park_page](src/images/readme/new_park_at_the_user_search_park_page.jpg)

## Park to be removed at favorite park page <<<
![park_to_be_removed_at_favorite_park_page](src/images/readme/park_to_be_removed_at_favorite_park_page.jpg)

## Favorite park page after the park was removed <<<
![park_was_removed_at_favorite_park_page](src/images/readme/park_was_removed_at_favorite_park_page.jpg)

## Removed park as shown on the search page <<<
![removed_park_as_shown_on_search_page](src/images/readme/removed_park_as_shown_on_search_page.jpg)


# Supported Endpoints:
    ENDPOINTS                             | FUNCTION
    --------------------------------------|----------------------------------------------------------
    GET /api/users                        | read all the user information in the database
    GET /api/users/id                     | Read a single user record indexed by the user id.
    GET /api/favparks                     | Read all the favparks stored in the database
    GET /api/favparks/id                  | Read a single favpark record indexed by the favpark id.
    GET /api/favparks/favparks-userid/id  | Returns all the favpark records saved by user id.
    DELETE /api/users/id                  | Delete a single user record indexed by the user id.
    DELETE /api/favparks/id               | Delete a single favpark record indexed by the favpark id.
    POST /api/user                        | Create a new user record
    POST /api/favpark                     | Create a new favpark record


# Built With
```
* HTML
* CSS
* React Router
* JavaScript
* ECMAScript 2015 - ES6
* Flexbox Layout
* 2 external APIs (YouTube and National Park Service)
* 1 custom API for App/client database access
* PostgresSQL used for persistence datastore
```

## Author

* David Tam - Full Stack Developer
* Contact - <davetam88@gmail.com> 



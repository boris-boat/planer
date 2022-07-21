

# ImaSve

## Live website 

https://imasve.co

## Instalation instructions 

npm install
npm start

## Note

App ,being hosted on Heroku, takes arround 15 sec to start up the backend so it may take some time to login or get info sometimes. 

## Description

imaSve is my biggest project made from scratch and is constantly being updated. It contains:

- ToDo application with filters, additions and deletions. Also the saying of the day
- News application with news from 4 different sites
- Tracker application with the ability to track expenses and send reports by mail
- Weather today as a modal that gets activated from the navbara
- Chat application with the possibility of making rooms
- Cookbook application with the ability to select certain ingredients and search for dishes by these parameters.
- Quiz app where you can choose how many rounds you wish to play and then get the score after the game with live validation of answers with css

## ToDo

- Technologies used: React, React-bootstrap, NodeJs, Express, MongoDB

A simple app that sends a fetch to mongoDb via input and useState hook and then writes / reads / deletes data. Quote works with quotable api.

## News

- Technologies used: React, React-bootstrap, NodeJs, Express, MongoDB, ParseRss

An app that extracts RSS feeds from 4 sites via backend and parseRss library then sends them to a frontend that displays them on one page.

## Expense Tracker

- Technologies used: React, React-bootstrap, NodeJs, Express, MongoDB, react-toastify, emailJs

Expense tracker stylized using bootstrap, CRUD operation using front and backend. A whole month data is displayed via pie chart and the option of sending emails with current values. Used toastify for notifications about sending emails and changing values.

## Vreme danas

- Technologies used: React, React-bootstrap

Modal that uses the openweather API and the current location extracted from the browser and shows the current values because the forecast requires more than a free account: D

## Chat
- Technologies used: React, React-bootstrap, socket-io

Real time chat application made using socket.io on the server as well as on the client side. Possibility of creating chat rooms. For now, there is no option to save messages, but it is planned to be implemented.

## CookBook

- Technologies used: React, React-bootstrap,

A cookbook application that finds the desired recipe via spoonacular api according to the ingredient input. The plan is to add the desired ingredients to the todo part of the application in the shopping list section.

## Torent tracker

- Technologies used: React, React-bootstrap,torrent-search-api

Simple api call to different torrent tracking sites and the results are being displayed in a table.

## Quiz

-- Technologies used: React, React-bootstrap,quiz api,material ui

A quiz app designed for simplicity.Pick how many rounds you wish to play and enjoy.

## How to use

Create an account on the home page and all the resources are at your disposal.

## Future plans

- Adding ingredients from the cookbook to the shopping list in the todo part
- Automatic reset of the tracker component to 0 at the end of the month
- saving messages and the ability to continue conversations in the chat application

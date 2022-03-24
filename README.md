<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge

## How to run

1.  Create a file called .env which content matches .env.example and set up the variables values (if you don't have access to that, please, contact the responsibles for this project).
2.  Run `npm install` or `yarn install` to install all dependencies.
3.  Run `npm start` or `yarn start` to run the app locally.
4.  You can find the project running on `localhost:3000`.

# Developer notes

First of all I had a very good time working on this project. It was awesome and inspirating to do. So, thank you!

## Considerations

- The logic I used to create the calendar turned easy to make the secondary objective of extending the calendar to any date.
- I decided to refactor the existent boilerplate to typescript and work with it because I find it to be very reliable and like to work with it.
- Google autocomplete was very useful in order to get `administrative_area_level_2` (city name) and `lat/lng`.
- I added 2 buttons on the top of the calendar, one to select today and the other one to wipe the redux state.

## Challenges

- The first challenge was the logic to implement the calendar filling, and I did it by taking the number `N` of the weekday of the first month day and subtracting `N` days from the first month day. After this I created a loop to run `42` times (6 weeks \* 7 days) and fill every day in a array. On each day I saved it's date and it's reminders.
- Another challenge was before adding fetchs to the weather API. Every time calendar re-rendered all rendered reminders weathers was re-fetched. If I had left this way, my bill on Visual Crossing account would explode after a few minutes using the application. So I used redux toolkit query, it have a Cache system that don't let useless refetchs occur.

## Tests

- I focused on testing the most important and sensitive parts of this project first. Like the core functions on `utils/dates` and the `calendar-slice.tsx` which are the ones that make the application works.

## Important External Libs

- **mui/material:** for UI components to turn components creation quick and easy.
- **redux toolkit:** as a state management tool. It's very easy to understand/mantain.
- **redux-persist:** a very good lib to keep states.
- **date-fns:** a very modern/easy way to deal with dates.
- **uuid:** to give a unique ID for any created reminder on state.
- **use-places-autocomplete:** to use google autocomplete easier.

## External API's

- **Google API:** to get places autocomplete and lat lng.
- **Visual Crossing's weather API:** I opted for this one because I could use lag/ln or city name to get weather data.

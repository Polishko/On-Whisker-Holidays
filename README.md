# My Project for the SoftUni June 2024 React Course

## Prerequisites

- Download the code.
- Install Node.js and npm.
- Install dependencies: `npm install`
- Start the server: `npm run server`
- Start development: `npm run dev`
- This app is partially responsive in terms of design but is best viewed on computers with a screen resolution of 1920x1080.

![Screenshot of My App](https://github.com/Polishko/On-Whisker-Holidays/blob/main/assets/main-app.JPG)

## Live Demo

For the best experience, please install and run the app locally.

Alternatively, you can view a live demo of this project [here](https://on-whisker-holidays-1db1d0811f86.herokuapp.com). Please note that registration on the live demo is currently under maintenance. However, you can log in using the following credentials to experience the app as an authenticated user:

- **Email:** kaju@kaju.com
- **Password:** kaju

## Short Introduction

A webpage where you can find information on hotels from different parts of the world (currently focused on a few European countries) that allow pets. The hotels are listed alphabetically by country. All users can filter hotels based on search criteria (such as wi-fi, beach, nature, city, etc.) by entering keywords in the search bar.

For more detailed information on each hotel, including an image, rating, short description, facilities (e.g., pool, wi-fi, parking), current local temperature, and web page address, users can click on each hotel in the list. Additionally, users can search for hotels on an interactive map, which centers based on the user's location (if supported by the browser) when a hotel is not selected.

Registering and logging in as an authenticated user allows users to add comments about a hotel, rate the hotel, as well as edit and delete their own comments. They can also change their avatar for their profile.

## General project structure

- Dynamic pages
  - /hotels: Dynamically displays a list of hotels based on search queries using query parameters. The displayed hotel list is sorted alphabetically by country. A search bar allows users to enter queries and filter the hotel list. Since the mock back-end supports filtering based on any keywords (rather than all keywords), the filtering is performed on the client side to ensure the search reflects all entered keywords.

  - /hotels/:id: Displays specific details for a hotel based on the dynamic id parameter. If a search query was entered by the user, it retains this query, preserving the current search criteria and providing a better user experience.

  - /map: A zoomable map that utilizes React Leaflet functionality. It dynamically updates and centers based on the user's location (if supported by the browser) or the selected hotel position (if a hotel is selected); otherwise, it centers on a default position. Interacting with specific hotels marked on the map displays a pop-up with a brief hotel description and allows navigation to the more detailed /hotels/:id route.

  - /profile: This page, accessible only to logged-in users, displays personalized information such as the user's name and avatar. It also provides a form that allows users to change their avatar.

- Static pages
  - Home page: The welcoming page that provides a basic introduction and navigation to the main app.
  - /about: A brief introduction to the purpose and source of inspiration for the app.
  - /login: A login form for registered users to log in.
  - /register: A registration form for new users to sign up.

## Public and Private Parts

- **Private and Guarded Routes**:
  - The `/profile` route, which allows users to update their information, is protected against access by unauthorized users. In addition, each time users interact with parts of the app that require authentication, token validity is checked by a custom hook. If the token is expired, users are logged out and redirected to the login page.
  - Access to the `/login` and `/register` pages is restricted to users who are not authenticated.
  - Direct access to these protected routes by typing the address in the URL bar is also restricted.

- **Public Part**: All users can access the hotel list, view detailed information about each hotel, read comments from all users, and see average hotel ratings. They can also view weather information for the hotel's locality and interact with the map page.

- **Private Part**: Authenticated users can change their avatars. They can also add comments about a hotel, rate a hotel, and edit or delete their own comments. Users are allowed to rate each hotel only once.

## The Back-end

The back-end uses JSON Server as a mock API, and the JSON Server Auth extension is used for authentication purposes. JSON Server Auth provides a simple way to add JWT-based authentication to JSON Server. In this project, authentication is handled through the `POST /register` and `POST /login` routes. Both user login and editing data (sending PUT requests) require a valid token, which is included in the headers of authenticated requests. JSON Server Auth also provides guarded routes, such as the `/664/*` route, which restricts access based on the user's role. For more details, please check the [npm documentation](https://www.npmjs.com/package/json-server-auth).

In the application, users create records (comments) and interact with the REST API. They can edit and delete their own comments, rate hotels, and the authentication ensures that these actions are secure and tied to the logged-in user's account.

## Error Handling and Data Validation

- **Formik Validation**: Formik is used for validating the login and registration forms, ensuring that user inputs meet the required criteria before submission.
- **Custom Validation**: Custom validation logic is implemented for actions like adding, editing, and deleting comments. This includes limiting the number of characters in comments, warning users if the comment has not changed, alerting if an avatar is not selected or changed, and validating password entries.
- **Error Handling**: `try-catch` blocks are utilized throughout the application to handle errors gracefully, providing feedback to the user when something goes wrong.

## Some Other Main Functionalities and Implementation of Programming Concepts

- **State Management with Context API and Redux**: The application uses the Context API (AuthContext, UsersContext, HotelsContext, CommentsContext, and RatingsContext) in combination with 'useReducer' to manage general state, particularly for handling data affected by REST requests. These contexts help manage authentication status (e.g., isAuthenticated), error handling during requests, and data collection.

  - **RatingContext**: Specifically, RatingContext was implemented as a separate collection to handle hotel ratings. This decision was made because JSON Server Auth requires a password for editing data. Implementing hotel ratings as part of the hotel information would require users to enter their password each time they rate a hotel, which would not provide a good user experience. By using a separate collection, ratings can be managed independently without requiring frequent password entries.

- **Component-Level State Management**: In addition to global state management, individual components manage their own state for specific tasks. For example, the HotelList component preserves the scroller position based on the last clicked hotel item.

- **Custom React Hooks**: Custom hooks are used to encapsulate and manage complex logic. For instance:
  - `useAuth`: Checks token validity and manages authentication flows.
  - `useModal`: Simplifies modal management logic, making it easier to handle multiple modals with complex interactions.

- **Stateless and Stateful Components**: The application utilizes both stateless and stateful components:
  - **Stateless components**: These components rely on props passed from parent components and do not manage their own state. They are primarily used for rendering UI elements based on the data provided.
  - **Stateful components**: These components manage their own state internally. Examples include components that handle forms, manage local UI state, or control the behavior of dynamic elements like modals or search results.

- **Bound Forms**: The forms in the application, such as those for login, registration, and comment management, are bound to state using controlled components. This allows for real-time validation, user feedback, and the ability to handle form submissions efficiently.

- **Synthetic Events**: The application leverages React's synthetic event system to handle user interactions like clicks, form submissions, and other DOM events. This system provides cross-browser compatibility and a consistent API for managing events within components.

- **Component Lifecycle (Mount, Update, Unmount)**: The application makes use of React's component lifecycle methods and hooks:
  - **Mount**: Components initialize state and perform initial data fetching when they first render.
  - **Update**: Components respond to state or prop changes to update the UI dynamically, such as re-fetching data or re-rendering elements based on user actions.
  - **Unmount**: Cleanup logic: Aborting fetch requests.

## Planned Potential Improvements
- Prevent the behavior of a previous modal closing upon opening a new one during the process of managing all modals' state with a single `useModal` hook.
- Learn and apply more advanced state management tools (such as Redux and React Query) to better manage state, reduce complexity, and improve code readability.
- Incorporate a real server.
- Add page forward and back functionality for the comments list.
- Add hotel-adding functionality for authenticated users.
- Testing.

## Credits
- I'm thankful to Elena K., Umit, Justina, and Ausun Oncu for providing some of the pictures taken during their holidays with their beloved animal friends.
- I would like to thank <a href="https://www.linkedin.com/in/tanya-dimitrova-vd/">Tanya Dimitrova</a> for helping me format my logo, and Elena K. for making recommendations about my design theme.
- I would like to thank my spouse, Genc Oncu, for suggesting possible edge cases to test.
- Logo design based on <a href="https://www.canva.com/">Canva templates</a>.
- The source for the image used for the Hotel Lermontovskyi hotel card is Unsplash: Photo by <a href="https://unsplash.com/@chervinska?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anastasiya Chervinska</a> on <a href="https://unsplash.com/photos/a-woman-standing-on-top-of-a-sandy-beach-next-to-a-black-dog-1CQGY-4xnGE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the image used for the Apartmentos Calypso hotel card is Unsplash: Photo by <a href="https://unsplash.com/@salvadorgodoyladrero?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Salvador Godoy</a> on <a href="https://unsplash.com/photos/white-and-black-road-bike-parked-on-brown-wooden-pathway-during-daytime-HaDkUSQqHKc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the vacation placeholder image displayed when no hotels are selected yet: Photo by <a href="https://unsplash.com/@zhenhappy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">PAN XIAOZHEN</a> on <a href="https://unsplash.com/photos/body-of-water-in-beach-qZtSuZvdob0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The main app - hotel list layout design and homepage layout, as well as ideas on using the map and the weather API, are based on samples from <a href="https://www.udemy.com/course/the-ultimate-react-course/">Jonas Schmedtmann's Ultimate React Course on Udemy</a>.
- The customizable StarRating component is adapted from Jonas Schmedtmann's [<a href="https://www.github.com/jonasschmedtmann">@jonasschmedtmann</a>] UsePopcorn App.
- The paw png (used for the star rating component) path source is: https://github.com/tailwindlabs/heroicons/issues/140.

# 🚀 SoftUni June 2024 React Final Project

## 💻 Prerequisites

- Download the code.
- Install Node.js and npm.
- Install dependencies: `npm install`
- Start the server: `npm run server`
- Start development: `npm run dev`
- This app is responsive and has been designed for viewing on screens with a minimum width of 320px.
  Recommended Browsers: Chrome, Microsoft Edge

![Screenshot of My App](https://github.com/Polishko/On-Whisker-Holidays/blob/main/assets/main-app.JPG)

## 📝 Short Introduction

A webpage where you can find information on hotels from different parts of the world (currently focused on a few European countries) that allow pets. The hotels are listed alphabetically by country. All users can filter hotels based on search criteria (such as wi-fi, beach, nature, city, etc.) by entering keywords in the search bar.

For more detailed information on each hotel, including an image, rating, short description, facilities (e.g., pool, wi-fi, parking), current local temperature, and web page address, users can click on each hotel in the list. Additionally, users can search for hotels on an interactive map, which centers based on the user's location (if supported by the browser) when a hotel is not selected.

Registering and logging in as an authenticated user allows users to add comments about a hotel, rate the hotel, as well as edit and delete their own comments. They can also change their avatar for their profile.

## 🔗 Live Demo

For the best experience, please install and run the app locally.

~~Alternatively, you can view a live demo of this project [here](https://react-final-project-65e2e7c5597c.herokuapp.com/.).~~

The live demo is not available for now. Please see the screenshots below for visual orientation.

## 🖼️  Screenshots

- Homepage
  ![image](https://github.com/user-attachments/assets/1aafadad-ec2f-4d0c-970a-8d90c2bacb7c)

- Public app main page with hotel list, hotel item details including local temperature, global search query to filter the hotels based on facilities, comments from other users/visitors
  ![image](https://github.com/user-attachments/assets/98093833-2e3f-4c2d-b2fb-9bc5ccb9f3f1)

- Persisted hotel list scroller behavior for a better user experience
![image](https://github.com/user-attachments/assets/fbb30cd1-d930-4d9b-8e41-674cfced9ac2)

- Zoomable map search page linked with the hotels page
 ![image](https://github.com/user-attachments/assets/70b9276d-9f11-4280-983d-b248b1d89130)

- Registration and login pages combining server-side error handling and front-end error handling using React Hook Form
  ![image](https://github.com/user-attachments/assets/84c96f74-fa27-499a-9ac8-9464b9077246)
  ![image](https://github.com/user-attachments/assets/2204fd7a-9433-47c5-95d5-85e7d1467182)

- Extra functionalities for authenticated users: Add, delete, edit comments; rate hotels; edit avatar
  ![image](https://github.com/user-attachments/assets/78ad53de-a85d-4f6a-a86b-0e6fd7782072)
  ![image](https://github.com/user-attachments/assets/e6f6bdc4-a48c-4d84-8b7b-313f9e2ff49d)
  ![image](https://github.com/user-attachments/assets/e0ba994b-51fc-4447-b323-d45083e11eb5)

- Page not found
  
  ![image](https://github.com/user-attachments/assets/bee20e42-cdb1-46c3-b0be-c25a288fcda0)

- Responsive design
  
  ![image](https://github.com/user-attachments/assets/bbba64e5-d2d3-4784-871f-cd65190ad5e2)


## 📂 General project structure

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

## 🌍/🔒 Public and Private Parts

- **Private and Guest Routes**:
  - The `/profile` route, which allows users to update their information, is protected against access by unauthorized users. In addition, each time users interact with parts of the app that require authentication, token validity is checked by a custom hook. If the token is expired, users are logged out and redirected to the login page.
  - Access to the `/login` and `/register` pages is restricted to users who are not authenticated.
  - Direct access to these protected routes by typing the address in the URL bar is also restricted.

- **Public Part**: All users can access the hotel list, view detailed information about each hotel, read comments from all users, and see average hotel ratings. They can also view weather information for the hotel's locality and interact with the map page.

- **Private Part**: Authenticated users can change their avatars. They can also add comments about a hotel, rate a hotel, and edit or delete their own comments. Users are allowed to rate each hotel only once.

## 🖥️ Back-End

The back-end uses JSON Server as a mock API, and the JSON Server Auth extension is used for authentication purposes. JSON Server Auth provides a simple way to add JWT-based authentication to JSON Server. In this project, authentication is handled through the `POST /register` and `POST /login` routes. Both user login and editing data (sending PUT requests) require a valid token, which is included in the headers of authenticated requests. JSON Server Auth also provides guarded routes, such as the `/664/*` route, which restricts access based on the user's role. For more details, please check the [npm documentation](https://www.npmjs.com/package/json-server-auth).

In the application, users create records (comments) and interact with the REST API. They can edit and delete their own comments, rate hotels, and the authentication ensures that these actions are secure and tied to the logged-in user's account.

## 🌐 Services and External APIs
This project uses the flagcdn.com service, which hosts flag images, for the conversion of country code symbols to flags. The Open-Meteo API is used to fetch real-time weather data based on latitude and longitude.

## ❗ Error Handling and ✅ Data Validation

- **React Hook Form Validation**: `react-hook-form` is used for validating the login and registration forms, ensuring that user inputs meet the required criteria before submission.
- **Custom Validation**: Custom validation logic is implemented for actions like adding, editing, and deleting comments. This includes limiting the number of characters in comments, warning users if the comment has not changed, alerting if an avatar is not selected or changed, and validating password entries.
- **Error Handling**: `try-catch` blocks are utilized throughout the application to handle errors gracefully, providing feedback to the user when something goes wrong.

## ✨ Other Main Functionalities and Implementation of Programming Concepts

- **State Management with Context API and Redux**: The application uses the Context API (e.g., AuthContext, UsersContext, HotelsContext, CommentsContext, RatingsContext) along with the useReducer hook to manage global state effectively. This setup is particularly useful for handling data affected by REST API requests, managing authentication status (e.g., isAuthenticated), handling errors during requests, and collecting data.
- **Scroll Position Tracking**: The application implements scroll position tracking for the hotel list using useRef and local storage. When a user clicks on a hotel item, its position is stored. This position is then used to maintain the scroll position when navigating back to the list. If no item is clicked, the stored position in local storage is cleared.
- **Global Query Handling**: The application remembers the search query across navigation between hotel items. The query is provided using Context API for global query management and the URL is syncronized accordingly on the paths that lead to the AppLayout and HotelItem components. This centralizes query state management and makes it more consistent across the application.
- **Interactive Map Integration**: The application integrates an interactive map using React Leaflet. The map dynamically updates and centers based on the user's location or selected hotel, providing an enhanced user experience for location-based searches.
- **Custom Hooks for Reusable Logic**: The project implements custom hooks (e.g., useKey, useModal, useFilter, useUrlPosition) to encapsulate reusable logic, such as handling keyboard shortcuts, managing modals, filtering lists, and managing URL positions.
- **Performance Optimization with useCallback**: The application uses useCallback to optimize performance by memoizing some callback functions, preventing unnecessary re-renders and ensuring efficient data handling.

## 🧪 Testing
This project includes basic tests for simple components to ensure accurate rendering behavior based on props, children, and routing. The tests cover:

Component Rendering: Verifying that components render the correct content based on the props provided.
Routing Behavior: Ensuring that components behave correctly under different routing scenarios.
Event Handling: Checking that event handlers (e.g., onClick, onChange) are called appropriately and perform the expected actions.
The tests do not cover state management or dynamic state changes but focus on static rendering and interaction behavior.

To run the tests, use: `npx vitest run`

## 💡 Potential Improvements
- Apply more advanced state management tools (such as Redux and React Query) to better manage state, reduce complexity, and improve code readability.
- Incorporate a real server.
- Add page forward and back functionality for the comments list.
- Add hotel-adding functionality for authenticated users.
- Add a "hotels to visit" list for logged-in users.

## 🎉 Credits
- I'm thankful to Elena K., Umit, Justina, and Aysun Oncu for providing some of the pictures taken during their holidays with their beloved animal friends.
- I would like to thank <a href="https://www.linkedin.com/in/tanya-dimitrova-vd/">Tanya Dimitrova</a> for helping me format my logo, and Elena K. for making recommendations about my design theme colors.
- I would like to thank my spouse, Genc Oncu, for suggesting possible edge cases to test.
- Logo design based on <a href="https://www.canva.com/">Canva templates</a>.
- The source for the image used for the Hotel Lermontovskyi hotel card is Unsplash: Photo by <a href="https://unsplash.com/@chervinska?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anastasiya Chervinska</a> on <a href="https://unsplash.com/photos/a-woman-standing-on-top-of-a-sandy-beach-next-to-a-black-dog-1CQGY-4xnGE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the image used for the Apartmentos Calypso hotel card is Unsplash: Photo by <a href="https://unsplash.com/@salvadorgodoyladrero?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Salvador Godoy</a> on <a href="https://unsplash.com/photos/white-and-black-road-bike-parked-on-brown-wooden-pathway-during-daytime-HaDkUSQqHKc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the vacation placeholder image displayed when no hotels are selected yet: Photo by <a href="https://unsplash.com/@zhenhappy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">PAN XIAOZHEN</a> on <a href="https://unsplash.com/photos/body-of-water-in-beach-qZtSuZvdob0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The main app - hotel list layout design and homepage layout, as well as ideas on using the map and the weather API, are based on samples from <a href="https://www.udemy.com/course/the-ultimate-react-course/">Jonas Schmedtmann's Ultimate React Course on Udemy</a>.
- The customizable StarRating component is adapted from Jonas Schmedtmann's [<a href="https://www.github.com/jonasschmedtmann">@jonasschmedtmann</a>] UsePopcorn App.
- The paw png (used for the star rating component) path source is: https://github.com/tailwindlabs/heroicons/issues/140.

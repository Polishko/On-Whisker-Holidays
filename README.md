# My Project for the SoftUni June 2024 React Course

## Prerequisites
- Download the code.
- Install Node.js and npm.
- Install dependencies: `npm install`
- Start the server: `npm run server`
- Start development: `npm run dev`
- This app is partially responsive in terms of design but is best viewed on computers with a screen resolution above 1800px.

![Screenshot of My App](https://github.com/Polishko/On-Whisker-Holidays/raw/main/assets/main-app.JPG)


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

## Back-end
The back-end uses JSON Server as a mock API, and the JSON Server Auth extension is used for authentication purposes. This tool provides a JWT-based authentication flow, and the route used for this purpose in the project is `POST /users`. Both user login and editing data/sending PUT requests require providing a password and an email in the headers. The tool also provides guarded routes, such as the `/664/*` route used in this project. For more details, please check the <a href="https://www.npmjs.com/package/json-server-auth">npm documentation</a>.

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

## Planned Potential Improvements
- Prevent the behavior of a previous modal closing upon opening a new one during the process of managing all modals' state with a single `useModal` hook.
- Learn and apply more advanced state management tools (such as Redux and React Query) to better manage state, reduce complexity, and improve code readability.
- Incorporate a real server.
- Add page forward and back functionality for the comments list.
- Add hotel-adding functionality for authenticated users.
- Testing.

## TODO
More details

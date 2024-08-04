# My Project for the SoftUni June 2024 React Course.

## Prerequisites
- Download the Code.
- Have installed Node.js and npm.
- Install Dependencies: npm install
- Start the Server: npm run server
- Start Development: npm run dev

## Short introduction
A webpage where you can find information on hotels from different parts of the world (for now from few European countries) that allow pets. The hotels are listed in an alphabetical order based on country. All users can also filter based on search criteria (such as wi-fi, beach, nature, city etc) by entering keywords in the search bar. For more detailed information on each hotel, including an image, rating, short description, facilities (i.e pool, wi-fy, parking), current local temperature, and web-page address users can click on each hotel in the list. In addition they can also search for hotels on an interactive map which is centered based on user location (if supported by browser) when a hotel is not selected. Registering and logging as an authenticatd user allows users to add comments about a hotel, rate the hotel, as well as to edit and delete their own comments. They can also change their avatar for their profile.

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

## Back-end
The back-end: JSON Server is used as a mock API and the JSON Server Auth extension is used for authentication purposes. This tool provides a JWT based authentication flow and the route that was used for this purpose in the project is POST /users. Both user Login as well as editing data/sending PUT requests requires providing a password and an email in the headers. The tool also provides guarded routes such as the /664/* route used in this project. For more details please check the <a href="https://www.npmjs.com/package/json-server-auth">npm documentation</a>.   

## Credential information
You can register in order to access functionalities such as adding, editing and deleting comments as well as editing your user avatar.

## Credits
- I'm thankful to Elena K., Umit and Justina, and Ausun Oncu for providing me some pictures taken from their holidays with their belowed animal friends.
- I would like to thank <a href="https://www.linkedin.com/in/tanya-dimitrova-vd/">Tanya Dimitrova</a>, for helping me format my logo and Elena K., for making recommendations about my design theme.
- I would like to thank my spouce Genc Oncu, for suggesting possible edge cases to test.
- Logo design based on <a href="https://www.canva.com/">Canva templates</a>.
- The source for the image used for the Hotel Lermontovskyi hotel card is Upslash: Photo by <a href="https://unsplash.com/@chervinska?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Anastasiya Chervinska</a> on <a href="https://unsplash.com/photos/a-woman-standing-on-top-of-a-sandy-beach-next-to-a-black-dog-1CQGY-4xnGE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the image used for the Apartmentos Calypso hotel card is Upslash: Photo by <a href="https://unsplash.com/@salvadorgodoyladrero?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Salvador Godoy</a> on <a href="https://unsplash.com/photos/white-and-black-road-bike-parked-on-brown-wooden-pathway-during-daytime-HaDkUSQqHKc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The source for the vacation placeholder image displayed when no hotels are selected yet: Photo by <a href="https://unsplash.com/@zhenhappy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">PAN XIAOZHEN</a> on <a href="https://unsplash.com/photos/body-of-water-in-beach-qZtSuZvdob0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
- The main app - hotel list layout design and homepage layout as well as ideas on using the map and the weather API are based on samples from <a href="https://www.udemy.com/course/the-ultimate-react-course/">Jonas Schmedtmann's Ultimate React Course in Udemy</a>.
- The customizable StartRating component is adapted from Jonas Schmedtmann's [<a href="https://www.github.com/jonasschmedtmann">@jonasschmedtmann</a>] UsePopcorn App.
- The paw png path source is: https://github.com/tailwindlabs/heroicons/issues/140
- The curvy css design in the About page is adapted from Jessika Aiskel's <a href="https://codepen.io/myjessijess/pen/MWWgMwL">Fancy border radius theme on CodePen</a>.

## Planned improvements
- Prevent the behavior of a previous modal closing upon opening a new one during the process of managing all modals' state with a single useModal hook.
- Learn and apply more advanced state management tools (such as Redux and React Query) to better manage state and reduce complexity and improve code readability.
- Remember the user's last search query upon navigating to an individual hotel card, so that the user is able to see their last search results in the left pane hotel list, without having to navigate back.
- Incorporate a real server.
- Add page forward and back functionality for the comments list.
- Add hotel adding functionality for authenticated users.
- Testing.

## TODO
More details

## My Project for the SoftUni June 2024 React Course.

## Prerequisites
- Download the Code.
- Have installed Node.js and npm.
- Install Dependencies: npm install
- Start the Server: npm run server
- Start Development: npm run dev

## Short introduction
A webpage where you can find information on hotels that allow pets. Hotels are listed in alphabetical order based on country. You can also filter based on search criteria (such as wi-fi, beach, nature, city etc) by entering keywords in the search bar. For more detailed information on each hotel, including an image, rating, short description, facilities (i.e pool, wi-fy, parking), current local temperature, and web-page address click on each hotel in the list. You can also search for hotels on an interactive map. Registering and logging as an authenticatd user will allow you to add comments about a hotel, rate the hotel as well as edit and delete cour comments. You can also change your avatar for your profile.

## Back-end
The back-end: JSON Server is used as a mock API with JSON Server Auth extension used for authentication purposes. This tool provides a JWT based authentication flow and the route that was used for this purpose in the project is POST /users. Both user Login as well as editing data/sending PUT requests requires providing a password and an email in the headers. The tool also provides guarded routes such as the /664/* used in this project. For more details please check the <a href="https://www.npmjs.com/package/json-server-auth">npm documentation</a>.   

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
- Error boundaries.
- Testing.

## TODO
More details

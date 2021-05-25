# mpamurao.github.io
<h2>Per Scholas Bootcamp Projects</h2>

<h4>Mid-Mod Project 2 - Food Recipe App</h4>

<b>Technologies:</b> Javascript, React, HTML, CSS & Material-UI, Edamam API <br>
<b>Github Pages:</b> https://mpamurao.github.io/mid-mod-2_React_Food_App/ <br>

<h4>Food application: Dish It Out</h4>

This food app is called Dish It Out. Dish It Out allows users to search for a food ingredient, meal name, or cuisine type and receive corresponding results in a list. Each recipe can be clicked on and led to an external site that contains detailed info on how to make the dish. As a user interested in finding a new recipe with an easy to use layout, or who just wants to scroll through a lot of food pics, this is a nice simple site! <br>

<h4>Background Approach</h4>

I wanted to reinforce my knowledge of querying an API. Since there were several food APIs available, and I love food myself, I decided to follow the food theme. I styled my site similarly to the Google Homepage and Pinterest lists as these formats look clean and easy to engage. <br>

As the API has a limit of 10,000 calls/month, I copied over an initial data set into dummydata.js for testing purposes. The code can also do live queries instead of using the dummydata.

App.js contains a BrowserRouter and routes for a Homepage, a list of "recommended" Recipes, and Searched Recipes. The user starts at the Homepage which contains a Nav Bar that re-directs back to the Homepage and also to the recommended Recipes. The user can generate a list of dishes by either inputting a specified word or clickling the "Indecisive and Hungry" button to randomly generate a search. The Indecisive button references the recipeTypes.js file which contains an array of keywords the API uses to determine results.

RecipeSearch.jsx takes the input and sends a query to the Edamam API. After, the results are mapped out and Recipe.jsx populates the DOM with Grid items stylized using Material-UI. 

RecipesList.jsx is similar to RecipeSearch where it sends queries to the API. This is a pre-defined list that retrieves results for Lunch, Dinner, Snack, and Teatime meals.

Header.jsx contains the page name, SearchBar and NavBar components. These components are sticky positioned to the top of the browser.

<h4>Problems and Potential Improvements</h4>

The app works as intended with no known bugs when running via the virtual DOM. While the API contains a lot of info about dishes such as nutrients, I focused on providing basic details. Currently, there is a set number of results that are populated, whereas the total count in the database can be much larger. I'd like to be able to add a "next" button to show the next list of items. I'd also like to use more Material-UI to better enhance the web design.

I need a better understanding of how to deploy a React App to Github Pages. The GH Page URL is currently the main domain name for this project instead of githubpages.io/Mid-Mod2 and I'm unsure how to fix it. I also had to change the gh-pages branch to view the project on GH Pages. Since I'm using BrowserRouter and call a reload in the SearchBar, I receive a 404 error. I could restructure my code so my search state is in the main components instead of SearchBar, but I would need to think about how to not make the same search code repetitive.




<b>Wireframe:</b>

![food_app](https://user-images.githubusercontent.com/59937690/117773192-0518ee80-b206-11eb-8124-4b8127bd1d57.png)

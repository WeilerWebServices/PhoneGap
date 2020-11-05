# Lesson 5 - Results View Part 1

The **Results** view is presented when search results are returned. It displays a message showing the number of results returned and a grid to display the images. It also includes infinite scrolling and a preloader component to display while the results are fetched.

![](./images/results-phone.png)

The **Results** view is a little trickier to code since it's dynamically built based on which view a user is coming from. It's the view returned with the results from the main search, but it's also used to show the results from the **Details** page when a user clicks the **Category**, **Created by** or **FIND SIMILAR** link on the image details. Those links are outlined in red in the screenshot below:

![](./images/details-results-routes.png)

An example of what will be returned by clicking these links is shown in this animated image:

![](./images/vids/stockpile-details.gif)

> Notice how the message displayed with the results changes depending on which you clicked, indicated either the category, creator or that it's a *similar* result. You will code this message in this lesson and move on to part 2 to add the images grid.

## Renaming & Routing Updates

1. Rename the existing `~src/components/pages/About.vue` to `Results.vue`.
1. Update the routing for this app to load the `Results` component instead of the `About` component.

    Open `~src/routes.js` and replace the import of `About` with `Results`, for example:

    ```javascript
      import Search from './components/pages/Search';
      import Results from './components/pages/Results';
    ```

    Next, replace the `path` currently set to `'/about/'` to the following `path` with a component name of `Results`:

    ```javascript
      {
        path: '/results/:filter/:limit/:q/:referrer',
        component: Results
      },
    ```

    > **Dynamic Routing:** This path uses the [dynamic route matching by pattern in Framework7]( http://framework7.io/vue/navigation-router.html#dynamic-route-matching), so when the above path pattern is found in a URL, the router will load the `Results` component and pass the 4 dynamic variables (`filter`, `limit`, `q` and `referrer`) with their actual values in the URL.  For example: `http://localhost:8080/#!//results/words/60/cat/search` could be a resulting URL, where *words* is the `filter`, *60* is the `limit`, *cat* is the `q` (query) and *search* is the `referrer`. Once you complete the next lesson you will see how the browser URL is dynamically changed with new values each time a new search is executed.

1. You will also need to update the side menu for this step to remove the `About` list item completely, since this results page will be loaded dynamically based on search results and never from the side menu.

    Open `~src/components/LeftPanel.vue` and remove the whole `<f7-list-item ../>` element for the `/about/` link:

    ```html
      <f7-list-item
          link="/about/"
          title="About"
          link-view="#main-view"
          link-reload
          link-close-panel
      />
    ```

## Implement the UI

1. In `Results.vue`, change the page name from **about** to **results**:

    ```html
      <f7-page name="results">
    ```

1. Replace the entire `<f7-navbar .../>` block with the following navbar. This new navbar binds the [`back-link`]( http://framework7.io/vue/navigation-router.html#dynamic-route-matching) attribute to a computed property returning a label that was dynamically set based on where the results page was routed from. You'll see this label next to the back arrow icon on the results page. You will code this `backLink` computed property shortly:

    ```html
      <f7-navbar sliding :back-link="backLink" title="Results"></f7-navbar>
    ```

1. Replace the `<f7-block-title>` contents with:

    ```html
      <f7-block-title v-if="results">{{ imagesReturned }}</f7-block-title>
    ```

1. Remove this `<f7-block ../>` component completely:

    ```html
      <f7-block inner>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio est aliquam officiis quaerat placeat, cum explicabo magni
              soluta totam maxime autem minima accusamus eos suscipit dignissimos
              corporis modi voluptatum fugiat!
      </f7-block>
    ```

1. Remove the following `<f7-list/>` component completely:

    ```html
      <f7-list>
          <f7-list-item link="/about/another/" title="Another Page"></f7-list-item>
      </f7-list>
    ```

### Add JavaScript Handling

Now locate the the `<script>` tag that holds the JavaScript `export` block since you will be working in that section for the following steps.

1. Rename this component by changing the name `About` to `Results`:

    ```javascript
      export default {
          name: 'Results',
          ...
      }
    ```

1. In the `data` object, remove the current `title` property, then add an `images` property to contain an array to use in the global store and a `results` variable to manage if results were returned:

    ```javascript
      data () {
        return {
          images: [],
          results: true
        };
      },
    ```

1. After the `data` object, insert a new `computed` property block:

    ```javascript
      computed: {
      }
    ```

1. In this new `computed` block, define a `backLink` property to determine which label to use with the back icon based on the route:

    ```javascript
      computed: {
        backLink () {
          // back link label for iOS
          const { referrer } = this.$route.params;
          return referrer === 'details' ? 'Details' : 'Search';
        }
      }
    ```

    > **Route Parameters:** The `this.$route.params` variable provides access to the [Framework7 route parameters](http://framework7.io/vue/navigation-router.html#dynamic-route-matching) that were passed in when the Results page was loaded. As a reminder, in the **Renaming & Routing Updates** section above you defined a `path` for the Results page as `path: '/results/:filter/:limit/:q/:referrer'`. The `referrer` is one of those parameters that is checked now to determine what label to return for the back button. Also, to make it more clear, if you viewed the value of `this.$route.params` in the [Vue Devtools](https://github.com/vuejs/vue-devtools) you would see each of the name:value pairs set as shown below:

    ![](./images/route-params.png)

    See the [Framework7 Dynamic Route Matching docs](http://framework7.io/vue/navigation-router.html#dynamic-route-matching) for more details.

    > This label only shows on iOS. On Android you will only see the page title that you're currently on, not this previous page label too.

1. Next, define the `imagesReturned` computed property for the UI to dynamically display the number of results returned:

    ```javascript
      computed: {
          ...,
          imagesReturned () {
            // build the string to display for the number of results
            const { q } = this;
            const { filter } = this.$route.params;
            let message = 'Loading results...';
            if (!this.images.length) return message;
            // wait for something to be returned
            switch (filter) {
              case 'similar':
                message = `${this.totalReturned} similar results to ${q}`;
                break;
              case 'creator_id':
                const [ img ] = this.images;
                message = `${this.totalReturned} results for ${img.creator_name}`;
                break;
              default:
                message = `${this.totalReturned} results for "${q}"`;
            }
            return message;
          }
      }
    ```

    > Since this view is shown from both the main search page and links on the details view, a different message is shown depending on the type of search performed (by keyword, category, similar etc). A `filter` value from the route parameters is checked to determine which message to display. This value is set to 'words' to indicate a search by keyword if this results page is shown from the main Search page (in the [`onSubmit` function](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Search.vue#L52)), but will be set to `similar`, `creator_id`, or `category` if resulting from a click off the Details view. Look at the [Details.vue component in the final project](https://github.com/phonegap/phonegap-app-stockpile/blob/master/src/components/pages/Details.vue#L128-L153) to see these filters being set.

## Handling Search Form Submission

Before moving on, revisit the **Search** page to add some functionality into the `onSubmit` form handler to now route to this new **Results** page.

1. Open `Search.vue` and replace the stubbed out `onSubmit` method with the following:

    ```javascript
      onSubmit () {
        const { searchInput, searchForm } = this.$refs;
        const { filter, limit, q } = this.$f7.formToJSON(searchForm);
        const { router } = this.$f7.mainView;
        const input = searchInput.$el.querySelector('input');

        input.blur();

        if (!q.trim()) {
          this.$f7.alert('Please enter a search term', 'Search Error');
          return;
        }
        router.loadPage(`/results/${filter || 'words'}/${limit}/${q}/search`);
      }
    ```

The `onSubmit` method gathers the form data, ensures there was a search term entered and passes the parameters into the router to load the results page. At this point the routing is all wired up to display the results view from the search view, but the Stock API has not yet been called to populate the `images` array and the UI hasn't been added yet to handle those results. You will work on adding those pieces in the next lesson.

## Run it

Run the app again in dev mode, enter a search term, hit the FIND IMAGES button and verify you see the following:

![](./images/5-results-part1.png)

The results page now loads with the "Loading results..." message (since there are no results yet) so you've confirmed the search page is now routing to the results page. Move on to part 2 to begin adding the rest of the functionality for this view.

> Note that the message component is bound with a `v-if` directive to the `results` variable, which was defaulted to `true`, and thus displays despite there being results yet. You could change the default to `false` to test how the `v-if` applies and no message displays.

## Next: [Results View Part 2](./06-results-part2.html.md)

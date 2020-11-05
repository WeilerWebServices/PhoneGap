# Lesson 4 - Using the Adobe Stock API

The Stockpile app uses the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock.html) to retrieve images based on search criteria. There are some setup and configuration steps you will need to do first to enable your app to query the Adobe Stock database. This lesson will walk you through each of those steps.

## Obtaining a Stock API key

The Adobe Stock API requires a developer key to make API calls to it, so in this lesson you'll go through the setup steps required for querying the Adobe Stock database from your app.

> You will need an Adobe ID to use the Stock API. If you don't have one yet, you will have the option to create one in the steps below.

1. Open a browser and navigate to the [Adobe IO Console](https://console.adobe.io/integrations):

    ![](./images/stockapi/01-adobe-i0-console.png)

1. Login with your Adobe ID (or create a new Adobe ID):

    ![](./images/stockapi/02-new-integrations.png)

1. Click **"New Integration"**, then choose "Access an API":

    ![](./images/stockapi/03-access-an-api.png)

1. Next choose **"Adobe Stock"** and **"OAuth Integration"** below that:

    ![](./images/stockapi/04-adobe-stock-oauth.png)

1. Choose **"New integration"**:

    ![](./images/stockapi/05-create-new-integration.png)

1. Give your integration a name like "Stockpile" and a Description like "A test Adobe Stock integration with a PhoneGap app":

    ![](./images/stockapi/06-create-new-integration-pt2.png)

1. Choose **Web** as the platform

1. The Default redirect URI part is not used by this app, so put in any URL (preferably your own) (ie: `https://phonegap.com` and `https://phonegap\.com` for the Redirect URI pattern).

1. Prove you are not a robot, then click the **Create integration** button

1. Your integration has been created. Click **Continue to integration details** to get your API key:

    ![](./images/stockapi/07-integration-completed.png)

1. Your API key will be under **API Key (Client ID)** on the left:

    ![](./images/stockapi/08-api-key.png)

## Key Configuration

Now that you've obtained a key, you will need to have it available for use by the API calls. One way to do this is to create a configration file to store the properties.

1. Create a new `utils` folder within the `src` folder
1. Create a file named `config.js` under `~src/utils/`
1. Paste in the following header data to match the header data format the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html) requires, replacing the `x-api-key` parameter with your new API key:

    ```javascript
      export const apiHeaders = {
        'x-api-key': '*******************************', // replace with your api-key
        'X-Product': 'StockpileTutorial/1.0.0'
      };
    ```

## Fetch Polyfill

You will be using the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in this app, and currently a polyfill is required for devices running Android 4.x and iOS < 10, so to ensure device compatibility, in this step you should add the [whatwg-fetch](https://github.github.io/fetch/) library. Begin by installing it first:

    npm install whatwg-fetch --save

then import it for use by opening `main.js` and adding the following at the top, just below the `babel-polyfill` import:

    import 'whatwg-fetch';

## Content Security Policy Updates

You'll also need to update the [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) for the app to allow content to come from Adobe Stock API by including its URL `https://stock.adobe.io` in the meta tag.

Open the `index.html` file and replace the `<meta>` tag with the current CSP to:

```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com https://stock.adobe.io 'unsafe-eval' 'unsafe-inline' ws://*; style-src 'self' 'unsafe-inline'; media-src *; img-src * data:">
```

> **IMPORTANT:** This CSP should be used for example purposes only and should **NEVER** be used in a production app as it is extremely insecure and provides wide open access. It's important to understand the meaning of the different attributes to ensure you're using the most secure one for your app. Please refer to [the documentation here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) for more details.  You can also check out the [CSP is Awesome tool](http://cspisawesome.com/) to help you generate your own CSP's.

## Add JavaScript handling

To keep things more readable and maintainable for this app, it's better to code the functions for interacting with the Stock API in a separate JavaScript file.

1. In the `utils` folder you created above, create a new file named `stockAPI.js` and add the following content:

    ```javascript
      /* global fetch */

      import { apiHeaders } from './config';

      const apiBase = 'https://stock.adobe.io/Rest/Media/1/Search/Files';

      // function to format an array of columns into the query string needed
      export function formatResultColumns (columns) {
        if (columns.length < 1) return '';
        return `result_columns[]=${columns.join('&result_columns[]=')}`;
      }

      // function to format an object containing parameters into the query string needed
      export function formatSearchParameters (parameters) {
        return parameters
          .map(param => `search_parameters[${param.key}]=${param.val}`)
          .join('&');
      }

      // function to call the Adobe Stock API and return the results
      export default function fetchStockAPIJSON (options) {
        const { columns, parameters } = options;
        const resultColumns = formatResultColumns(columns);
        const searchParameters = formatSearchParameters(parameters);
        const apiURL = `${apiBase}?${resultColumns}&${searchParameters}`;
        const myInit = {
          method: 'GET',
          headers: new Headers(apiHeaders)
        };
        return new Promise((resolve, reject) => {
          fetch(apiURL, myInit)
            .then(response => response.json())
            .then((json) => {
              resolve(json);
            }).catch((ex) => {
              reject(ex);
            });
        });
      }
    ```

These functions format the query string to pass in to the [Adobe Stock API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html). They take the `config.js` header (with the API key) and format the parameters and search criteria into a query string, then fetch the results from the Adobe Stock API. The `fetchStockAPIJSON ()` is called from the **Search** view when the **Find Images** button is clicked.

## Adobe Stock API request/results

[The Adobe Stock Search API](https://www.adobe.io/apis/creativecloud/stock/docs/api/search.html) has a number of parameters you can pass in depending on what you're trying to query. Take a look at the documentation for details on why certain parameters were used in this app.

## Next: [Results View Part 1](./05-results-part1.html.md)

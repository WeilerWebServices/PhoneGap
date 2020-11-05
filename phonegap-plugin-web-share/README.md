
Phonegap-web-share-plugin
------------------------

The phonegap web share plugin that conforms to W3C specs. 

The [Web Share API](https://github.com/WICG/web-share) adds a proposal to share text and URLs to an arbitrary destination of user's choice.

A dictionary object containig title,text and URL is passed to the share method

```js
navigator.share({title: 'Example Page', text: 'sample text', url: 'https://example.com'});
```

The URLs must be secure for iOS whereas Android does not mandate it.

The navigator.share method works without the title as well. However,the share method works with only valid text and only valid URLs.

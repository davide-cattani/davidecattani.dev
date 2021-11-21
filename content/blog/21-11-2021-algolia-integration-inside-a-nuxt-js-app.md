---
title: Algolia integration inside a Nuxt.js app
date: 2021-11-21T13:19:10.552Z
tags:
  - Nuxt.js
  - Vue.js
description: This is how i added an Algolia index search inside a nuxt app
  without using the Vue Instantsearch UI.
---
Developing a nuxt project for an online catalog, me and my team decided to use the super-powerful and quick algolia search engine. This was decided for two main reasons: we needed to display some facets for the user to narrow the search results and not having to reinvent the wheel to do so.

After we built the algolia index by syncing the data from our mangodb database, we started researching how to implement the search engine on the frontend, which as i said we built using nuxt.js manily for its server/client and SEO capabilities.

### Vue Instantsearch

The obvious choice would have been to use the powerful and yet customizable [Instantsearch UI](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/vue/) provided by algolia. After experimenting with it, expecially regarding server-side rendering and customization, we quickly realized that solution was a bit too "strict" for our particular use-case.

We had a very granular data structure, with catalog products divided in multi-level categories and the customer requested that for each category, facets shown on the ui would be different.

As always, ready-made solutions are awesome and easily implemented when no particular customization needs to be applied. In our case, we went the opposite way and implemented algolia search just as we needed it, starting not from the instantsearch UI package, but from the base algoliasearch package.

### Installation and integration

Install the base package algoliasearch in your project

`yarn install algoliasearch`

Next, we can leverage the nuxt.js plugins capability in order to keep our code clean and to have a single algolia search instance for our app.

So, in /plugins/algolia.js:

```javascript
import algoliasearch from 'algoliasearch/lite'

export default ({ app }, inject) => {
  const client = algoliasearch(app.$config.appId, app.$config.token)
  const index = client.initIndex(app.$config.index)
  // inject the algolia index in the application. It will be accessible using this.$algolia
  inject('algolia', index)
}

```

Obviously, you will need to add the required algolia ID, token and index name in `nuxt.config.js`

```javascript
// Public variables accessible on server & client (this.$config or context.$config)
  publicRuntimeConfig: {
    appId: process.env.ALGOLIA_APP_ID,
    token: process.env.ALGOLIA_TOKEN,
    index: process.env.ALGOLIA_INDEX,
    axios: {
      browserBaseURL: process.env.API_URL
    }
  },
```

I made them public because the search can also run on the client. If this is not your case, you can add them in the `privateRuntimeConfig `instead.

Now we have access to the `$algolia` plugin from anywhere in our app and we can then start to implement our own custom logic for managing results and facets.

### Searching for results

We decided to have the search function in a vuex store module because we wanted to store both search parameters and results (which algolia calls "hits") in the store for convenience.

The following is the vuex action we call from anywhere in our code to get results from algolia:

```javascript
// run a search on algolia and store results in store
  runSearch ({ state, dispatch, commit, getters }, payload) {
    // if payload contains a 'search' string, save it in store
    commit('setSearch', (payload && payload.search) ? payload.search : '')
    // first, getSearchFilters returns any filters the user may have set on the UI
    // you will have to customize the getSearchFilters action for your needs
    return dispatch('getSearchFilters')
      .then((filters) => {
        // perform the search
        // parameters passed can be found on algolia docs
        // https://www.algolia.com/doc/api-reference/api-parameters/query/
        return this.$algolia.search(state.search, {
          page: payload.currentPage, // get page # from page pagination
          hitsPerPage: payload.resultsPerPage, // can be fixed or dynamic, in this case i receive it from ui component
          ...filters, // the filters set before by the user
          facets: Object.keys(state.facets), // the facets to display on the ui. This is dynamic based on product category the user navigated into
          maxValuesPerFacet: state.maxValuesPerFacet // can be fixed or dynamic
        })
          .then((result) => {
            console.log('--> Search result: ', result)
            dispatch('updateFacetsAfterSearch', result.facets)
            commit('setHits', result.hits)
            return result
          }).catch(error => console.log(error))
      })
  },
```



This is how the above runSearch action is invoked on the vue component to display results:

```javascript
<template>
  <v-container fluid>
    <v-row>
      <!--  other stuff...  -->
      <v-col>
            <!--  results  -->
            <v-row>
              <v-col
                v-for="product in hits"
                :key="product.objectID"
              >
                <ProductCard :product="product" />
              </v-col>
            </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '~/components/ProductCard'

export default {
  name: 'CatalogComponent',
  components: {
    ProductCard,
  },
  data () {
    return {
      searched: false,
      loading: true,
      search: '', // search string input. When updated, updates also in vuex store for narrowing the results
    }
  },
  computed: {
    ...mapGetters({
      hits: 'catalog/getHits' // get the hits (results) from search
    }),
  },
  methods: {
    // call this method from a button, text input, whatever
    onSearch () {
      this.runSearch()
    },
    // invoke search on vuex store.
    runSearch (page) {
      this.loading = true
      this.$store.dispatch('catalog/runSearch', { search: this.search, page })
        .then(() => {
          this.searched = true
          this.loading = false
        })
    }
  }
}

</script>

```
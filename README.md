# vue-promise

> Vue promise wrapper component

## About

The goal of this component is to simplify rendering logic based on promise state (pending / fulfilled, rejected). The component keeps track of the promise's state and proposes slots to render content accordingly.

You should avoid this component when:

* You need to store the result of the promise (i.e to send it back later or if it is required for a computed property).
* You need to make a function call inside of the promise callback (i.e store it in Vuex or trigger your notification library).

## Installation

```
npm install --save vue-promise
```

## Example

With vue-promise we would write the following:

```
<template>
  <div>
      <vue-promise :promise="api.getUser">
          <div slot="pending">
              Loading user...
          </div>
          <div slot="then" slot-scope="{result}">
              Hello {{ result.firstName }} {{ result.lastName }}
          </div>
          <div slot="rejected" slot-scope="{error}">
              {{ error.message }}
          </div>
      </vue-promise>
  </div>
</template>

<script>
import VuePromise from 'vue-promise';
import api from './api';
export default {
  data() {
    api: api;
  },
  components: {
      VuePromise
  }
};
</script>
```

Instead of:

```
<template>
    <div>
        <div v-if="loading">
            Loading user...
        </div>
        <div v-else-if="error">
            {{ error.message }}
        </div>
        <div v-else>
            Hello {{ result.firstName }} {{ result.lastName }}
        </div>
    </div>
</template>

<script>
import api from './api';
export default {
  created() {
    this.loading = true;
    this.error = null;
    api
      .getUser()
      .then(result => (this.user = result))
      .catch(error => (this.error = error))
      .finally(_ => (this.loading = false));
  },
  data() {
    return {
      loading: false,
      user: null
    };
  }
};
</script>
```

## Props

* __promise__: _required_, the promise to execute.
* __argument__: the scalar or object to pass to the promise as its argument.
* __refresh__: refresh trigger.

The component [watches](https://vuejs.org/v2/guide/computed.html#Watchers) both the argument and refresh props, the promise will automatically re-execute when the value of either of these changes.

## Slots

All slots are optional.

| Name     | Visible when              | Slot type(s)       | If absent                 |
|----------|---------------------------|--------------------|---------------------------|
| pending  | The promise is pending    | Regular only       | A span with 'Loading...'  |
| rejected | The promise was rejected  | Regular and scoped | A span with 'Error'       |
| then     | The promise was fulfilled | Regular and scoped | A span with 'Loaded'      |

Data exposed by scoped slots:

* Scoped 'rejected' slot exposes the 'error' object.
* Scoped 'then' slot exposes the 'result' object.

## Powered by

* Babel
* Webpack 4
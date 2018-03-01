# vue-promise

> Vue promise wrapper component

## Example

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

## Powered by

* Babel
* Webpack 4
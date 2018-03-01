# vue-promise

> Vue promise wrapper component

## Example

```
<template>
  <div>
      <vue-promise :promise="api.getUser">
          <div slot="loaded" slot-scope="{result}">
              Hello {{ result.firstName }} {{ result.lastName }}
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
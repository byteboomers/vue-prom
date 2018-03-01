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
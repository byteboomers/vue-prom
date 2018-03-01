<template>
    <span>
      <!-- Pending -->
        <div v-if="pending">
            <slot v-if="$slots['pending']" name="pending"></slot>
            <span v-else>Loading...</span>
        </div>
        <!-- Catch -->
        <div v-else-if="rejected">
            <slot v-if="$scopedSlots['catch']" name="catch" :error="error"></slot>
            <slot v-else-if="$slots['catch']" name="catch"></slot>
            <span v-else>Error</span>
        </div>
        <!-- Then -->
        <div v-else>
            <slot v-if="$scopedSlots['then']" name="then" :result="result"></slot>
            <slot v-else-if="$slots['then']" name="then"></slot>
            <span v-else>Loaded</span>
        </div>
    </span>
</template>

<script>
export default {
  props: ['promise', 'refresh'],
  created() {
    this.executePromise();
  },
  data() {
    return {
      pending: false,
      rejected: false,
      error: null,
      result: null
    };
  },
  methods: {
    executePromise() {
      this.pending = true;
      this.rejected = false;
      this.error = null;
      this.result = null;
      this.promise
        .then(result => {
          this.result = result;
        })
        .catch(error => {
          this.rejected = true;
          this.error = error;
        })
        .finally(_ => {
          this.pending = false;
        });
    }
  },
  watch: {
    promise() {
      this.executePromise();
    },
    refresh() {
      this.executePromise();
    }
  }
};
</script>
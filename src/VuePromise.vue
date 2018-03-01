<template>
    <span>
      <!-- Loading -->
        <div v-if="loading">
            <slot v-if="$slots['loading']" name="loading"></slot>
            <span v-else>Loading</span>
        </div>
        <!-- Error -->
        <div v-else-if="error">
            <slot v-if="$scopedSlots['error']" name="error" :error="error"></slot>
            <slot v-else-if="$slots['error']" name="error"></slot>
            <span v-else>Error</span>
        </div>
        <!-- Loaded -->
        <div v-else>
            <slot v-if="$scopedSlots['loaded']" name="loaded" :result="result"></slot>
            <slot v-else-if="$slots['loaded']" name="loaded"></slot>
            <span v-else>Loaded</span>
        </div>
    </span>
</template>

<script>
const REASONS = {
  INITIAL: 'initial',
  REFRESH: 'refresh',
  PARAMETERS: 'parameters'
};
export default {
  props: ['promise', 'parameters', 'refresh'],
  created() {
    this.callPromise(REASONS.INITIAL);
  },
  data() {
    return {
      loading: false,
      error: null,
      result: null
    };
  },
  methods: {
    callPromise(reason) {
      this.loading = true;
      this.error = null;
      this.result = null;
      this.promise(this.parameters)
        .then(result => {
          this.result = result;
          this.$emit('load', {
            result,
            ...{
              reason
            }
          });
        })
        .catch(error => {
          this.error = error;
        })
        .finally(_ => {
          this.loading = false;
        });
    }
  },
  watch: {
    parameters() {
      this.callPromise({
        reason: REASONS.PARAMETERS
      });
    },
    refresh() {
      this.callPromise({
        reason: REASONS.REFRESH
      });
    }
  }
};
</script>
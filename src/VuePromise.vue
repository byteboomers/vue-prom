<template>
    <span>
      <!-- Pending -->
        <div v-if="pending">
            <slot v-if="$slots['pending']" name="pending"></slot>
            <span v-else>Pending</span>
        </div>
        <!-- Rejected -->
        <div v-else-if="rejected">
            <slot v-if="$scopedSlots['rejected']" name="rejected" :error="error"></slot>
            <slot v-else-if="$slots['rejected']" name="rejected"></slot>
            <span v-else>Rejected</span>
        </div>
        <!-- Then -->
        <div v-else>
            <slot v-if="$scopedSlots['then']" name="then" :result="result"></slot>
            <slot v-else-if="$slots['then']" name="then"></slot>
            <span v-else>Fulfilled</span>
        </div>
    </span>
</template>

<script>
const REASONS = {
  INITIAL: 'initial',
  REFRESH: 'refresh',
  ARGUMENT: 'argument'
};
export default {
  props: ['promise', 'argument', 'refresh'],
  created() {
    this.callPromise(REASONS.INITIAL);
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
    callPromise(reason) {
      this.pending = true;
      this.rejected = false;
      this.error = null;
      this.result = null;
      this.promise(this.argument)
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
          this.rejected = true;
          this.error = error;
        })
        .finally(_ => {
          this.pending = false;
        });
    }
  },
  watch: {
    argument() {
      this.callPromise({
        reason: REASONS.ARGUMENT
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
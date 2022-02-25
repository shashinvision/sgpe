<template>
  <b-modal
    :id="infoModal.id"
    :title="infoModal.title"
    ok-only
    @hide="resetInfoModal"
  >
    <pre>{{ infoModal.content }}</pre>
  </b-modal>
</template>

<script>
export default {
  name: "SgpeInfomodal",

  data() {
    return {};
  },

  props: {
    infoModal: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped></style>

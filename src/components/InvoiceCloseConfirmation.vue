<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex">
        <button @click="closeConfirmModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "InvoiceCloseConfirmationComponent",
  data() {
    return {}
  },
  computed: {
    ...mapState(["editInvoice"]),
  },
  methods: {
    ...mapMutations({ toggleEditInvoice: "TOGGLE_EDIT_INVOICE" }),
    ...mapActions([ 'toggleInvoiceModalConfirmation', 'toggleInvoice']),
    closeConfirmModal() {
      this.toggleInvoiceModalConfirmation();
    },
    closeInvoice() {
      this.toggleInvoiceModalConfirmation();
      this.toggleInvoice();
      if (this.editInvoice) {
        this.toggleEditInvoice();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
<template>
  <div v-if="currentInvoiceData" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt=""> Go Back
    </router-link>

    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div 
          class="status-button flex"
          :class="{paid: currentInvoiceData.invoicePaid, draft: currentInvoiceData.invoiceDraft, pending: currentInvoiceData.invoicePending
          }"
        >
          <span v-if="currentInvoiceData.invoicePaid">Paid</span>
          <span v-if="currentInvoiceData.invoiceDraft">Draft</span>
          <span v-if="currentInvoiceData.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button 
          @click.prevent="toggleEditInvoice" 
          type="button" 
          class="dark-purple"
        >
          Edit
        </button>
        <button 
          @click.prevent="deleteInvoice(currentInvoiceData)" 
          type="button" class="red"
        >
          Delete
        </button>
        <button 
          v-if="currentInvoiceData.invoicePending" 
          @click.prevent="updateStatusToPaid(currentInvoiceData)"
          type="button" 
          class="green"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoiceData.invoiceDraft || currentInvoiceData.invoicePaid"
          @click.prevent="updateStatusToPending(currentInvoiceData)"
          type="button"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="invoice-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoiceData.invoiceId }}</p>
          <p>{{ currentInvoiceData.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoiceData.billerStreetAddress }}</p>
          <p>{{ currentInvoiceData.billerCity }}</p>
          <p>{{ currentInvoiceData.billerZipCode }}</p>
          <p>{{ currentInvoiceData.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>
            {{ currentInvoiceData.invoiceDate }}
          </p>
          <h4>Payment Date</h4>
          <p>
            {{ currentInvoiceData.paymentDueDate }}
          </p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoiceData.clientName }}</p>
          <p>{{ currentInvoiceData.clientStreetAddress }}</p>
          <p>{{ currentInvoiceData.clientCity }}</p>
          <p>{{ currentInvoiceData.clientZipCode }}</p>
          <p>{{ currentInvoiceData.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Sent To</h4>
          <p>{{ currentInvoiceData.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div 
            v-for="(item, index) in currentInvoiceData.invoiceItemList" :key="index" class="item flex">
            <p>{{ item.name }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ formatInvoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'InvoiceViewPage',
  data() {
    return {
      currentInvoiceData: null
    }
  },
  created() {
    this.getCurrentInvoice()
  },
  computed: {
    ...mapState(['currentInvoice', 'editInvoice']),
    formatInvoiceTotal() {
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      return formatter.format(this.currentInvoiceData.invoiceTotal)
    }
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoiceData = this.currentInvoice[0]
      }
    }
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE', 'TOGGLE_INVOICE']),
    ...mapActions({
      deleteInvoiceData: 'deleteInvoiceData',
      updateInvoiceStatusToPaid: 'updateStatusToPaid',
      updateInvoiceStatusToPending: 'updateStatusToPending',
    }),
    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId)
      this.currentInvoiceData = this.currentInvoice[0] 
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE()
      this.TOGGLE_INVOICE()
    },
    updateStatusToPaid(invoice) {
      this.updateInvoiceStatusToPaid(invoice.docId)
    },
    updateStatusToPending(invoice) {
      this.updateInvoiceStatusToPending(invoice.docId)
    },
    async deleteInvoice(invoice) {
      await this.deleteInvoiceData(invoice.docId)
      this.$router.push({ name: 'Home'})
    },
  }
}
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }
  .header,
  .invoice-details {
    background-color: #1e2139;
    border-radius: 20px;
  }
  .header {
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
    .left {
      align-items: center;
      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }
    .right {
      flex: 1;
      justify-content: flex-end;
      button {
        color: #fff;
      }
    }
  }
  .invoice-details {
    padding: 48px;
    margin-top: 24px;
    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }
      .left {
        font-size: 12px;
        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }
        p:nth-child(2) {
          font-size: 16px;
        }
        span {
          color: #888eb0;
        }
      }
      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }
    .middle {
      margin-top: 50px;
      color: #dfe3fa;
      gap: 16px;
      h4 {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 12px;
      }
      p {
        font-size: 16px;
      }
      .bill,
      .payment {
        flex: 1;
      }
      .payment {
        h4:nth-child(3) {
          margin-top: 32px;
        }
        p {
          font-weight: 600;
        }
      }
      .bill {
        p:nth-child(2) {
          font-size: 16px;
        }
        p:nth-child(3) {
          margin-top: auto;
        }
        p {
          font-size: 12px;
        }
      }
      .send-to {
        flex: 2;
      }
    }
    .bottom {
      margin-top: 50px;
      .billing-items {
        padding: 32px;
        border-radius: 20px 20px 0 0;
        background-color: #252945;
        .heading {
          color: #dfe3fa;
          font-size: 12px;
          margin-bottom: 32px;
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
        .item {
          margin-bottom: 32px;
          font-size: 13px;
          color: #fff;
          &:last-child {
            margin-bottom: 0;
          }
          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }
      .total {
        color: #fff;
        padding: 32px;
        background-color: rgba(12, 14, 22, 0.7);
        align-items: center;
        border-radius: 0 0 20px 20px;
        p {
          flex: 1;
          font-size: 12px;
        }
        p:nth-child(2) {
          font-size: 28px;
          text-align: right;
        }
      }
    }
  }
}
</style>
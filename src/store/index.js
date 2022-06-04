import { createStore } from 'vuex'
import { firestoreDb, collection, getDocs, updateDoc ,deleteDoc, doc} from '@/firebase/firebaseInit'

export default createStore({
  state: {
    invoiceDataList: [],
    showInvoiceModal: false,
    invoiceModalConfirmationActive: false,
    editInvoice: false,
    invoicesLoaded: false,
    currentInvoice: []
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.showInvoiceModal = !state.showInvoiceModal
    },
    TOGGLE_INVOICE_MODAL_CONFIRMATION(state) {
      state.invoiceModalConfirmationActive = !state.invoiceModalConfirmationActive
    },
    SET_INVOICES_DATA(state, payload) {
      state.invoiceDataList = payload.docs.map(doc => {
        let docData = doc.data()
        docData.docId = doc.id
        return docData
      })
    },
    SET_INVOICES_LOADED(state) {
      state.invoicesLoaded = true
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoice = state.invoiceDataList.filter(invoice => {
        return invoice.invoiceId === payload
      })
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice
    },
    DELETE_INVOICE(state, payload) {
      state.invoiceDataList = state.invoiceDataList.filter(invoice => invoice.docId !== payload);
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.invoiceDataList.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true
          invoice.invoicePending = false
          invoice.invoiceDraft = false
          return true;
        }
      })
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.invoiceDataList.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false
          invoice.invoicePending = true
          invoice.invoiceDraft = false
          return true;
        }
      })
    },
  },
  actions: {
    toggleInvoice({commit}) {
      commit('TOGGLE_INVOICE')
    },
    toggleInvoiceModalConfirmation({commit}) {
      commit('TOGGLE_INVOICE_MODAL_CONFIRMATION')
    },
    async getInvoices({commit}) {
      const invoicesCollection = collection(firestoreDb, 'invoices')
      const data = await getDocs(invoicesCollection)
      commit('SET_INVOICES_DATA', data)
      commit('SET_INVOICES_LOADED')
    },
    async updateInvoiceList({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_INVOICE", docId)
      await dispatch("getInvoices")
      commit("TOGGLE_INVOICE")
      commit("TOGGLE_EDIT_INVOICE")
      commit("SET_CURRENT_INVOICE", routeId)
    },
    async deleteInvoiceData({ commit }, docId) {
      await deleteDoc(doc(firestoreDb, 'invoices', docId))
      commit("DELETE_INVOICE", docId)
    },
    async updateStatusToPaid({ commit }, docId) {
      let invoiceRef = doc(firestoreDb, 'invoices', docId)
      await updateDoc(invoiceRef, {
        invoicePaid: true,
        invoicePending: false,
        invoiceDraft: false,
      })
      commit('UPDATE_STATUS_TO_PAID', docId)
    },
    async updateStatusToPending({ commit }, docId) {
      let invoiceRef = doc(firestoreDb, 'invoices', docId)
      await updateDoc(invoiceRef, {
        invoicePaid: false,
        invoicePending: true,
        invoiceDraft: false,
      })
      commit('UPDATE_STATUS_TO_PENDING', docId)
    }
  },
  getters: {
    getInvoices: (state) => {
      return state.invoiceDataList
    }
  },
  modules: {}
})

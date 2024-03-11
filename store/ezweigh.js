import axios from "axios"
import { defineStore } from "pinia"
import swal from "sweetalert2"

const errorAlert = message => {
  new swal({
    icon: "error",
    title: "Oops...!",
    text: message,
    timer: 1500,
  })
}

const successAlert = message => {
  new swal({
    icon: "success",
    title: "Success",
    text: message,
    timer: 1500,
  })
}

const TOKEN_KEY = "authToken"

export const useEzweighStore = defineStore("ezweigh", {
  state: () => ({
    loadingData: false,
    allTransactions: [],
  }),
  actions: {
    async setup() {
      await this.initializeToken()
    },
    async initializeToken() {
      if (process.client) {
        // Check if running in the browser environment
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
          this.authToken = token
        }
      }
    },
    async creatQueueTransaction(payload) {
        await this.initializeToken() // Ensure token initialization is complete
        try {
          this.loadingData = true
  
          const headers = {
            Authorization: `Bearer ${this.authToken}`,
          }
  
          const res = await axios.post("/transactions/queue-transaction", payload, {
            headers,
          })
  
          if (res.status == 201) {
            successAlert("successful")
            this.loadingData = false
          } else throw new Error(res?.data?.message)
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.loadingData = false
        }
      },
    async fetchAllTransactions() {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get("/transactions", { headers })
        if (res?.status == 201) {
          this.allTransactions = res?.data
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },
  },
})

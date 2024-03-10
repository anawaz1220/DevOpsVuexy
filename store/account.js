import baseurl from "@/@core/app-config/baseUrl"
import axios from "axios"
import { defineStore } from "pinia"
import swal from "sweetalert2"

const errorAlert = message => {
  new swal({
    icon: "error",
    title: "Oops...!",
    text: message,
  })
}

const successAlert = message => {
  new swal({
    icon: "success",
    title: "Success",
    text: message,
    
  })
}

const TOKEN_KEY = "authToken"

export const useAccountStore = defineStore("account", {
  state: () => ({
    loadingData: false,
    allAccounts: [],
    AccountsId: [],
    accountBYclient: [],
    StoredAccountData:[]
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
    async fetchAllAccounts() {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(baseurl + "api/v1/accounts", { headers })
        if (res?.status == 200) {
          this.allAccounts = res?.data
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async FetchCreateNewAcc(payload) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.post(baseurl + "api/v1/accounts", payload, {
          headers,
        })

        if (res.status == 201) {
          successAlert("successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },
    async updateAccount(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.patch(baseurl + `api/v1/accounts/${id}`,{
          headers,
        })

        if (res.status == 201) {
          successAlert("successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async fetchAccountDetails(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.LoadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(baseurl + `api/v1/accounts/${id}`, {
          headers,
        })

        if (res?.status == 200) {
          this.AccountsId = res?.data
          this.LoadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.LoadingData = false
      }
    },

    async FetchUpdateAccounts(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.patch(baseurl + `api/v1/accounts/${id}`, null, {
          headers,
        })

        if (res.status == 200) {
          successAlert("successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async FetchAccountsByClient(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(
          baseurl + `api/v1/accounts/by-client/${id}`,
          { headers },
        )

        if (res.status == 200) {
          this.accountBYclient = res?.data
          successAlert("successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },
    // import accounts data
    async importAccountsFile(formData) {
      console.log("in store trucks", formData)
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "multipart/form-data",
        }

        const res = await axios.post(
          baseurl + "api/v1/imports/account-data",
          formData,
          { headers },
        )

        if (res.status == 201) {
          //   console.log("assigned to client successfully");
          successAlert("successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res) {
        errorAlert(res?.response?.data?.message)
        console.log(err, "error")
        this.loadingData = false
      }
    },
    saveAccountData(item){
      this.StoredAccountData =item;
    }
  },
})

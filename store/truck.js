import baseurl from "@/@core/app-config/baseUrl"
import axios from "axios"
import { defineStore } from "pinia"
import swal from "sweetalert2"

const errorAlert = message => {
  new swal({
    icon: "error",
    title: "Oops...!",
    text: message,
    // timer: 1500,
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

export const useTruckStore = defineStore("truck", {
  state: () => ({
    loadingData: false,
    AllTrucks: [],
    trucksDetails: [],
    truckBYclient: [],
    truckDetailsById:[],
    TruckUpdate:[]
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
    async fetchAllTrucks() {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(baseurl + "api/v1/trucks", { headers })
        if (res?.status == 200) {
          this.AllTrucks = res?.data
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },
    async fetchTruckByKeyword(keyword) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(
          baseurl + `api/v1/trucks/autocomplete/${keyword}`,
          {
            headers,
          },
        )

        if (res.status == 200) {
          this.AllTrucks = res?.data
          successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async fetchTruckDetails(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(baseurl + `api/v1/trucks/${id}`, {
          headers,
        })

        if (res.status == 200) {
          this.trucksDetails = res?.data
          successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async FetchUpdateTruck(id) {
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.patch(baseurl + `api/v1/trucks/${id}`, null, {
          headers,
        })

        if (res.status == 200) {
          successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async FetchTruckByClient(id) {
      console.log('in store', id);
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.get(baseurl + `api/v1/trucks/by-client/${id}`, {
          headers,
        })
        if (res.status == 200) {
          this.truckBYclient = res?.data
          // successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.loadingData = false
      }
    },

    async FetchAddNewTruck(payload) {
      // console.log(payload, "from request");
      await this.initializeToken() // Ensure token initialization is complete
      try {

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.post(
          baseurl + "api/v1/trucks/add-for-client",
          payload,
          { headers: headers },
        )

        if (res.status == 201) {
          successAlert("Successful")
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
      }
    },

    async updateTruck(payload, id) {
      // console.log(payload, "from request");
      await this.initializeToken() // Ensure token initialization is complete
      try {
        
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.patch(
          baseurl + `api/v1/trucks/${id}`,
          payload,
          { headers: headers },
        )

        if (res.status == 201||res.status == 200) {
          successAlert("Successful")
        } else throw new Error(res?.data?.message)
      } catch(res){
        console.log("error in updating truck",res)
        errorAlert(res?.response?.data?.message)
      }
    },
    async FetchAssignTruck(payload) {
      //   console.log("in store trucks", payload);
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await axios.post(
          baseurl + "api/v1/trucks/assign-to-client",
          payload,
          { headers },
        )

        if (res.status == 201) {
          //   console.log("assigned to client successfully");
          successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch (err) {
        errorAlert(err.response.data.message)
        console.log(err.response.data.message, "errosr")
        this.loadingData = false
      }
    },

    async importTrucksFile(formData) {
      console.log("in store trucks", formData)
      await this.initializeToken() // Ensure token initialization is complete
      try {
        this.loadingData = true

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "multipart/form-data",
        }

        const res = await axios.post(
          baseurl + "api/v1/imports/truck-data",
          formData,
          { headers },
        )

        if (res.status == 201) {
          //   console.log("assigned to client successfully");
          successAlert("Successful")
          this.loadingData = false
        } else throw new Error(res?.data?.message)
      } catch(res){
        errorAlert(res?.response?.data?.message)
        console.log(err, "error")
        this.loadingData = false
      }
    },

    async fetchTruckDetails(id){
      await this.initializeToken()
      try{
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        }
       const res = await axios.get(baseurl + `api/v1/trucks/${id}`, {headers});
       if(res?.status==200){
        this.truckDetailsById =res?.data;
       }else throw new Error(res?.data?.message);
      }catch(err){
        errorAlert(err.response.data.message)
        console.log(err.response.data.message, "errors")
      }
    },

    saveTruckData(item){
      this.TruckUpdate =item;
    },

    
  },
})

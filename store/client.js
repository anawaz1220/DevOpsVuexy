import axios from "axios";
import { defineStore } from "pinia";
import swal from "sweetalert2";


axios.defaults.baseURL='https://api.dev.efaci-saas.net/api/v1'


const errorAlert = (message) => {
  new swal({
    icon: 'error',
    title: 'Oops...!',
    text: message,
    // timer: 2500,
  });
};

const successAlert = (message) => {
  new swal({
    icon: 'success',
    title: 'Success',
    text: message,
    timer: 1500,
  });
};

const TOKEN_KEY = 'authToken';

export const useClientStore = defineStore('clients', {
  state: () => ({
    LoadingData: false,
    clientLoading :false,
    allClients: [],
    clientsDetails: [],
    authToken: null,
    clientSummary:null
  }),
  actions: {
    async setup() {
      await this.initializeToken();
    },

    async initializeToken() {
      if (process.client) { // Check if running in the browser environment
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          this.authToken = token;
        }
      }
    },

    async fetchAllClients() {
      await this.initializeToken(); // Ensure token initialization is complete
      try {
        const headers = {
          Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
        };

        console.log("headers", headers);
        this.LoadingData = true;
        const res = await axios.get(`/clients`, { headers });
        if (res?.status === 200) {
          this.allClients = res?.data;
          this.LoadingData = false;
        } else {
          throw new Error(res?.data?.message);
        }
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.LoadingData = false;
      }
    },
    async fetchClientsDetails(id) {
      await this.initializeToken(); // Ensure token initialization is complete
      try {
        const headers = {
          Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
        };
        this.LoadingData = true;
        const res = await axios.get(`/clients/${id}`, {headers});
        if (res?.status === 200) {
          this.clientsDetails = res?.data;
          this.LoadingData = false;
        } else {
          throw new Error(res?.data?.message);
        }
      }catch(res){
        errorAlert(res?.response?.data?.message)
        this.LoadingData = false;
      }
    },
    async uploadClientData(payload){
      await this.initializeToken();
      try{
        const headers = {
          Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
        };
        this.clientLoading =true;
        const res= await axios.post(`/imports/client-data`, payload,{headers});
        if(res?.status==201){
          this.clientLoading =false;
          successAlert("Client data Uploaded");
        }else throw new Error(res?.data?.message);
      }catch(res) {
        errorAlert(res?.response?.data?.message)
        this.clientLoading =false;
      }
    },
    async getClientSummary(clientId){
      this.initializeToken()
      try{
          const headers = {
          Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
        };
        const res=await axios.get(`/clients/${clientId}`,{headers})
        this.clientSummary=res?.data
      }
      catch(error){
        console.log("error in retrieving cilent details",error)
      }
    }
  },
});

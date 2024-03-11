import axios from "axios";
import { defineStore } from "pinia";
import swal from "sweetalert2";

const errorAlert = (message) => {
  new swal({
    icon: 'error',
    title: 'Oops...!',
    text: message,
    // timer: 1500,
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

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    LoadingData: false,
    authToken: null,
    userAssignedRoles:[],
    allRoles:[],
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
    async addNewUserPermission(payload) {
      await this.initializeToken(); // Ensure token initialization is complete
      try {
        const headers = {
          Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
        };
        this.LoadingData = true;
        const res = await axios.post(`/permissions`,payload, { headers });
        if (res?.status === 201) {
            successAlert("Permission Added");
          this.LoadingData = false;
        } else {
          throw new Error(res?.data?.message);
        }
      } catch(res){
        errorAlert(res?.response?.data?.message)
        this.LoadingData = false;
      }
    },
    async EditUserPermission(id) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.patch(`/permissions${id}`,payload, { headers });
          if (res?.status === 200) {
              successAlert(res?.data?.message);
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },
      async DeleteUserPermission(id) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.delete(`/permissions${id}`,payload, { headers });
          if (res?.status === 200) {
              successAlert("Permission Deleted");
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },
    //   roles
    async addNewUserRole(payload) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.post(`/roles`,payload, { headers });
          if (res?.status === 201) {
              successAlert("Permission Added");
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },

      
      async getUserRole(id) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.post(`/roles${id}`,{ headers });
          if (res?.status === 200) {
            this.userAssignedRoles =res?.data;
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },
      async EditUserRole(id) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.patch(`/roles${id}`,payload, { headers });
          if (res?.status === 200) {
              successAlert(res?.data?.message);
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },
      async DeleteUserRole(id) {
        await this.initializeToken(); // Ensure token initialization is complete
        try {
          const headers = {
            Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
          };
          this.LoadingData = true;
          const res = await axios.delete(`/roles${id}`,payload, { headers });
          if (res?.status === 200) {
              successAlert("Role Deleted");
            this.LoadingData = false;
          } else {
            throw new Error(res?.data?.message);
          }
        } catch(res){
          errorAlert(res?.response?.data?.message)
          this.LoadingData = false;
        }
      },
async GetAllRoles(id){
  await this.initializeToken(); // Ensure token initialization is complete
  try{
    const headers = {
      Authorization: `Bearer ${this.authToken}`, // Include correctly formatted authorization header
    };
    this.LoadingData = true;
    const res = await axios.get(`/roles/${id}`,{headers});
    if (res?.status === 200){
      this.LoadingData=false;
      this.allRoles=res?.data
    }else {
      throw new Error(res?.data?.message);
    } 
  }catch(err){
    errorAlert(err)
    this.LoadingData = false;
  }
}

  },
});

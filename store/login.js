import axios from "axios";
import { defineStore } from "pinia";
import swal from "sweetalert2";
import { useRouter } from 'vue-router';

const TOKEN_KEY = 'authToken';

const errorAlert = (error) => {
  let errorMessage = "An unknown error occurred.";
  if (error.response) {
    if (error.response.status === 401) {
      errorMessage = "Incorrect email or password. Please try again.";
    } else if (error.response.status === 404) {
      errorMessage = "User not found. Please check your email.";
    } else {
      errorMessage = error.response.data.message || "An unknown error occurred.";
    }
  } else if (error.message) {
    errorMessage = error.message;
  }
  new swal({
    icon: 'error',
    title: 'Oops...!',
    text: errorMessage,
    // timer: 1500
  });

};

const successAlert = (message) => {
  new swal({
    icon: 'success',
    title: 'Success',
    text: message,
    timer: 1500
  }).then(() => {
    // Redirect to a route
    window.location.href = '/';
  });
};

export const useLoginStore = defineStore('login', {
  state: () => ({
    authToken: null,
    userLoading: false,
    isAuthenticated: false,
    loggedInUser:[],
    permissions: [
      //  Permissions for clients
      'view_clients',
      'view_unapproved_clients',
      'add_client',
      'generate_weekly_invoices',
      'view_summary',
      
      //  Permissions for materials
      'view_materials',
      'view_materials_rates',
      'add_material',
      'add_board_rate',
      'add_client_rate',

      //  Permissions for accounts
      'view_accounts',
      'add_account',
      'update_account',

      //  Permissions for emoloyees
      'view_employees',
      'add_employee',
      'update_employee',

      //  Permissions for contacts
      'view_contacts',
      'view_unapproved_contacts'
    ]
    // permission:[]
  }),
  actions: {
    async setup() {
      await this.initializeToken();
    },
    initializeToken() {
      if (process.client) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          this.authToken = token;
          this.isAuthenticated = true; // Set isAuthenticated based on token presence
        }
      }
    },
    async registerUser(payload) {
      try {
        const headers = {
          'content-type': 'application/json',
        };
        this.userLoading = true;
        const res = await axios.post(`/authentication/sign-up`, payload);
        console.log(res, 'user registration');
        if (res?.status === 201) {
          this.userLoading = false
          successAlert("successful")
        }
      } catch (err) {
        this.userLoading = false
        // console.log(err.response.data, 'error');
        errorAlert(err.response.data.message[0]);
      }

      // ... your existing registerUser logic ...
    },
    async loginUser(payload) {
      const router = useRouter();
      try {
        const headers = {
          'content-type': 'application/json',
        };
        this.userLoading = true;
        const res = await axios.post(`/authentication/sign-in`, payload);
        if (res?.status === 200) {
          const token = useCookie('token'); 
          token.value = res?.data?.accessToken;
          if (process.client) {
            localStorage.setItem(TOKEN_KEY, res?.data?.accessToken);
            this.authToken = res?.data?.accessToken;
            this.isAuthenticated = true; // Set isAuthenticated on successful login
            console.log("token", res?.data?.accessToken);
          }
          this.userLoading = false;
        } else {
          throw new Error(res?.data?.message || "An unknown error occurred.");
          
        }
      } catch (err) {
        errorAlert(err);
        this.userLoading = false;
      }
    },
    async logout() {
      try {
        if (process.client) {
          localStorage.removeItem(TOKEN_KEY);
          this.authToken = null;
          this.isAuthenticated = false; // Update isAuthenticated on logout
        }
      } catch (err) {
        console.error('Error logging out:', err);
      }
    },
    async fetchLoggedInUser() {
      await this.initializeToken();
      try {
        if (this.authToken) { // Check if token exists before proceeding
          const headers = {
            Authorization: `Bearer ${this.authToken}`,
          };
          const res = await axios.get(`/users/me`, { headers });
          if (res?.status === 200) {
            this.loggedInUser = res?.data;
          } else {
            throw new Error(res?.data?.message);
          }
        }
      } catch (err) {
        console.error('Error fetching logged-in user:', err);
      }
    },
    
 }})

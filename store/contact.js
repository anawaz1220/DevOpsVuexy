import baseurl from "@/@core/app-config/baseUrl";
import axios from "axios";
import { defineStore } from "pinia";
import swal from "sweetalert2";

const errorAlert = (message) => {
    new swal({
        icon: 'error',
        title: 'Oops...!',
        text: message,
        // timer: 1500
    });
};

const successAlert = (message) => {
    new swal({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 1500
    });
};

const TOKEN_KEY = 'authToken';

export const useContactStore = defineStore('contact',{
    state : () =>({
        loadingData:false,
        allContacts:[],
    }),
    actions:{
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
        async fetchAllAccounts(){
            await this.initializeToken(); // Ensure token initialization is complete
            try{
                this.loadingData =true;
                const headers = {
                    Authorization: `Bearer ${this.authToken}`,
                };
                const res = await axios.get(baseurl + 'api/v1/accounts', { headers });
                if(res?.status == 200){
                    this.allAccounts = res?.data
                    this.loadingData = false
                }else throw new Error(res?.data?.message)
            }catch(res){
                errorAlert(res?.response?.data?.message)
                this.loadingData = false;
            }
        },

        // async FetchCreateNewAcc(){
        //     await this.initializeToken(); 
        //     try{
        //         this.loadingData = true;
        //         const headers = {
        //             Authorization: `Bearer ${this.authToken}`,
        //         };
        //         const res = await axios.post(baseurl + 'api/v1/accounts', null, { headers });
        //         if(res.status == 200){
        //             successAlert('successful')
        //             this.loadingData =false;
        //         }else throw new Error(res?.data?.message)
        //     }catch(err){
        //         errorAlert(err);
        //         this.loadingData =false;
        //     }
        // },

        // async fetchAccountDetails (id){
        //     await this.initializeToken();
        //     try{
        //         this.LoadingData = true;
        //         const headers = {
        //             Authorization: `Bearer ${this.authToken}`,
        //         };
        //         const res = await axios.get(baseurl + `api/v1/accounts/${id}`, { headers });
        //         if(res?.status==200){
        //             this.AccountsId = res?.data;
        //             this.LoadingData = false;
        //         }else throw new Error(res?.data?.message);

        //     }catch(err){
        //         errorAlert(err);
        //         this.LoadingData = false;
        //     }
        // },

        // async FetchUpdateAccounts(id){
        //     await this.initializeToken(); 
        //     try{
        //         this.loadingData = true;
        //         const headers = {
        //             Authorization: `Bearer ${this.authToken}`,
        //         };
        //         const res = await axios.patch(baseurl + `api/v1/accounts/${id}`, null, { headers });
        //         if(res.status == 200){
        //             successAlert('successful')
        //             this.loadingData =false;
        //         }else throw new Error(res?.data?.message)
        //     }catch(err){
        //         errorAlert(err);
        //         this.loadingData =false;
        //     }
        // },

        // async FetchAccountsByClient(id){
        //     await this.initializeToken();
        //     try{
        //         this.loadingData = true;
        //         const headers = {
        //             Authorization: `Bearer ${this.authToken}`,
        //         };
        //         const res = await axios.get(baseurl + `api/v1/accounts/by-client/${id}`, { headers });
        //         if(res.status == 200){
        //             this.accountBYclient = res?.data
        //             successAlert('successful')
        //             this.loadingData =false;
        //         }else throw new Error(res?.data?.message)
        //     }catch(err){
        //         errorAlert(err);
        //         this.loadingData =false;
        //     }
        // },
    }
})

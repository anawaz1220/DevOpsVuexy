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

export const useMaterialsStore = defineStore('materials', {
    state: () => ({
        LoadingData: false,
        allMaterials:[],
        addingLoad:false,
        authToken: null,
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
        async fetchAllMaterials(){
            await this.initializeToken(); // Ensure token initialization is complete
            try{
                this.LoadingData =true;
                const headers = {
                    Authorization: `Bearer ${this.authToken}`,
                };
                const res =await axios.get(`/materials`, { headers });
                if(res?.status==200){
                    this.LoadingData=false;
                    this.allMaterials =res?.data;
                }else throw new Error(res?.data?.message);
            }catch(res){
                errorAlert(res?.response?.data?.message)
                this.LoadingData =false;
            }
        },
        async addNewMaterial(payload){
            await this.initializeToken(); // Ensure token initialization is complete
            try{
                this.addingLoad =true;
                const headers = {
                    Authorization: `Bearer ${this.authToken}`,
                };
                const res= await axios.put(`/materials/board-rate`,payload, { headers });
                if(res?.status==201){
                    this.addingLoad=false;
                    successAlert("Material Added");
                }else throw new Error(res?.data?.message);
            }catch(res){
                errorAlert(res?.response?.data?.message)
                this.addingLoad=false;
            }
        },

        // add a new material type  (post api)
        async addNewMaterialType(payload){
            await this.initializeToken(); // Ensure token initialization is complete
            try{
                this.addingLoad =true;
                const headers = {
                    Authorization: `Bearer ${this.authToken}`,
                };
                console.log(payload, 'before request-js');
                const res= await axios.post(`/materials`,payload, { headers });
                if(res?.status==201){
                    this.addingLoad=false;
                    successAlert("New material added ");
                }else throw new Error(res?.data?.message);
            }catch(res){
                errorAlert(res?.response?.data?.message)
                this.addingLoad=false;
                }
            },
            // add update client rate of matarial (put api)
            async addClientRate(payload){
                await this.initializeToken(); // Ensure token initialization is complete
                try{
                    this.addingLoad =true;
                    const headers = {
                        Authorization: `Bearer ${this.authToken}`,
                    };
                    const res= await axios.put(`/materials/client-rate`,payload, { headers });
                    if(res?.status==201||res.status==200){
                        this.addingLoad=false;
                        successAlert("client rate Added");
                        return [res,null]
                    }else throw new Error(res?.data?.message);
                }catch(res){
                    console.log("error in updating client rate",res)
                    errorAlert(res?.response?.data?.message)
                    this.addingLoad=false;
                        return [null,res]
                }
            },
            async addBoardRate(payload){
                await this.initializeToken(); // Ensure token initialization is complete
                try{
                    this.addingLoad =true;
                    const headers = {
                        Authorization: `Bearer ${this.authToken}`,
                    };
                    const res= await axios.put(`/materials/board-rate`,payload, { headers });
                    if(res?.status==201||res.status==200){
                        this.addingLoad=false;
                        successAlert("Board rate Added");
                        return [res,null]
                    }else throw new Error(res?.data?.message);
                }catch(res){
                    console.log("error in updating board rate",res)
                    errorAlert(res?.response?.data?.message)
                    this.addingLoad=false;
                        return [null,res]
                }
            },
        }
    
})

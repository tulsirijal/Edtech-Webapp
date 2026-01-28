import axios from 'axios';

// Force the adapter to XHR to bypass the Fetch detection logic
axios.defaults.adapter = 'xhr';
export const axiosInstance = axios.create({});
export const apiConnector = (method,url,bodyData,headers,params)=>{
     return axiosInstance({
        method:method,
        url:url,
        data:bodyData ? bodyData : null,
        headers:headers ? headers : null ,
        params:params ? params : null,
     })
}
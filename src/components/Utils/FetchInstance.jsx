import { jwtDecode as jwt_decode } from "jwt-decode";
import dayjs from 'dayjs';



let originalRequest = async (url, config)=> {
    url = `${url}`
    let response = await fetch(url, config)
    let data = await response.json()
    return {response, data}
}



const getRefreshToken = async (refreshToken) => {
    const clientId = localStorage.getItem('isClientId');

    const url = "https://accounts.spotify.com/api/token";
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: clientId
       }),
     }
     const body = await fetch(url, payload);
     const response =  await body.json();
     localStorage.setItem('access_token', response.accessToken);
     localStorage.setItem('refresh_token', response.refreshToken);
     return response.refreshToken;
   }



// let refreshToken = async (authTokens) => {

//     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify({'refresh':authTokens.refresh})
//     })
//     let data = await response.json()
//     localStorage.setItem('authTokens', JSON.stringify(data))
//     return data
// }


let FetchInstance = async (url, config={}) => {
    let authTokens = localStorage.getItem('access_token') || null;
    let { response, data } = await originalRequest(url, {...config,headers:{...config.headers, "Authorization": `Bearer ${authTokens}`}});
        console.log("response",response)
    if (response.status === 401 ) {

        console.log("status",response.status)
        if (!authTokens) {
            console.error('Access token not found in local storage');
            return { response: null, data: null };
        }

        authTokens = await getRefreshToken(authTokens);

        let newResponse = await originalRequest(url, {...config,headers:{...config.headers, "Authorization": `Bearer ${authTokens}`}});

        response = newResponse.response;
        data = newResponse.data;
    }

    return { response, data };
};

export default FetchInstance;

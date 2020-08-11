import axios from 'axios'
import qs from 'qs'

//const BASEURL = process.env.NODE_ENV === "production"?"https://www.xxx.com":""
const BASEURL = "https://www.xxx.com"
let request = axios.create({
    baseUrl:BASEURL,
    timeout:5000
})

request.interceptors.request.use(
    config=>{
        config.headers.token = localStorage.getItem("token");
        return config;
    },
    err=>Promise.reject(err)
)

request.interceptors.response.use(
    res=>{
        return res;
    },
    err=>Promise.reject(err)
)

request.postURL = function(url,data,option={}){
    return new Promise(function(resolve,reject){
        request({
            url:url,
            method:"POST",
            data:qs.stringify(data),
            ...option,
            headers:{
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                ...option.headers
            }
        }).then(res=>resolve(res)).catch(err=>reject(err))
    })
}


function jsonp(url,option){
    var DEFAULT = {jp:"callback",callback:"jp"};
    option = Object.assign(DEFAULT);
    return new Promise((resolve,reject)=>{
        if(url.indexOf(option.jp)==-1){
            url += "&"+option.jp+"="+option.callback;
        }
        var p1 = url.indexOf(option.jp);
        var p2 = url.indexOf("&",p1)==-1?url.length:url.indexOf("&",p1);

        callback = url.slice(p1+option.jp.length+1,p2);

        window[callback] = function(data){
            document.body.removeChild(script);
            resolve(data);
        }

        var script = document.createElement("script");
        script.src = url;
        document.body.append(script);

        script.onerror = function(e){
            document.body.removeChild(script);
            reject(e)
        }
    })
}

request.jsonp = jsonp;

export default request;
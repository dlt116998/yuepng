import request from '@/utils/request.js'

import {mock} from './mock.js'

let getVerify = data => request.get("https://www.xxx.com/verify/data");

let Login = data => request.postURL("/member/index_login2.php",data);

let Exit = () => request.postURL("/member/index_login2.php",{dopost:"exit"});

let getUser = data => request.postURL("/member/ajax_login.php",data);

export {getVerify,Login,Exit,getUser}
import request from '@/utils/request.js'

import {mock} from './mock.js'

let getGoods = data => request.get("https://www.xxx.com/home/data",data); //首页信息
 
let getShops = data => request.get("https://www.xxx.com/shop/data",data); // 门店管理

let getRefund = data => request.get("https://www.xxx.com/refund/data",data); //退款页面

let getRole = data => request.get("https://www.xxx.com/role/data",data); // 角色管理

let getActivity = data => request.get("https://www.xxx.com/activity/data",data); // 添加活动商品

let getActive = data => request.get("https://www.xxx.com/active/data") //活动列表

let sGood = data => request.get("https://www.xxx.com/sgood/data",data)

export {getGoods,getShops,getRefund,getRole,getActivity,getActive,sGood}
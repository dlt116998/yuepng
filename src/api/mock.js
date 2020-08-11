import mock from 'mockjs'

mock.mock("https://www.xxx.com/home/data",{
    "result|50":[
        {
            // "id":"@guid",
            "order_num":"@id()",
            "create_at":"@datetime",
            "total_amount|100-500.2":100,
            "customer_total_amount|100-500.2":100,
            "storeld":"@natural(1000,9999)",
            "order_status|1":["已完成","已退款","待付款","待收货","待发货","待退款"],
            "deliver_status|1":["pending","accepted","sent","received","returned"],
            "confirmed_at":"@datetime",
            "deleted":"@boolean",
            "customerld":"@email",
            "consignee":"@cname",
            "type|1":["自提","配送"],
            "phone":/^1[3578]\d{9}$/,
            "shipping_address":"@county(true)",
            "city":"@city",
            "payment_code|1":["pending","authorized","paid","partiallyRefuned","refunded","voided"],
            "pickup_in_store":"@boolean"
        }
    ]
})

mock.mock("https://www.xxx.com/shop/data",{
    "result|50":[
        {
            "shop_name|1":["阿迪达斯店","耐克专卖店","三只松鼠店","猪肉店","牛肉店","不知道卖什么的店","假装有名字店","小米专卖店","华为专卖店","OPPO专卖店","vivo专卖店"],
            "formats":"大卖场",
            "address":"@county(true)",
            "start_time":"8:00",
            "end_time":"20:00",
            "inline":"@boolean"
        }
    ]
})

mock.mock("https://www.xxx.com/refund/data",{
    "result|50":[
        {
            "order_num":/^313\d{6}$/,
            "start_time":"@datetime",
            "user_num":/^1[3578][1-9]\d{8}$/,
            "price|100-500.2":100,
            "status|1":["待处理","已处理","已拒绝"],
            "end_time":"@datetime",
            "num":"@id()"
        }
    ]
})

mock.mock("https://www.xxx.com/role/data",{
    "code":200,
    "result|50":[
        {
            "id":"@id",
            "id_num|1":[1,2,3,4],
            "name|1":["运营后台","商品管理","发布商品","平台商品列表","前台分类管理"],
            "icon|1":["el-icon-s-home","el-icon-setting","el-icon-price-tag"],
            "url|1":["admin","detail","update","product/list"],
            "text|1":["总部后台运营管理","运营后台负责项目管理上线"],
            "type|1":["应用","菜单"],
            "key|1":[123,789,456,147,258,369],
            
        }
    ]
})

mock.mock("https://www.xxx.com/activity/data",{
    "code":200,
    "result|2":[
        {
            "good_num":/^10000\d{2}$/,
            "sku":/^6900\d{8}$/,
            "img_url":"@image('60x60')",
            "good_name|1":["北京烤鸭","澳大利亚烤羊腿","法国披萨"],
            "price|100-500":100,
            "z_price":100,
            "bili":0,
            "buy":10,
            "all":1000,
            "flag":false
        }
    ]
})

mock.mock("https://www.xxx.com/active/data",{
    "result|50":[
        {
            "type|1":["社群团购","折扣","直降"],
            "active_num":/^10202020\d{4}$/,
            "name|1":["六一儿童节大优惠","五一劳动节大优惠","十一国庆大优惠","中秋大优惠"],
            "start_time":"@datetime",
            "end_time":"@datetime",
            "status|1":["进行中","待开始","已结束"]
        }
    ]
})

mock.mock("https://www.xxx.com/verify/data",{
    "num":/^\d{5}$/
})

mock.mock("https://www.xxx.com/sgood/data",{
    "result|50":[
        {
            "img_url":"@image('40x40')",
            "name":"这个商品叫肉弹葱鸡",
            "price|100-200":100,
            "num|100-999":100,
            "moon|1-999":100,
            "sku":/^69\d{10}$/,
            "flag":"@boolean",
            "disabled":true,
            "shop":"@city",
            "good_num":/^69\d{8}$/
        }
    ]
    
})

export {mock}
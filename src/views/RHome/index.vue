<template>
    <div class="rhome">
        <div class="top tl">
            <div class="r-title">
                <span class="line"></span>待处理
            </div>
            <div class="r-content clearfix">
                <div class="fl">
                    <table>
                        <tr>
                            <td rowspan="2">
                                <div class="round">
                                    <img src="../../assets/img/shouhuo.png" alt="">
                                </div>
                            </td>
                            <td>
                                待付款订单
                            </td>
                        </tr>
                        <tr>
                            <td class="r-num">8515</td>
                        </tr>
                    </table>
                </div>
                <div class="fl">
                    <table>
                        <tr>
                            <td rowspan="2">
                                <div class="round">
                                    <img src="../../assets/img/daichuli.png" alt="">
                                </div>
                            </td>
                            <td>
                                待发货订单
                            </td>
                        </tr>
                        <tr>
                            <td class="r-num">8515</td>
                        </tr>
                    </table>
                </div>
                <div class="fl">
                    <table>
                        <tr>
                            <td rowspan="2">
                                <div class="round">
                                    <img src="../../assets/img/daishouhuo.png" alt="">
                                </div>
                            </td>
                            <td>
                                待收货订单
                            </td>
                        </tr>
                        <tr>
                            <td class="r-num">8515</td>
                        </tr>
                    </table>
                </div>
                <div class="fl">
                    <table>
                        <tr>
                            <td rowspan="2">
                                <div class="round">
                                    <img src="../../assets/img/tuikuan.png" alt="">
                                </div>
                            </td>
                            <td>
                                待退款订单
                            </td>
                        </tr>
                        <tr>
                            <td class="r-num">8515</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="r-title clearfix">
                <div class="fl">
                    <span class="line"></span>销售总览
                </div>
                <div class="fl">
                    <span class="line"></span>活动总览
                </div>
            </div>
            <div class="r-content clearfix">
                <div class="fl ">
                    <div class="bg-blue">
                        <img src="../../assets/img/blue-logo.png" alt="" class="pic">
                        <span>2065</span>
                        <p>今日订单</p>
                    </div>
                </div>
                <div class="fl ">
                    <div class="bg-pink">
                        <img src="../../assets/img/pink-logo.png" alt="" class="pic">
                        <span>56211</span>
                        <p>今日销售总额（元）</p>
                    </div>
                </div>
                <div class="fl ">
                    <div class="bg-green">
                        <img src="../../assets/img/green-logo.png" alt="" class="pic">
                        <span>152265</span>
                        <p>今日活动订单</p>
                    </div>
                </div>
                <div class="fl ">
                    <div class="bg-yellow">
                        <img src="../../assets/img/yellow-logo.png" alt="" class="pic">
                        <span>21635</span>
                        <p>今日活动销售额（元）</p>
                    </div>
                </div>
            </div>
            <div class="r-title clearfix">
                <div class="fl">
                    <span class="line"></span>新品总览
                </div>
                <div class="fl">
                    <span class="line"></span>用户总览
                </div>
            </div>
            <div class="foot">
                <div class="fl">
                    <div class="fl box">
                        <h2>2159</h2>
                        已下架
                    </div>
                    <div class="fl box">
                        <h2>52163</h2>
                        已上架
                    </div>
                    <div class="fl box">
                        <h2>21</h2>
                        活动商品
                    </div>
                    <div class="fl box">
                        <h2>999999</h2>
                        全部商品
                    </div>
                </div>
                <div class="fl">
                    <div class="fl box">
                        <h2>25</h2>
                        新增
                    </div>
                    <div class="fl box">
                        <h2>568</h2>
                        昨日新增
                    </div>
                    <div class="fl box">
                        <h2>5462</h2>
                        本月新增
                    </div>
                    <div class="fl box">
                        <h2>16</h2>
                        用户天数
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="less" scoped>
.rhome{
    padding: 12px;
    .foot{
        &>.fl{
            width: 49%;
            min-width: 570px;
            height: 120px;
            margin-left: 12px;
            margin-top: 12px;
            padding-top: 30px;
            background-color: #e0e0e0;
            border-radius: 6px;
            .box{
                width: 25%;
                text-align: center;
                h2{
                    font-size: 26px;
                    margin-bottom: 6px;
                }
            }
        }
    }
    .r-content{
        width: 100%;
        .fl{
            width: 25%;
            min-width: 220px;
            padding: 20px 16px;
            
            div{
                position: relative;
                width: 100%;
                height: 100px;
                border-radius: 8px;
                background-repeat: no-repeat;
                background-position: 180px 20px;
                background-size: 110px 90px;
                p{
                    color: #ffffff;
                    text-indent: 5em;
                    position: absolute;
                    bottom: 22px;
                }
                img.pic{
                    vertical-align: middle;
                    margin-bottom: 10px;
                    margin-left: 32px;
                }
                span{
                    font-size: 30px;
                    color: #ffffff;
                    line-height: 70px;
                    margin-left: 12px;
                }
                &.bg-blue{
                    background-color: #6695ef;
                    background-image: url("../../assets/img/1.png");
                }
                &.bg-pink{
                    background-color: #f778a1;
                    background-image: url("../../assets/img/2.png");
                }
                &.bg-green{
                    background-color: #29a5ac;
                    background-image: url("../../assets/img/3.png");
                }
                &.bg-yellow{
                    background-color: #fda35b;
                    background-image: url("../../assets/img/4.png");
                }
            }
            .r-num{
                font-size: 30px;
                font-weight: 700;
            }
            .round{
                width: 80px;
                height: 80px;
                background-color: #eaedf4;
                border-radius: 50%;
                text-align: center !important;
                line-height: 80px !important;
                margin-right: 20px;
                margin-left: 10px;
            }
        }
    }
    .r-title{
        font-size: 16px;
        font-weight: 700;
        line-height: 20px;
        padding-left: 16px;
        .fl{
            width: 50%;
        }
        .line{
            display: inline-block;
            width: 4px;
            height: 20px;
            background-color: #409EFF;
            vertical-align: bottom;
            margin-right: 10px;
        }
    }
}
</style>
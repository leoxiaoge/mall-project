<template>
	<view class="container">
    <view class="order-status">
      <view class="order-status-img">
        <img :src="icon" />
      </view>
      <view class="order-status-text">
        <view class="order-status-name">{{order.OrderStatusName}}</view>
        <view class="order-status-toast">请在24小时内付款</view>
      </view>
    </view>
    <view class="order-address" @click="addressPath">
      <view class="order-address-content">
        <view class="order-address-user">
          <text class="order-address-name">{{address.realName}}</text>
          <text class="order-address-mobile">{{address.Mobile}}</text>
        </view>
        <view class="order-address-content">
          <text>{{address.Province}}</text>
          <text>{{address.City}}</text>
          <text>{{address.Area}}</text>
          <text>{{address.Address}}</text>
        </view>
      </view>
      <view class="arrowright">
        <uni-icon type="arrowright" size="24" />
      </view>
    </view>
    <view class="order-toast">
      <text>温馨提示：信息确认后不可修改</text>
    </view>
    <view class="order-product">
      <view class="order-product-img">
        <img :src="order.ProductPicList[0]" />
      </view>
      <view class="order-product-content">
        <view class="order-product-head">
          <view class="order-product-name">{{order.ProductName}}</view>
          <view class="order-product-num">x1</view>
        </view>
        <view class="order-product-status">
          <view class="order-product-status-btn">{{order.OrderStatus}}</view>
        </view>
        <view class="order-product-price">
          <view class="order-product-money">成交价：{{order.OrderMoneys}}</view>
          <view class="order-product-cost">小计：¥{{order.OrderPrimeCost}}</view>
        </view>
      </view>
    </view>
    <view class="order-product-total">
      <text>合计：¥{{order.OrderPrimeCost}}</text>
    </view>
    <view class="order-information">
      <view class="order-information-head">
        <view class="i-label"></view>
        <view class="order-information-text">订单信息</view>
      </view>
      <view class="order-information-item i-flex-between">
        <view class="order-information-order-id">
          <text>订单编号：{{order.OrderID}}</text>
          <text></text>
        </view>
        <view class="order-information-copy" @click="setClipboard(order.OrderID)">
          <text>复制</text>
        </view>
      </view>
      <view class="order-information-item">
        <text>创建时间：{{order.Created}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>支付方式：{{order.PayType === 1 ? '微信' : '其他'}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>交易时间：{{order.Updated}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>交易号：{{order.PayOrderNO}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>货运单号：{{order.ExpressNo}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>发货时间：{{order.SendGoodsDate}}</text>
        <text></text>
      </view>
      <view class="order-information-item">
        <text>货运公司：{{order.ExpressName}}</text>
        <text></text>
      </view>
    </view>
    <view class="order-express">
      <view class="order-express-head">
        <view class="i-label"></view>
        <view class="order-express-information">物流信息</view>
      </view>
      <view class="order-express-content">
        <uni-steps :options="order.LocusesList" :active="active" direction="column" />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
  import { OrderListGet } from '@/common/config/api'
  import uniIcon from '@/components/uni-icon/uni-icon.vue'
  import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default Vue.extend({
    components: {
      uniIcon,
      uniSteps
		},
		data() {
			return {
        active: 0,
        OrderID: '',
        icon: '',
        order: [],
        address: []
			}
		},
		onLoad(options: any) {
      this.OrderID = options.id
			this.getOrderList()
      console.log('onLoad', options)
		},
		methods: {
			getOrderList() {
        let OrderID = this.OrderID
				let data = {
					OrderID: OrderID
        }
		  	request(OrderListGet, data).then((res: any) => {
          console.log(res.OrderList[0])
          let orderList: any = res.OrderList[0]
          this.order = orderList
          this.address = orderList.Address
          if (orderList.OrderStatus === 0) {
            this.icon = '/static/icon/icon_order-status1.png'
          } else if (orderList.OrderStatus === 1) {
            this.icon = '/static/icon/icon_order-status2.png'
          } else if (orderList.OrderStatus === 2) {
            this.icon = '/static/icon/icon_order-status3.png'
          } else if (orderList.OrderStatus === 3) {
            this.icon = '/static/icon/icon_order-status4.png'
          } else {
            this.icon = '/static/icon/icon_order-status5.png'
          }
        })
      },
      // 复制事件
      setClipboard(data: any) {
				console.log(data)
				uni.setClipboardData({
					data: data,
					success: () => {
						console.log('success');
					}
				});
      },
      addressPath() {
        navigateTo('../addressShipping/addressShipping')
      }
		}
	})
</script>

<style>
  .i-label {
    width: 9upx;
    height: 22upx;
    background-color: #fe7f00;
  }
	.order-status {
    display: flex;
    align-items: center;
    min-height: 120upx;
    background-color: #fe9400;
    padding: 30upx 0;
  }
  .order-status-img {
    width: 100upx;
    height: 100upx;
    margin-left: 40upx;
  }
  .order-status-img img {
    width: 100%;
    height: 100%;
  }
  .order-status-text {
    margin-left: 20upx;
  }
  .order-status-name {
    font-size: 34upx;
    color: #fff;
  }
  .order-status-toast {
    font-size: 28upx;
    color: #fff8ee;
  }
  .order-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20upx 30upx;
    font-size: 36upx;
  }
  .order-address-mobile {
    margin-left: 50upx;
  }
  .order-toast {
    padding: 10upx 30upx;
    border-top: 2upx solid #f4f4f4;
    border-bottom: 2upx solid #f4f4f4;
  }
  .order-toast text {
    font-size: 28upx;
    color: #fe9400;
  }
  .order-product {
    display: flex;
    align-items: center;
    padding: 20upx 30upx;
  }
  .order-product-content {
    width: 80%;
    margin-left: 20upx;
  }
  .order-product-img {
    width: 120upx;
    height: 100upx;
  }
  .order-product-img img {
    width: 100%;
    height: 100%;
  }
  .order-product-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .order-product-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .order-product-cost {
    color: #fe7f00;
    font-weight: 600;
  }
  .order-product-total {
    padding: 10upx 30upx;
    background-color: #e9e9e9;
  }
  .order-product-total text {
    font-size: 36upx;
    font-weight: 600;
    color: #373737;
  }
  .order-information {
    padding: 0 30upx;
  }
  .order-information-head {
    display: flex;
    align-items: center;
    margin: 20upx 0;
  }
  .order-information-text {
    margin-left: 10upx;
    font-weight: 600;
  }
  .order-information-item {
    margin-left: 20upx;
    line-height: 2.4;
  }
  .order-express {
    padding: 20upx 30upx;
    border-top: 2upx solid #f4f4f4;
  }
  .order-express-head {
    display: flex;
    align-items: center;
  }
  .order-express-information {
    margin-left: 20upx;
    font-weight: 600;
  }
  .order-express-content {
    margin-right: 20upx;
  }
</style>

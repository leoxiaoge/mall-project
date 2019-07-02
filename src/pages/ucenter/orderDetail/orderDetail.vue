<template>
	<view class="container">
    <view class="order-status">
      <view class="">
        <img :src="src" />
      </view>
      <view class="">
        <view class="">{{order.OrderStatusName}}</view>
        <view class=""></view>
      </view>
    </view>
    <view class="">
      <view class="">
        <view class="">
          <text>{{order.Address.realName}}</text>
          <text>{{order.Address.Mobile}}</text>
        </view>
        <view class="">
          <text>{{order.Address.Province}}</text>
          <text>{{order.Address.City}}</text>
          <text>{{order.Address.Area}}</text>
          <text>{{order.Address.Address}}</text>
        </view>
      </view>
      <view class=""></view>
    </view>
    <view class="">
      <text>温馨提示：信息确认后不可修改</text>
    </view>
    <view class="">
      <view class="">
        <img :src="order.ProductPicList[0]" />
      </view>
      <view class="">
        <view class="">
          <view class="">{{order.ProductName}}</view>
          <view class="">x1</view>
        </view>
        <view class="">
          <view class="">{{order.OrderStatus}}</view>
        </view>
        <view class="">
          <view class="">成交价：{{order.OrderMoneys}}</view>
          <view class="">小计：¥{{order.OrderPrimeCost}}</view>
        </view>
      </view>
    </view>
    <view class="">
      <text>合计：¥{{order.OrderPrimeCost}}</text>
    </view>
    <view class="">
      <view class="">
        <view class=""></view>
        <view class="">订单信息</view>
      </view>
      <view class="">
        <view class="">
          <text>订单编号：{{order.OrderID}}</text>
          <text></text>
        </view>
        <view class="">复制</view>
      </view>
      <view class="">
        <text>创建时间：{{order.Created}}</text>
        <text></text>
      </view>
      <view class="">
        <text>支付方式：{{order.PayType === 1 ? '微信' : '其他'}}</text>
        <text></text>
      </view>
      <view class="">
        <text>交易时间：{{order.Updated}}</text>
        <text></text>
      </view>
      <view class="">
        <text>交易号：</text>
        <text></text>
      </view>
      <view class="">
        <text>货运单号：</text>
        <text></text>
      </view>
      <view class="">
        <text>发货时间：{{order.SendGoodsDate}}</text>
        <text></text>
      </view>
      <view class="">
        <text>货运公司：</text>
        <text></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { OrderListGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
        OrderID: '',
        order: []
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
          this.order = res.OrderList[0]
        })
			}
		}
	})
</script>

<style>
	
</style>

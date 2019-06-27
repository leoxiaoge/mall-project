<template>
	<view class="container">
    <view class="teng-recharge">
      <view class="teng-recharge-item" :class="{'teng-recharge-item-active':payIndex == index}" v-for="(item, index) in payList" :key="index" @click="changePayment(index)">
        <view class="teng-recharge-price">{{item.PayMoney}}元</view>
        <view class="teng-recharge-description" v-if="item.VirtualMoney">兑{{item.VirtualMoney}}个入场券</view>
      </view>
    </view>
    <view class="teng-recharge-bottom teng-flex-between">
      <view class="teng-recharge-total-price">
        <text>支付金额：</text>
        <text class="teng-recharge-total-price-number">¥{{payMoney}}</text>
      </view>
      <button class="btn payment-btn bg-gradual-orange" @click="payment">支付</button>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { PayMoneyListGet, PayMoneySubmit } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
        payList: [],
        payIndex: 0,
        MoneyID: '', // 支付金额对应的ID
        payMoney: '',
        PayTypeID: 1, // 支付方式ID 微信小程序支付传1
        OpenID: '', // OpenID
			}
		},
		onLoad(options) {
			this.getPayMoneyList()
      console.log('onLoad', options)
		},
		methods: {
			getPayMoneyList() {
				let data = {}
		  	request(PayMoneyListGet, data).then((res: any) => {
          console.log(res)
          this.payList = res.PayMoneyList
          this.MoneyID = res.PayMoneyList[0].ID
          this.payMoney = res.PayMoneyList[0].PayMoney
        })
      },
      // 选择支付金额
      changePayment(index: any) {
        this.payIndex = index
        let payList: any = this.payList
        let intemIndex:any = payList[index].ID
        this.MoneyID = intemIndex
        console.log(intemIndex)
        this.payMoney = payList[index].PayMoney
      },
      // 支付API
      payment() {
        let MoneyID = this.MoneyID
        let PayTypeID = this.PayTypeID
        let OpenID = this.OpenID
        let data = {
          MoneyID: MoneyID,
          PayTypeID: PayTypeID,
          OpenID: OpenID
        }
		  	request(PayMoneySubmit, data).then((res: any) => {
          console.log(res)
        })
      }
		}
	})
</script>

<style>
  page {
    background-color: #fff;
  }

	.teng-recharge {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20upx 10upx;
  }

  .teng-recharge-item {
    width: calc(33.33% - 30upx);;
    color: #333;
    background-color: #fff;
    border-radius: 20upx;
    text-align: center;
    padding: 40upx 0;
    border: 2upx solid #f4f4f4;
  }

  .teng-recharge-item-active {
    color: #fff;
    background-color: #ff8300
  }

  .teng-recharge-item-active .teng-recharge-price {
    color: #fff
  }

  .teng-recharge-item-active .teng-recharge-description {
    color: #fff
  }

  .teng-recharge-price {
    font-size: 36upx;
    color: #333;
  }

  .teng-recharge-description {
    font-size: 24upx;
    color: #5a5a5a
  }

  .teng-recharge-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100upx;
    background-color: #f4f4f4;
  }

  .teng-recharge-total-price {
    font-size: 32upx;
    padding: 0 30upx;
  }

  .teng-recharge-total-price-number {
    color: #ff0000
  }

  .payment-btn {
    width: 240upx;
    margin: 0;
    border: none;
    border-radius: 0;
    line-height: 100upx;
  }
</style>

<template>
  <view class="content">
    <swiper class="swiper" :autoplay="autoplay" :duration="duration" @change="change">
      <swiper-item v-for="(item, index) in swiper" :key="index">
        <view class="swiper-item">
          <view class="swiper-item-img">
            <img :src="item.AdPicUrl" mode="aspectFit" />
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="jump-over" v-if="!show" @tap="launchFlag()">
      <view class="wrapper">
        <view class="circleProgress circle"></view>
        <view class="jump-over-text">{{jumpover}}</view>
      </view>
    </view>
    <view class v-else>
      <button class="experience" @tap="launchFlag()">{{experience}}</button>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { switchTab } from "@/common/utils/util";
import { AdsListGet } from "@/common/config/api";
export default Vue.extend({
  data() {
    return {
      autoplay: false,
      duration: 500,
      current: 0,
      show: false,
      jumpover: "跳过",
      experience: "进入应用",
      swiper: [
        {
          AdPicUrl: "http://lcbblog.com/images/img/title_01.png"
        },
        {
          AdPicUrl: "http://lcbblog.com/images/img/title_01.png"
        },
        {
          AdPicUrl: "http://lcbblog.com/images/img/title_01.png"
        }
      ]
    };
  },
  onLoad(options: any) {
    this.loadExecution();
  },
  methods: {
    loadExecution() {
      try {
        let value: any = uni.getStorageSync("launchFlag");
        if (value) {
          switchTab("/pages/index/home");
        }
      } catch (e) {
        console.log(e)
      }
    },
    change(e: any) {
      this.current = e.target.current;
      if (this.current + 1 === this.swiper.length) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    launchFlag() {
      uni.setStorageSync("launchFlag", true);
      switchTab("/pages/index/home");
    }
  }
});
</script>

<style>
page,
.content {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.swiper-item {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
}

.swiper-item-img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.swiper-item-img img {
	width: 100%;
	height: 100%;
}

.jump-over,
.experience {
  position: absolute;
  height: 70upx;
  line-height: 70upx;
  border-radius: 60upx;
  font-size: 32upx;
  color: #454343;
  z-index: 999;
}

.jump-over {
  width: 100upx;
  height: 100upx;
  line-height: 80upx;
  font-size: 28upx;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  right: 45upx;
  top: 60upx;
}

.jump-over-text {
  font-size: 28upx;
	text-align: center;
	line-height: 100upx;
  color: #fff;
  z-index: 999;
}

.experience {
  left: 50%;
  transform: translateX(-50%);
  bottom: 80upx;
	color: #fff;
	background: linear-gradient(45deg, #eba866, #fe7f00);
  padding: 0 40upx;
}

.circleProgress {
  width: 100upx;
  height: 100upx;
  border: 4upx solid rgb(232, 232, 12);
  border-radius: 50%;
  color: #fff;
  position: absolute;
  top: 0;
  -webkit-transform: rotate(45deg);
}
.circle {
  border-top: 4upx solid #fe7f00;
  border-right: 4upx solid #fe7f00;
  right: 0;
  -webkit-animation: circleProgressLoad_right 5s linear infinite;
}
@-webkit-keyframes circleProgressLoad_right {
  0% {
    border-top: 4upx solid #fe7f00;
    border-right: 4upx solid #fe7f00;
    -webkit-transform: rotate(45deg);
  }
  50% {
    border-top: 4upx solid rgb(232, 232, 12);
    border-right: 4upx solid rgb(232, 232, 12);
    border-left: 4upx solid rgb(81, 197, 81);
    border-bottom: 4upx solid rgb(81, 197, 81);
    -webkit-transform: rotate(225deg);
  }
  100% {
    border-left: 4upx solid #fe7f00;
    border-bottom: 4upx solid #fe7f00;
    -webkit-transform: rotate(225deg);
  }
}
</style>
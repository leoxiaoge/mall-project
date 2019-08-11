<template name="redflower-showTips">
  <view>
    <view class="tipsWrap" v-if="showTips">
      <view class="arrow"></view>
      <view class="tipsContent">
        <text class="tipsText">添加到我的小程序，下次使用更便捷</text>
        <text class="closeIcon" @tap="closeTips()">X</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "showTips",
  data() {
    return {
      isFirst: true, //是否首次
      showTips: false //是否展示
    };
  },

  created() {
    let cache = uni.getStorageSync("isFirst");
    if (cache) {
      this.showTips = false;
    } else {
      this.showTips = true;
      setTimeout(() => {
        this.showTips = false;
      }, 5000);
    }
  },

  methods: {
    closeTips() {
      this.showTips = false;
      uni.setStorageSync("isFirst", true);
    }
  }
});
</script>

<style>
.tipsWrap {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 600rpx;
  animation: rotate 0.9s linear infinite;
}

@keyframes rotate {
  0% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(2rpx);
  }

  50% {
    transform: translateY(5rpx) scale(1.01, 0.99);
  }

  75% {
    ransform: translateY(2rpx);
  }

  100% {
    transform: translateY(0);
  }
}

.arrow {
  width: 0;
  height: 0;
  margin-right: 120rpx;
  border-width: 10rpx;
  border-style: solid;
  border-color: transparent transparent #fe083e transparent;
}

.tipsContent {
  background: linear-gradient(45deg, #fe7f00, #fe083e);
  box-shadow: 0 10rpx 20rpx -10rpx #a8a8a8;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56rpx;
  padding: 0 10rpx 0 15rpx;
  margin-right: 40rpx;
}

.tipsText {
  color: #f4f4f4;
  font-size: 24rpx;
}

.closeIcon {
  font-size: 20rpx !important;
  margin-left: 10rpx;
  padding: 0 8rpx;
  color: #fe083e;
  background: #f4f4f4;
  border-radius: 12rpx;
}
</style>
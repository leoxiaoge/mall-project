<template>
  <view class="mask-show" :class="(show?'show':'hide')">
    <view
      :style="{ top: offsetTop + 'px' }"
      class="uni-mask mask"
      @click="hide"
      @touchmove.stop.prevent="moveHandle"
    />
    <view
      :class="'uni-popup-' + position + ' ' + 'uni-popup-' + mode"
      class="uni-popup mask-content"
    >
      <view class="i-content">
        <text class="i-msg">{{ msg }}</text>
        <view class="i-textarea">
          <textarea @blur="bindTextAreaBlur" placeholder="请写下您的宝贵意见" />
        </view>
        <view class="i-feedback">
          <button class="btn i-feedback-button" @click="submit">提交</button>
        </view>
      </view>
      <slot />
      <view
        v-if="position === 'middle' && mode === 'insert'"
        :class="{
          'uni-close-bottom': buttonMode === 'bottom',
          'uni-close-right': buttonMode === 'right'
        }"
        class="uni-icon uni-icon-close"
        @click="closeMask"
      />
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, showToast } from "@/common/utils/util";
import { UserFeedbackSubmit } from "@/common/config/api";
export default Vue.extend({
  name: "UniPopup",
  props: {
    /**
     * 页面显示
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 对齐方式
     */
    position: {
      type: String,
      // top - 顶部， middle - 居中, bottom - 底部
      default: "middle"
    },
    /**
     * 显示模式
     */
    mode: {
      type: String,
      default: "insert"
    },
    /**
     * 额外信息
     */
    msg: {
      type: String,
      default: ""
    },
    /**
     * h5遮罩是否到顶
     */
    h5Top: {
      type: Boolean,
      default: false
    },
    buttonMode: {
      type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      offsetTop: 0,
      FeedbackContent: ""
    };
  },
  watch: {
    h5Top(newVal: any) {
      if (newVal) {
        this.offsetTop = 44;
      } else {
        this.offsetTop = 0;
      }
    }
  },
  created() {
    let offsetTop = 0;
    // #ifdef H5
    if (!this.h5Top) {
      offsetTop = 44;
    } else {
      offsetTop = 0;
    }
    // #endif
    this.offsetTop = offsetTop;
  },
  methods: {
    hide() {
      if (this.mode === "insert" && this.position === "middle") return;
      this.$emit("hidePopup");
    },
    closeMask() {
      if (this.mode === "insert") {
        this.$emit("hidePopup");
      }
    },
    moveHandle() {},
    bindTextAreaBlur(e: any) {
      console.log(e);
      this.FeedbackContent = e.detail.value;
    },
    submit(e: any) {
      let FeedbackContent = this.FeedbackContent;
      if (!FeedbackContent) {
        showToast("内容不能为空！");
        return;
      }
      let data = {
        FeedbackContent: FeedbackContent
      };
      request(UserFeedbackSubmit, data).then((res: any) => {
        console.log(res);
        showToast("提交成功！");
      });
    }
  }
});
</script>
<style>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  display: none;
}

.mask-content {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  transform: translateY(100%);
  transition: all 0.4s ease;
  z-index: 999;
}

.show .mask-content {
  transform: translateY(0);
}

.show .mask {
  display: block;
}
.uni-mask {
  position: fixed;
  z-index: 998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.uni-popup {
  position: fixed;
  z-index: 999;
  background-color: #ffffff;
}

.uni-popup-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.uni-popup-middle.uni-popup-insert {
  min-width: 380upx;
  min-height: 380upx;
  max-width: 100%;
  max-height: 80%;
  transform: translate(-50%, -65%);
  background: none;
  box-shadow: none;
}

.uni-popup-middle.uni-popup-fixed {
  border-radius: 10upx;
  padding: 30upx;
}

.uni-close-bottom,
.uni-close-right {
  position: absolute;
  bottom: -180upx;
  text-align: center;
  border-radius: 50%;
  color: #f5f5f5;
  font-size: 60upx;
  font-weight: bold;
  opacity: 0.8;
  z-index: -1;
}

.uni-close-bottom {
  margin: auto;
  left: 0;
  right: 0;
}

.uni-close-right {
  right: -60upx;
  top: -80upx;
}

.uni-close-bottom:after {
  content: "";
  position: absolute;
  width: 0px;
  border: 1px #f5f5f5 solid;
  top: -200upx;
  bottom: 56upx;
  left: 50%;
  transform: translate(-50%, -0%);
  opacity: 0.8;
}

.uni-popup-top,
.uni-popup-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}

.uni-popup-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 100upx;
  line-height: 100upx;
  text-align: center;
}

.uni-popup-bottom {
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 100upx;
  line-height: 100upx;
}

.i-content {
  width: 100%;
  padding: 0 30upx;
}

.i-msg {
  font-size: 32upx;
  line-height: 80upx;
}

.i-textarea textarea {
  width: 94%;
  height: 260upx;
  border: 2upx solid #f4f4f4;
  border-radius: 4upx;
  padding: 20upx;
}

.i-feedback {
  display: flex;
  justify-content: center;
}

.i-feedback-button {
  width: 180upx;
  height: 60upx;
  line-height: 60upx;
  font-size: 36upx;
  text-align: center;
  border-radius: 4upx;
  border: none;
  color: #fff;
  background-color: #fe7f00;
  margin: 20upx 0 40upx 0;
}
</style>
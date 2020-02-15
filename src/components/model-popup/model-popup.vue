<template>
	<view>
		<view
			v-show="!showTrans"
			:style="{ top: offsetTop + 'px' }"
			class="uni-mask"
			@click="hide"
			@touchmove.stop.prevent="moveHandle"
		/>
		<view :class="'uni-popup-' + position + ' ' + 'uni-popup-' + mode" class="show-popup">
			<view class="animated" :class="showClass?'bounceOut':'bounceIn'">
				{{ msg }}
				<slot />
				<!-- #ifdef MP-WEIXIN -->
				<view class="clear">
					<view class="animated pulse">
						<uni-icon type="clear" color="#fff" size="32" @click="closeMask" />
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="close">
					<view class="animated pulse">
						<uni-icon type="close" color="#fff" size="32" @click="closeMask" />
					</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from "@/components/uni-icon/uni-icon.vue";
export default {
	name: "UniPopup",
	components: {
		uniIcon
	},
	props: {
		/**
		 * 页面显示
		 */
		showTrans: {
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
			timer: null,
			showClass: false
		};
	},
	watch: {
		h5Top(newVal) {
			if (newVal) {
				ƒ;
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
			offsetTop = 0;
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
			this.showClass = true;
			if (this.mode === "insert") {
				this.$emit("hidePopup");
			}
		},
		moveHandle() {}
	}
};
</script>
<style>
.uni-mask {
	position: fixed;
	z-index: 998;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.3);
}

.show-popup {
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
	bottom: -120upx;
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
	text-align: center;
}

.clear {
	position: relative;
	top: 30upx;
	text-align: center;
}

.close {
	position: absolute;
	top: 30upx;
	right: 20upx;
}
.image {
	width: 600upx;
	height: 700upx;
}
</style>
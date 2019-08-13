<template>
	<view class="content">
		<view class="mask-show" :class="(show?'show':'hide')">
			<view class="mask" @click="hide" @touchmove.stop.prevent="moveHandle" />
			<view class="popus-content mask-content">
				<!-- <view class="popus-head">入场费用【入场券】： {{options.ActiveVirtualCoins}}张/份</view>
				<view class="popus-remarks">注：每份={{options.ActiveCardNumbers}}次举牌</view> -->
				<view class="popus-purchase-num">购买数量</view>
				<view class="popus-num-box">
					<view class="i-numbox">
						<view
							:class="{'i-numbox--disabled': inputValue <= min || disabled}"
							class="i-numbox__minus"
							@click="calcValue('minus')"
						>-</view>
						<input
							:disabled="numDisabled"
							v-model="inputValue"
							class="popus-input"
							type="number"
							@blur="onBlur"
						/>
						<view
							:class="{'i-numbox--disabled': inputValue >= max || disabled}"
							class="i-numbox__plus"
							@click="calcValue('plus')"
						>+</view>
					</view>
				</view>
				<view class="popus-totals-footer">
					<view class="popus-totals">
						<view>{{signups}}</view>
						<view>{{seqSignups}}</view>
					</view>
					<button
						class="btn popus-btn"
						:disabled="!disabled"
						formType="submit"
						@click.stop.prevent="closeMask(buttonText)"
					>{{buttonText}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "iPopup",
	props: {
		options: {
			type: Object,
			default() {
				return {
					ActiveVirtualCoins: "",
					ActiveCardNumbers: ""
				};
			}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		show: {
			type: Boolean,
			default: false
		},
		num: {
			type: [Number, String],
			default: 0
		},
		signups: {
			type: [Number, String],
			default: ""
		},
		seqSignups: {
			type: [Number, String],
			default: ""
		},
		buttonText: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			inputValue: 1,
			min: 0,
			max: 100,
			numDisabled: false,
			step: 1,
			value: ""
		};
	},
	watch: {
		value(val) {
			this.inputValue = +val;
		},
		inputValue(newVal, oldVal) {
			if (+newVal !== +oldVal) {
				this.$emit("change", newVal);
			}
		}
	},
	created() {
		// this.inputValue = +this.value;
	},
	methods: {
		calcValue(type: any) {
			if (this.numDisabled) {
				return;
			}
			const scale = this.getDecimalScale();
			let value = this.inputValue * scale;
			let step = this.step * scale;
			if (type === "minus") {
				value -= step;
			} else if (type === "plus") {
				value += step;
			}
			if (value < this.min || value > this.max) {
				return;
			}
			this.inputValue = value / scale;
		},
		getDecimalScale() {
			let scale = 1;
			// 浮点型
			if (~~this.step !== this.step) {
				scale = Math.pow(10, (this.step + "").split(".")[1].length);
			}
			return scale;
		},
		onBlur(event: any) {
			let value = event.detail.value;
			if (!value) {
				this.inputValue = 0;
				return;
			}
			value = +value;
			if (value > this.max) {
				value = this.max;
			} else if (value < this.min) {
				value = this.min;
			}
			this.inputValue = value;
		},
		hide() {
			this.$emit("hidePopup");
		},
		closeMask(e: string) {
			this.$emit("click", e);
		},
		moveHandle() {
			this.$emit("hidePopup");
		},
		submit(e: any) {
			this.$emit("submit", e);
		}
	}
});
</script>

<style>
@charset "UTF-8";

.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	background: rgba(0, 0, 0, 0.3);
	display: none;
	z-index: 998;
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

.popus-head {
	font-size: 36upx;
	font-weight: 600;
	color: #232323;
	margin: 30upx 30upx 20upx 30upx;
}

.popus-remarks {
	font-size: 28upx;
	font-weight: 600;
	color: #fe0000;
	margin: 10upx 30upx 30upx 30upx;
}

.popus-purchase-num {
	font-size: 28upx;
	color: #5c5c5c;
	margin: 20upx 30upx 10upx 30upx;
}

.popus-num-box {
	margin: 10upx 30upx 40upx 30upx;
}

.popus-input {
	position: relative;
	background-color: #fff;
	width: 100%;
	height: 64upx;
	text-align: center;
	padding: 0;
	margin: 0 30upx;
}

.popus-input:after {
	content: "";
	position: absolute;
	transform-origin: center;
	box-sizing: border-box;
	pointer-events: none;
	top: -50%;
	left: -50%;
	right: -50%;
	bottom: -50%;
	border-style: solid;
	border-color: #c8c7cc;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-radius: 8upx;
	transform: scale(0.5);
}

.i-numbox {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 70upx;
	position: relative;
}

.i-numbox__minus,
.i-numbox__plus {
	margin: 0;
	background-color: #fff;
	width: 140upx;
	font-size: 40upx;
	height: 100%;
	line-height: 70upx;
	text-align: center;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: #333;
	position: relative;
	margin: 0 20upx;
	border: 2upx solid #c8c7cc;
	border-radius: 8upx;
}

.i-numbox--disabled {
	color: silver;
}

.popus-totals-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 98upx;
	box-shadow: 2px 2px 5px #747474;
}

.popus-totals {
	text-align: center;
	padding: 0 30upx;
}

.popus-btn {
	margin: 0;
	line-height: 98upx;
	color: #fff;
	background-color: #fe7f00;
	padding: 0 40px;
}
</style>
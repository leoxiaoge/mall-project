<template>
	<view>
		<view :class="original?'uni-countdown':'uni-countdown-else'">
			<view
				v-if="showDay"
				class="uni-countdown__number"
				:class="{'countdown-color':original}"
			>{{ d }}</view>
			<view v-if="showDay" class="uni-countdown__splitor" :class="{'countdown-color':original}">天</view>
			<view class="uni-countdown__number" :class="{'countdown-color':original}">{{ h }}</view>
			<view
				class="uni-countdown__splitor"
				:class="{'countdown-color':original}"
			>{{ showColon ? ':' : '时' }}</view>
			<view class="uni-countdown__number" :class="{'countdown-color':original}">{{ i }}</view>
			<view
				class="uni-countdown__splitor"
				:class="{'countdown-color':original}"
			>{{ showColon ? ':' : '分' }}</view>
			<view class="uni-countdown__number" :class="{'countdown-color':original}">{{ s }}</view>
			<view
				v-if="!showColon"
				class="uni-countdown__splitor"
				:class="{'countdown-color':original}"
			>秒</view>
		</view>
	</view>
</template>
<script>
export default {
	name: "UniCountdown",
	props: {
		original: {
			type: Boolean,
			default: false
		},
		showDay: {
			type: Boolean,
			default: false
		},
		showColon: {
			type: Boolean,
			default: true
		},
		seconds: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			timer: null,
			d: "00",
			h: "00",
			i: "00",
			s: "00",
			leftTime: 0,
			secondes: 0
		};
	},
	watch: {
		seconds(newVal, oldVal) {
			console.log(newVal, oldVal)
			clearInterval(this.timer);
			if (newVal) {
				this.secondes = newVal;
			}
			this.countDown();
			this.timer = setInterval(() => {
				this.secondes--;
				if (this.secondes < 0) {
					this.timeUp();
					return;
				}
				this.countDown();
			}, 1000);
		}
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	methods: {
		toSeconds(day, hours, minutes, seconds) {
			return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
		},
		timeUp() {
			clearInterval(this.timer);
			this.$emit("timeup");
		},
		countDown() {
			let seconds = this.secondes;
			let [day, hour, minute, second] = [0, 0, 0, 0];
			if (seconds > 0) {
				day = Math.floor(seconds / (60 * 60 * 24));
				hour = Math.floor(seconds / (60 * 60)) - day * 24;
				minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
				second =
					Math.floor(seconds) -
					day * 24 * 60 * 60 -
					hour * 60 * 60 -
					minute * 60;
			} else {
				this.timeUp();
			}
			if (day < 10) {
				day = "0" + day;
			}
			if (hour < 10) {
				hour = "0" + hour;
			}
			if (minute < 10) {
				minute = "0" + minute;
			}
			if (second < 10) {
				second = "0" + second;
			}
			hour = + hour + day * 24;
			this.d = day;
			this.h = hour;
			this.i = minute;
			this.s = second;
		}
	}
};
</script>
<style>
@charset "UTF-8";

.uni-countdown {
	display: inline-flex;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	color: #fe7f00;
	font-weight: 600;
	padding: 4upx 20upx;
	border-radius: 100upx;
	border: 2upx solid #e8e8e8;
}

.uni-countdown-else {
	display: inline-flex;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	color: #393939;
	font-weight: 600;
	border-radius: 100upx;
	margin-left: 8upx;
}

.uni-countdown__splitor {
	justify-content: center;
	line-height: 44upx;
	padding: 0 5upx;
	font-size: 28upx;
}

.uni-countdown__number {
	line-height: 44upx;
	justify-content: center;
	height: 44upx;
	font-size: 30upx;
}

.countdown-color {
	color: #fe7f00;
}
</style>
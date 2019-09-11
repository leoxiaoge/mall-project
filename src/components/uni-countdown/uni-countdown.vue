<template>
	<view>
		<view class="uni-countdown" v-if="original">
			<view
				v-if="showDay"
				:style="{borderColor:borderColor, color:color, background:backgroundColor}"
				class="uni-countdown__number"
			>{{ d }}</view>
			<view v-if="showDay" :style="{color:splitorColor}" class="uni-countdown__splitor">天</view>
			<view class="uni-countdown__number">{{ h }}</view>
			<view class="uni-countdown__splitor">{{ showColon ? ':' : '时' }}</view>
			<view class="uni-countdown__number">{{ i }}</view>
			<view class="uni-countdown__splitor">{{ showColon ? ':' : '分' }}</view>
			<view class="uni-countdown__number">{{ s }}</view>
			<view v-if="!showColon" :style="{color:splitorColor}" class="uni-countdown__splitor">秒</view>
		</view>
		<view class="uni-countdown-else" v-else>
			<view
				v-if="showDay"
				:style="{borderColor:borderColor, color:color, background:backgroundColor}"
				class="uni-countdown__number"
			>{{ d }}</view>
			<view v-if="showDay" :style="{color:splitorColor}" class="uni-countdown__splitor">天</view>
			<view class="uni-countdown__number-else">{{ h }}</view>
			<view class="uni-countdown__splitors">{{ showColon ? ':' : '时' }}</view>
			<view class="uni-countdown__number-else">{{ i }}</view>
			<view class="uni-countdown__splitors">{{ showColon ? ':' : '分' }}</view>
			<view class="uni-countdown__number-else">{{ s }}</view>
			<view v-if="!showColon" :style="{color:splitorColor}" class="uni-countdown__splitor">秒</view>
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
		splitorColor: {
			type: String,
			default: "#000000"
		},
		day: {
			type: Number,
			default: 0
		},
		hour: {
			type: Number,
			default: 0
		},
		minute: {
			type: Number,
			default: 0
		},
		second: {
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
			seconds: 0
		};
	},
	mounted() {
		this.seconds = this.toSeconds(
			this.day,
			this.hour,
			this.minute,
			this.second
		);
		console.log("this.seconds", this.seconds);
		this.countDown();
		this.timer = setInterval(() => {
			this.seconds--;
			if (this.seconds < 0) {
				this.timeUp();
				return;
			}
			this.countDown();
		}, 1000);
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
			let seconds = this.seconds;
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
	color: #fe7f00;
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
	color: #fe7f00;
}

.uni-countdown__number-else {
	line-height: 44upx;
	justify-content: center;
	height: 44upx;
	font-size: 30upx;
	color: #393939;
}
</style>
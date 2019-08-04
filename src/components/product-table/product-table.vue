<template>
	<view class="content">
		<view class="table">
			<view class="table-tr">
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_0" />
						<view class="table-text">
							<text class="table-text-content">起拍价</text>
							<text class="table-text-content-item">¥{{options.ActiveStartPrice}}</text>
						</view>
					</view>
				</view>
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_1" />
						<view class="table-text">
							<text class="table-text-content">加价幅度</text>
							<text class="table-text-content-item">¥{{options.ActiveIncreaseRange}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="table-tr">
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_2" />
						<view class="table-text">
							<text class="table-text-content">举牌次数</text>
							<text class="table-text-content-item">{{options.ActiveCardNumbers}}次/份</text>
						</view>
					</view>
				</view>
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_3" />
						<view class="table-text">
							<text class="table-text-content">落拍倒计时</text>
							<text class="table-text-content-item">{{options.ActiveDuration}}S</text>
						</view>
					</view>
				</view>
			</view>
			<view class="table-tr">
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_4" />
						<view class="table-text">
							<text class="table-text-content">可用份数</text>
							<text class="table-text-content-item">{{options.ActiveMaxBuys}}份</text>
						</view>
					</view>
				</view>
				<view class="table-td">
					<view class="table-content">
						<img :src="icon_5" />
						<view class="table-text">
							<text class="table-text-content">参与资格</text>
							<text class="table-text-content-item">{{options.ActiveVirtualCoins}}/入场券</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "productTable",
	props: {
		options: {
			type: Object,
			default() {
				return {
					ActiveStartPrice: "",
					ActiveIncreaseRange: "",
					ActiveCardNumbers: "",
					ActiveDuration: "",
					ActiveMaxBuys: "",
					ActiveVirtualCoins: ""
				};
			}
		}
	},
	data() {
		return {
			icon_0: "/static/icon/icon_jjkp_01.png",
			icon_1: "/static/icon/icon_jjkp_02.png",
			icon_2: "/static/icon/icon_jjkp_03.png",
			icon_3: "/static/icon/icon_jjkp_04.png",
			icon_4: "/static/icon/icon_jjkp_05.png",
			icon_5: "/static/icon/icon_jjkp_06.png"
		};
	},
	methods: {}
});
</script>

<style>
.content {
	display: flex;
	justify-content: center;
}

.table-tr {
	display: table-row;
	height: 80rpx;
}

.table-td {
	display: table-cell;
	border: 2upx solid #c9c9c9;
	vertical-align: middle;
	padding: 0 20upx;
}

.table-text {
	display: flex;
	align-items: center;
	margin-left: 20upx;
}

.table-content img {
	width: 44upx;
	height: 44upx;
}

.table-content {
	display: flex;
	align-items: center;
}

.table-text-content {
	font-size: 28upx;
	color: #4d4d4d;
}

.table-text-content-item {
	font-size: 28upx;
	color: #4d4d4d;
	margin-left: 20upx;
}
</style>
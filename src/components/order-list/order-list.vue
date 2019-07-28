<template>
	<view class="container">
		<view class="list-cell view" hover-class="uni-list-cell-hover">
			<view class="teng-order-list view">
				<view class="teng-order-body teng-flex" @click="bindClick">
					<view class="teng-order-image">
						<image class="teng-order-image-src" :src="options.ProductPicList[0]" />
						<image class="teng-order-show-status" :src="status" v-if="showStatus"/>
					</view>
					<view class="teng-order-text">
						<view class="teng-order-title teng-flex-between">
							<view class="teng-order-name">{{options.ProductName}}</view>
							<view class="teng-order-num">x1</view>
						</view>
						<view class="teng-order-bodys">
							<text class="teng-order-placard-status">{{options.OrderTypeName}}</text>
							<view class="teng-order-number">订单编号：{{options.OrderID}}</view>
						</view>
						<view class="teng-order-footer teng-flex-between">
							<view class="teng-order-price">
								<text class="teng-order-msg">成交价：</text>
								<text class="teng-order-original">{{options.OrderMoneys}}</text>
							</view>
							<view class="teng-order-status">{{options.OrderStatusName}}</view>
						</view>
					</view>
				</view>
				<view class="i-order-footer">
					<view class="teng-order-button teng-flex-end" v-for="(i, idx) in options.ActionButtons" :key="idx">
						<button class="btn" @click="actionButton(options.OrderID, options.ID, i.btn)">{{i.btn}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			options: {
				type: Object,
				default() {
					return {}
				}
			},
			showStatus: {
				type: Boolean,
				default: false
			}
		},
		data() {
      return {
				status: '/static/icon/icon_done.png'
			}
    },
		methods: {
			close(e) {
				this.$emit('close');
			},
			bindClick() {
				this.$emit('click');
			},
			actionButton(order, product, e) {
				this.$emit('order', order);
				this.$emit('product', product);
				this.$emit('action', e);
			}
		}
	}
</script>

<style>
  page {
		width: 100%;
		height: 100%;
	}
	.view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.list-cell {
		background-color: #fff;
	}

	.teng-order-list {
		margin: 0 30upx;
		padding: 20upx 0;
		border-bottom: 2upx solid #f4f4f4;
	}

	.teng-order-image {
		position: relative;
	}

	.teng-order-image-src {
		width: 200upx;
		height: 200upx;
	}

  .teng-order-show-status {
		position: absolute;
		left: 0;
		top: 0;
		width: 100upx;
		height: 100upx;
	}

	.teng-order-text {
		width: 100%;
		margin-left: 20upx;
	}

	.teng-order-name {
		font-size: 36upx;
		color: #757575;
		display: -webkit-box;
    overflow: hidden;
    line-height: 1.8;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
	}

	.teng-order-num {
		font-size: 32upx;
		color: #757575;
		margin-left: 20upx;
	}

	.teng-order-placard-status {
		font-size: 24upx;
		line-height: 1.4;
		color: #fe7f00;
		border: 2upx solid #fe7f00;
		border-radius: 100upx;
		padding: 2upx 14upx;
	}

	.teng-order-number {
		font-size: 24upx;
		line-height: 1.8;
		color: #909090;
	}

	.teng-order-msg {
		font-size: 28upx;
	}

	.teng-order-original {
		font-size: 32upx;
		color: #fe7f00;
	}

	.teng-order-status {
		font-size: 28upx;
		color: #666666
	}

	.i-order-footer {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.teng-order-button {
		margin: 10upx 0 0 10rpx;
	}

	.teng-order-button button {
		font-size: 28upx;
		line-height: 1.4;
		color: #fe7f00;
		background-color: #fff;
		border: 2upx solid #fe7f00;
		border-radius: 100upx;
		margin: 0;
		padding: 4upx 14upx;
	}
</style>

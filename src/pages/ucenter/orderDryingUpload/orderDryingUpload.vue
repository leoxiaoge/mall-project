<template>
	<view class="container">
		<form @submit="formSubmit" @reset="formReset">
			<view class="order">
				<view
					class="list-cell view"
					hover-class="uni-list-cell-hover"
					@click="bindClick"
					v-for="(item, index) in order"
					:key="index"
				>
					<view class="teng-order-list view">
						<view class="teng-order-body">
							<view class="teng-order-image">
								<image class="teng-order-image-src" :src="item.ProductPicList[0]" />
							</view>
							<view class="teng-order-text">
								<view class="teng-order-title teng-flex-between">
									<view class="teng-order-name">{{item.ProductName}}</view>
									<view class="teng-order-num">x1</view>
								</view>
								<view class="teng-order-bodys">
									<text class="teng-order-placard-status">{{item.OrderTypeName}}</text>
									<view class="teng-order-number">订单编号：{{item.OrderID}}</view>
								</view>
								<view class="teng-order-footer teng-flex-between">
									<view class="teng-order-price" v-if="item.OrderMoneys">
										<text class="teng-order-msg">成交价：</text>
										<text class="teng-order-original">¥{{item.OrderMoneys}}</text>
									</view>
									<view class="teng-order-status">{{item.OrderStatusName}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="textarea">
				<textarea placeholder="说说你的喜悦心情吧！" @blur="bindTextAreaBlur" />
			</view>
			<robby-image-upload
				v-model="imageData"
				:showUploadProgress="show"
				:limit="limit"
				:form-data="formData"
				@delete="deleteImage"
				@add="addImage"
				@picUrlInput="picUrlInput"
			></robby-image-upload>
			<view class="i-kong"></view>
			<view class="common-submit">
				<view class="common-button">
					<button class="btn-reset" formType="reset">重置</button>
					<button class="btn-submit" formType="submit">提交</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	defaultShowModal,
	onShareAppMessage
} from "@/common/utils/util";
import {
	OrderDryingUpload,
	OrderListGet,
	OrderDrying
} from "@/common/config/api";
import robbyImageUpload from "@/components/robby-image-upload/robby-image-upload.vue";
export default Vue.extend({
	data() {
		return {
			chosen: "",
			order: [],
			id: "",
			orderID: "",
			comment: "",
			commentPic: "",
			enableDel: false,
			enableAdd: false,
			enableDrag: false,
			show: true,
			limit: 9,
			imageData: [],
			formData: {
				userId: 2
			}
		};
	},
	components: { robbyImageUpload },
	onLoad(options: any) {
		this.id = options.id;
		this.orderID = options.OrderID;
		this.getProduct();
		console.log("onLoad", options);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getProduct() {
			let OrderID = this.orderID;
			let data = {
				OrderID: OrderID
			};
			request(OrderListGet, data).then((res: any) => {
				console.log(res);
				this.order = res.OrderList;
			});
		},
		deleteImage(e: any) {
			console.log(e);
			this.commentPic = e.allImages;
		},
		addImage(e: any) {
			console.log('addImage', e);
			this.commentPic = e.allImages;
		},
		picUrlInput(e: any) {
			this.commentPic = e;
		},
		bindTextAreaBlur(e: any) {
			console.log(e.detail.value);
			this.comment = e.detail.value;
		},
		formSubmit() {
			console.log("提交数据");
			let OrderID = this.orderID;
			let Comment = this.comment;
			let CommentPic = JSON.stringify(this.commentPic);
			console.log(CommentPic)
			if (!Comment) {
				showToast("请填写晒单内容！");
				return;
			}
			let data = {
				OrderID: OrderID,
				Comment: Comment,
				CommentPic: CommentPic
			};
			request(OrderDrying, data).then((res: any) => {
				let content: string = "提交晒单成功，点击确定返回订单中心！";
				defaultShowModal(content).then((res: any) => {
					console.log(res);
					if (res.confirm) {
						console.log("用户点击确定");
						navigateTo("../../ucenter/orderList/orderList");
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				});
			});
		},
		formReset() {
			console.log("清空数据");
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}
.list-cell {
	background-color: #fff;
}

.teng-order-body {
	display: flex;
	justify-content: flex-start;
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

.teng-order-title {
	padding: 10upx 0;
}

.teng-order-name {
	font-size: 36upx;
	color: #757575;
	display: -webkit-box;
	overflow: hidden;
	line-height: 1.5;
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
	color: #909090;
	margin-top: 10upx;
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
	color: #666666;
}

.textarea {
	margin: 20upx 30upx;
	border-bottom: 2upx solid #f4f4f4;
}

.common-submit {
	position: fixed;
	bottom: 0;
	width: 100%;
}

.common-button {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.common-button button {
	height: 98upx;
	line-height: 98upx;
}

.btn-reset {
	width: 50%;
	color: #515151;
	background-color: #eeeeee;
}

.btn-submit {
	width: 50%;
	color: #ffffff;
	background-color: #fe7f00;
}
</style>

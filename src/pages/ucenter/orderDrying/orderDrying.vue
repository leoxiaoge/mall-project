<template>
	<view class="container">
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-textarea">
					<textarea placeholder="说说你的喜悦心情吧！" />
				</view>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-head">
								<view class="uni-uploader-title">点击可预览选好的图片</view>
								<view class="uni-uploader-info">{{imageList.length}}/9</view>
							</view>
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage" />
										</view>
									</block>
									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button formType="submit">Submit</button>
					<button type="default" formType="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, onShareAppMessage } from "@/common/utils/util";
import { ProductPaiListGet } from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			imageList: []
		};
	},
	onLoad(options) {
		this.getData();
		console.log("onLoad", options);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getData() {
			let data = {};
			request(ProductPaiListGet, data).then((res: any) => {
				console.log(res);
			});
		},
		chooseImage: async function() {
			if (this.imageList.length === 9) {
				let isContinue = await this.isFullImg();
				console.log("是否继续?", isContinue);
				if (!isContinue) {
					return;
				}
			}
			uni.chooseImage({
				sourceType: ["album"],
				sizeType: ["original", "compressed"],
				count: 9,
				success: (res: any) => {
					this.imageList = this.imageList.concat(res.tempFilePaths);
				}
			});
		},
		isFullImg: function() {
			return new Promise(res => {
				uni.showModal({
					content: "已经有9张图片了,是否清空现有图片？",
					success: e => {
						if (e.confirm) {
							this.imageList = [];
							res(true);
						} else {
							res(false);
						}
					},
					fail: () => {
						res(false);
					}
				});
			});
		},
		previewImage(e: any) {
			let current: any = e.target.dataset.src;
			// uni.previewImage({
			// 	current: current,
			// 	urls: this.imageList
			// })
		}
	}
});
</script>

<style>
</style>

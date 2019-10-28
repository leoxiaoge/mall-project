<template>
	<view class="content">
		<view class="teng-contact">
			<view class="teng-contact-list" v-for="(item, index) in contactList" :key="index">
				<view class="teng-contact-view">
					<view class="teng-contact-view-image">
						<image :src="item.ContactIcon" />
					</view>
					<view class="teng-contact-text">
						<view class="teng-contact-name">{{item.ContactName}}:{{item.ContactText}}</view>
						<view class="teng-contact-time">服务时间：{{item.ContactWorkTime}}</view>
					</view>
				</view>
				<!-- #ifndef H5 -->
				<view class="teng-contact">
					<text
						class="teng-contact-copy"
						v-if="item.IsSupportCopy === 1 && item.ContactType == 0"
						@click="setClipboard(item.ContactText)"
					>复制号码</text>
					<text
						class="teng-contact-copy"
						v-if="item.IsSupportCopy === 1 && item.ContactType == 1"
						@click="setClipboard(item.ContactText)"
					>复制号码</text>
					<text
						class="teng-contact-copy"
						v-if="item.IsSupportCopy === 1 && item.ContactType == 2"
						@click="setClipboard(item.ContactText)"
					>复制号码</text>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<uni-collapse :accordion="true">
			<uni-collapse-item
				:show-animation="true"
				:title="items.CategoryName"
				v-for="(items, index) in helpList"
				:key="index"
			>
				<view class="teng-help-list" v-for="(item, i) in items.HelpDetailList" :key="i">
					<view class="teng-question teng-help-list-text">
						<image :src="iconQuestion" />
						<text>{{item.Question}}</text>
					</view>
					<view class="teng-answe teng-help-list-text">
						<image :src="iconAnswe" />
						<text>{{item.Answe}}</text>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="teng-feedback">
			<button class="button" type="button" @click="togglePopup('bottom')">建议反馈</button>
		</view>
		<view class="example">
			<uni-popup :show="type" position="bottom" mode="fixed" msg="建议反馈" @hidePopup="togglePopup('')" />
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, onShareAppMessage } from "@/common/utils/util";
import { HelpContactListGet, HelpListGet } from "@/common/config/api";
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";

export default Vue.extend({
	components: {
		uniCollapse,
		uniCollapseItem,
		uniPopup
	},
	data() {
		return {
			contactList: [],
			helpList: [],
			iconQuestion: "/static/icon/icon_question.png",
			iconAnswe: "/static/icon/icon_answe.png",
			type: false
		};
	},
	onLoad(options) {
		this.getHelpContactList();
		this.getHelpList();
		console.log("onLoad", options);
	},
	onPullDownRefresh() {
		this.getHelpContactList();
		this.getHelpList();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getHelpContactList() {
			let data = {};
			request(HelpContactListGet, data).then((res: any) => {
				console.log(res);
				this.contactList = res.ContactList;
			});
		},
		getHelpList() {
			let data = {};
			request(HelpListGet, data).then((res: any) => {
				this.helpList = res.HelpList;
			});
		},
		setClipboard(data: any) {
			console.log(data);
			uni.setClipboardData({
				data: data,
				success: () => {
					console.log("success");
				}
			});
		},
		togglePopup(type: any) {
			this.type = !this.type;
		}
	}
});
</script>

<style>
.teng-contact {
	background-color: #fff;
	padding: 0 30upx;
}
.teng-contact-list {
	display: flex;
	justify-content: space-between;
	padding: 20upx 0;
}
.teng-contact-view {
	display: flex;
	align-items: center;
}
.teng-contact-view-image {
	width: 84upx;
	height: 100%;
}
.teng-contact-view image {
	height: 100%;
	padding: 10upx 0;
}
.teng-contact-text {
	margin-left: 16upx;
	font-size: 32upx;
	color: #616161;
}
.teng-contact-copy {
	color: #fe7f00;
}
.teng-help {
	padding: 10upx 30upx 0 30upx;
}
.teng-help-list-text {
	display: flex;
	align-items: flex-start;
	padding: 10upx 30upx;
}
.teng-help-list-text image {
	width: 36upx;
	height: 36upx;
	margin: 10upx 0;
}
.teng-help-list-text text {
	width: 100%;
	font-size: 28upx;
	color: #868686;
	margin-left: 20upx;
}
.teng-feedback {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100upx;
}
.button {
	height: 100upx;
	font-size: 30upx;
	color: #616161;
	line-height: 100upx;
}

.button:after {
	border: none;
	height: 100upx;
}
</style>

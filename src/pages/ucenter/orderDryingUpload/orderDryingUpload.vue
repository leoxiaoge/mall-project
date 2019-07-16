<template>
	<view class>
		<robby-image-upload
			v-model="imageData"
			:server-url-delete-image="serverUrlDeleteImage"
			:server-url="serverUrl"
			:showUploadProgress="show"
			:form-data="formData"
			@delete="deleteImage"
			@add="addImage"
		></robby-image-upload>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { OrderDryingUpload } from "@/common/config/api";
import robbyImageUpload from "@/components/robby-image-upload/robby-image-upload.vue";
export default Vue.extend({
	data() {
		return {
			enableDel: false,
			enableAdd: false,
			enableDrag: false,
			show: true,
			imageData: [],
			serverUrl: "http://localhost:2000/work/uploadWorkPicture",
			serverUrlDeleteImage: "http://localhost:2000/work/deleteWorkPicture",
			formData: {
				userId: 2
			}
		};
	},
	components: { robbyImageUpload },
	methods: {
		deleteImage: function(e: any) {
			console.log(e);
		},
		addImage: function(e: any) {
      console.log(e);
		}
	}
});
</script>

<style>
</style>

<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y>
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" v-for="(item,index) in categoryList" :class="categoryActive==index?'active':''">
					{{item.CategoryName}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" scroll-with-animation>
				<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<image :src="item.LOGO" />
					<view>{{item.NAME}}</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { request, navigateTo } from '@/common/utils/util';
	import { ProductCategoryListGet, ProductPaiListGet } from '@/common/config/api';
	export default Vue.extend({
		data() {
			return {
        categoryList: [],
        subCategoryList: [],
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0
			}
		},
		onLoad() {
      console.log('onLoad')
      
		},
		onShow() {
      console.log('onShow')
      this.getCategory()
		},
		methods: {
      scroll(e: any): void {
				this.scrollHeight = e.detail.scrollHeight;
      },
      getCategory(): void{
        let data = {}
			  request(ProductCategoryListGet, data).then((res: any) => {
          this.categoryList = res.CategoryList
        })
			},
			categoryClickMain(categroy: any, index: any): void {
        let i: any = this.categoryList[index]
        console.log(i)
        this.categoryActive = index;
        let CategoryID = i.ID
        let data = {
          PageID: '1',
          PageSize: '10',
          CategoryID: i.ID,
          ActiveType: '1'
        }
			  request(ProductPaiListGet, data).then((res: any) => {
          this.subCategoryList = res.ProductList
        })
			},
		}
	});
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #ededed;
		border-bottom: solid 1px #ededed;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
    background-color: #f3f4f3;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #fe7f00;
    background-color: #e4e4e4;
	}
</style>

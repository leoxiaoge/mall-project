<template>
	<view class="imageUploadContainer">
		<view class="imageUploadList">
			<view class="imageItem" v-bind:key="index" v-for="(path,index) in picUrl">
				<image :src="url + path" :class="{'dragging':isDragging(index)}" draggable="true" @tap="previewImage" :data-index="index" @touchstart="start" @touchmove="move" @touchend="stop"></image>
				<view v-if="isShowDel" class="imageDel" @click.stop.prevent="deleteImage" :data-index="index">x</view>
			</view>
			<view v-if="isShowAdd" class="imageUpload" @tap="selectImage">
				<view class="upload">
					<img class="image-add" :src="imageUpload" />
					<view class="image-upload-text">添加图片</view>
				</view>
			</view>
		</view>
		<image v-if="showMoveImage" class="moveImage" :style="{left:posMoveImageLeft, top:posMoveImageTop}" :src="moveImagePath"></image>
	</view>
</template>

<script>
	var _self;
	import { upload, navigateTo, showToast } from "@/common/utils/util";
  import { OrderDryingUpload } from "@/common/config/api";
	export default {
		name:'robby-image-upload',
		props: {
		  value: {
				type: Array,
				default () {
					return []
				}
			},
			enableDel: {
				type: Boolean,
				default: true
			},
			enableAdd: {
				type: Boolean,
				default: true
			}
	  },
		data() {
			return {
				imageBasePos:{
					x0: -1,
					y0: -1,
					w:-1,
					h:-1,
				},
				showMoveImage: false,
				moveImagePath: '',
				moveLeft: 0,
				moveTop: 0,
				deltaLeft: 0,
				deltaTop: 0,
				dragIndex: null,
				targetImageIndex: null,
				picUrl: [],
				url: "https://api.tengpaisc.com",
				imageUpload: "/static/icon/icon_image_upload.png"
			}
		},
		computed:{
			posMoveImageLeft: function(){ 
				return this.moveLeft + 'px'
			},
			posMoveImageTop: function(){
				return this.moveTop + 'px'
			},
			isShowDel: function(){
				if(this.enableDel === false){
					return false
				}else{
					return true
				}
			},
			isShowAdd: function(){
				if(this.enableAdd === false){
					return false
				}
				
				if(this.limit && this.value.length >= this.limit){
					return false
				}
				
				return true
			},
			isDragable: function(){
				if(this.enableDrag === false){
					return false
				}else{
					return true
				}
			}
		},
		methods:{
			selectImage: function(){
				_self = this
				if(!_self.value){
					_self.value = []
				}
				uni.chooseImage({
					count: _self.limit ? (_self.limit - _self.value.length) : 999,
					success: (e) => {
						var imagePathArr = e.tempFilePaths
						//如果设置了limit限制，在web上count参数无效，这里做判断控制选择的数量是否合要求
						//在非微信小程序里，虽然可以选多张，但选择的结果会被截掉
						//在app里，会自动做选择数量的限制
						if(_self.limit){
							var availableImageNumber = _self.limit - _self.value.length
							if(availableImageNumber < imagePathArr.length){
								let title = `图片总数限制为${_self.limit}张，当前还可以选${availableImageNumber}张`
								showToast(title)
								return
							}
						}
						console.log(imagePathArr)
						imagePathArr.forEach((item) => {
							_self.uploadImage(item)
						})
						for(let i=0; i<imagePathArr.length;i++){
							_self.value.push(imagePathArr[i])
						}
					}
				})
			},
			uploadImage: function(filePath) {
				let data = {};
				upload(OrderDryingUpload, data, filePath).then((res) => {
					console.log(res)
					let data = JSON.parse(res)
					console.log(data.PicUrl)
					console.log(_self.picUrl)
					let picUrl = data.PicUrl
					console.log(_self.picUrl, picUrl)
					_self.picUrl = _self.picUrl.concat(data.PicUrl);
					this.$emit('add',{
						currentImage: picUrl,
						allImages: _self.picUrl
					})
				});
			},
			deleteImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				var deletedImagePath = this.value[imageIndex]
				this.value.splice(imageIndex, 1) 
				this.picUrl.splice(imageIndex, 1)
				this.$emit('delete',{
					currentImage: deletedImagePath,
					allImages: this.picUrl
				})
				this.$emit('input', this.value)
			},
			previewImage: function(e){
				var imageIndex = e.currentTarget.dataset.index
				let current = this.value[imageIndex]
				let urls = this.value
				uni.previewImage({
					current: current,
					indicator: "number",
					loop: "true",
					urls: urls
				})
			},
			initImageBasePos: function(){
				let paddingRate = 0.024
				_self = this
				//计算图片基准位置
				uni.getSystemInfo({
					success: function(obj) {
						let screenWidth = obj.screenWidth
						let leftPadding = Math.ceil(paddingRate * screenWidth)
						let imageWidth = Math.ceil((screenWidth - 2*leftPadding)/4)
						
						_self.imageBasePos.x0 = leftPadding
						_self.imageBasePos.w = imageWidth
						_self.imageBasePos.h = imageWidth
					}
				})
			},
			findOverlapImage: function(posX, posY){
				let rows = Math.floor((posX-this.imageBasePos.x0)/this.imageBasePos.w)
				let cols = Math.floor((posY-this.imageBasePos.y0)/this.imageBasePos.h)
				let indx = cols*4 + rows
				return indx
			},
			isDragging: function(indx){
				return this.dragIndex === indx
			},
			start: function(e){
				if(!this.isDragable){
					return
				}
				this.dragIndex = e.currentTarget.dataset.index
				this.moveImagePath = this.value[this.dragIndex]
				this.movePicImagePath = this.picUrl[this.dragIndex]
				this.showMoveImage = true
				
				//计算纵向图片基准位置
				if(this.imageBasePos.y0 === -1){
					this.initImageBasePos()
					
					let basePosY = Math.floor(this.dragIndex / 4) * this.imageBasePos.h
					let currentImageOffsetTop = e.currentTarget.offsetTop
					this.imageBasePos.y0 = currentImageOffsetTop - basePosY
				}
				
				//设置选中图片当前左上角的坐标
				this.moveLeft = e.target.offsetLeft
				this.moveTop = e.target.offsetTop
			},
			move: function(e){
				if(!this.isDragable){
					return
				}
				const touch = e.touches[0]
				this.targetImageIndex = this.findOverlapImage(touch.clientX, touch.clientY)
				
				//初始化deltaLeft/deltaTop
				if(this.deltaLeft === 0){
					this.deltaLeft = touch.clientX - this.moveLeft
					this.deltaTop = touch.clientY - this.moveTop 
				}
				
				//设置移动图片位置
				this.moveLeft = touch.clientX - this.deltaLeft
				this.moveTop = touch.clientY - this.deltaTop
			},
			stop: function(e){
				if(!this.isDragable){
					return
				}
				if(this.dragIndex !== null && this.targetImageIndex !== null){
					if(this.targetImageIndex<0){
						this.targetImageIndex = 0
					}
				
					if(this.targetImageIndex>=this.value.length){
						this.targetImageIndex = this.value.length-1
					}
					//交换图片
					if(this.dragIndex !== this.targetImageIndex){
						this.value[this.dragIndex] = this.value[this.targetImageIndex]
						this.value[this.targetImageIndex] = this.moveImagePath
						this.picUrl[this.dragIndex] = this.picUrl[this.targetImageIndex]
						this.picUrl[this.targetImageIndex] = this.movePicImagePath
					}
				}
				
				this.dragIndex = null
				this.targetImageIndex = null
				this.deltaLeft = 0
				this.deltaTop = 0
				this.showMoveImage = false
				console.log(this.value)
				console.log(this.picUrl)
				this.$emit('input', this.value)
				this.$emit('picUrlInput', this.picUrl)
			}
		}
	}
</script>

<style>
	.imageUploadContainer{
		padding: 10upx 5upx;
		margin: 10upx 5upx;
	}
	
	.dragging{
		transform: scale(1.2)
	}
	
	.imageUploadList{
		display: flex;
		flex-wrap: wrap;
	}
	
	.imageItem, .imageUpload{
		width: 160upx;
		height: 160upx;
		margin: 10upx;
	}
	
	.imageDel{
		position: relative;
		left: 120upx;
		bottom: 165upx;
		background-color: rgba(0,0,0,0.5);
		width: 44upx;
		text-align: center;
		line-height: 44upx;
		border-radius: 17upx;
		color: white;
		font-size: 30upx;
		padding-bottom: 2upx;
	}
	
	.imageItem image, .moveImage{
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}
	
	.imageUpload{
		line-height: 130upx;
		text-align: center;
		font-size: 150upx;
		color: #D9D9D9;
		border: 1px solid #D9D9D9;
		border-radius: 8upx;
	}
	
	.upload {
		padding: 20upx 0;
	}

	.image-add {
		width: 48upx;
		height: 48upx;
	}

	.image-upload-text {
		font-size: 24upx;
		color: #b0b0b0;
	}

	.moveImage{
		position: absolute;
	}
</style>
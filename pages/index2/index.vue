<template>

	<view>
		<view>
			<u-row>
				<u-col >
					<view>
						<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">个人信息: {{aaa}}</text>
					</view>
				</u-col>
				<u-col>
					<view>
						<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">{{name}}</text>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="3">
					<view>
						<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">联系方式:</text>
					</view>
				</u-col>
				<u-col span="9">
					<view class="inputview">
						<input class="form_style" type="number" v-model="phone" placeholder="请输入联系方式"></input>
					</view>
				</u-col>
			</u-row>
		</view>


		<view class="grid">
			<view>
				<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
			</view>
			<uni-grid class="grid-item" :column="3" @change="change" :border="false">
				<uni-grid-item v-for="(item, index) in image_list" :index="index" :key="index">
					<view :class="item.class">
						<image :src="item.src" class="image" mode="aspectFill" />
						<text class="text">{{item.name}}</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="grid">
			<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
			<scroll-view style="padding-top:10px;" scroll-y="true" class="scroll-Y">
				<view>
					<u-upload class="upload" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1"
						multiple :maxCount="5" :previewFullImage="true" width="170" height="170">
						<image src="../../static/fix/upload.png" mode="widthFix"
							style="width: 170upx;height: 170upx; border-radius: 30px; background-color: #f5f5f5;">
						</image>
					</u-upload>
				</view>
			</scroll-view>



		</view>
		<button @click="submit">提交</button>
		<button @click="refresh">刷新</button>
		<view style="margin-top: 500upx;">
			<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
		</view>
		<view>
			<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
		</view>
		<view>
			<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
		</view>
		<view>
			<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
		</view>

		<tabBar :current="3"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aaa:"6666666666666666",
				//设置图片event
				event_image: [],
				name: '',
				phone: '',
				fileList1: [],
				image_list: [{
						src: "../../static/fix/air_conditioner.png",
						name: "空调",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/water_pump.png",
						name: "水泵",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/door.png",
						name: "大门",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/window.png",
						name: "窗户",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/Water.png",
						name: "饮水机",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/elevator.png",
						name: "电梯",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/stairway.png",
						name: "楼梯",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/other.png",
						name: "其他",
						class: "grid-item-box",
						select: 0
					},

				],


			}

		},
		methods: {
			change(e) {
				let {
					index
				} = e.detail

				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
				if (this.image_list[index].select === 0) {
					this.image_list[index].class = "grid-item-color",
						this.image_list[index].select = 1
					console.log(e.detail.index)
					// if (e.detail.index === 0) {
					// 	uni.request({
					// 		url: 'http://localhost:8888/fix/image/look',
					// 		responseType: 'arraybuffer',
					// 		data: {},
					// 		success: (res) => {
					// 			console.log(res);
					// 			let result = res.data;
					// 			//我们所需要的数据
					// 			this.image_list[index].src = 'data:image/png;base64,' + btoa(new Uint8Array(
					// 				result).reduce((
					// 				result, byte) => result + String.fromCharCode(byte), ''));;
					// 			//微信小程序不支持btoa，所以可以用下面这个
					// 			//this.image_list[index].src = 'data:image/png;base64,'+uni.arrayBufferToBase64(result);


					// 		}
					// 	})
					// }
				} else {
					this.image_list[index].class = "grid-item-box"
					this.image_list[index].select = 0
				}

			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.event_image.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// console.log("this[`fileList${event.name}`]",this[`fileList${event.name}`])
				for (let i = 0; i < lists.length; i++) {
					// const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',

					}))
					fileListLen++
				}
				for (let i = 0; i < fileListLen; i++) {
					let item = this[`fileList${event.name}`]
					this.event_image[i] = item[i].url
				}
				//console.log("this.event_image",this.event_image)
			},
			async submit() {
				let len = this.event_image.length
				for (let i = 0; i < len; i++) {
					var result = await this.uploadFilePromise(this.event_image[i])
					
				}
				
			},
			refresh() {
				uni.reLaunch({
					url: '/pages/index2/index'
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://127.0.0.1:8888/fix/image/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							// user: 'test'
						},
						
						success: (res) => {

							console.log("成功", res);


						},
						fail: (res) => {

							console.warn("失败", res);
							

						},
					});
				})
			},


		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}



	.form_style {
		/* background-color: #e6e6e6; */
		margin-left: 10rpx;
		font-size: 35upx;
		height: 80upx;
		width: 500upx;
		border-radius: 20upx;
	}

	.inputview {
		background-color: #e6e6e6;
		font-size: 35upx;
		height: 80upx;
		width: 500upx;
		margin-top: 6upx;
		border-radius: 20upx;
	}

	.image {
		width: 40px;
		height: 40px;

	}

	.text {
		font-size: 20px;
		margin-top: 2px;
	}


	.grid {
		padding-top: 30upx;

	}

	.grid-item-box {
		flex: 1;
		/* position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 15px;

		/* 		background-color: #e6e6e6;
		border-radius: 80upx; */
	}

	.grid-item-color {
		flex: 1;
		/* position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 15px;
		background-color: #9e9e9e;

	}

	.grid-item {
		padding-top: 15upx;

	}

	.upload {
		padding-top: 15upx;
		width: 100%;
		height: 150px;
		margin-left: 20upx;
		/* 		background-color:#fafafa  ; */
	}
</style>
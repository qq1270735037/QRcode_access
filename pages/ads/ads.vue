<template>
	<view>
		<scroll-view style="height: 700px;" scroll-y="true" class="scroll-Y">
			<uni-card style="border-radius: 30upx;" v-for="(item, index) in allimage" :key="index" :index="index">


				<u-row style="background-color: #ffffff;height: 200upx;">
					<u-col span="7.5">
						<!-- 公告 -->
						<view>
							<image :src="item.adName" mode="aspectFill" style="width: 150px;height: 80px;"
								@click="clickcard(index)">
							</image>
						</view>
					</u-col>
					<u-col span="6">
						<button class="	buttonitem " @click="deletead(index)">删除</button>
					</u-col>
				</u-row>

			</uni-card>


		</scroll-view>

		<u-row style="background-color: aqua;">
			<u-col span="4.5">

			</u-col>
			<u-col>
				<view style="position: absolute; bottom: 5%">
					<button class="	buttonitem2" @click="add()">添加</button>
				</view>
			</u-col>

		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				allimage: [],
			}
		},
		methods: {
			clickcard(index) {
				console.log("index：", index)
				uni.previewImage({
					urls: [this.allimage[index].adName], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: "", // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},


				});
			},
			add(){
				uni.chooseImage({
				
					count: 1, // 上传1张
				
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				
					sourceType: ['album'], // 从相册选择
				
					success: async (chooseImageRes) => {
				
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.uploadFilePromise(tempFilePaths[0])
				
				
				
				
					}
				
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					const uploadTask = uni.uploadFile({
						url: 'http://47.100.242.36:6001/ad/image/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							
						},
			
						success: (res) => {
							
								let datas = uni.getStorageSync("info")
											
								this.getallimage()
											
											
							
							resolve(res)
							console.log("上传成功", res);
							
			
						},
						fail: (err) => {
							reject(err)
							console.warn("失败", err);
			
			
						},
					});
				})
			},
			deletead(index) {
				console.log("delete:", index);
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'ad',
					data: {
						adId: this.allimage[index].adId
					},
					method: "DELETE",
					dataType: "json",
					success: (res) => {

						console.log("删除成功:", res);
						this.getallimage()



					},
					fail: (res) => {


					}

				})
			},
			getallimage() {
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'ad/search',
					data: {

					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("FixImage:", res.data.datas);

						this.allimage = res.data.datas


					},
					fail: (res) => {


					}

				})
			}

		},
		onShow() {
			this.getallimage()
		}
	}
</script>

<style>
	.buttonitem {
		height: 70upx;
		width: 150upx;
		line-height: 70upx;
		border-radius: 70upx;
		background-color: #ff007f;
		font-size: 35upx;
	}

	.buttonitem2 {
		height: 100upx;
		width: 200upx;
		line-height: 100upx;
		border-radius: 120upx;
		background-color: #55ff00;
		font-size: 35upx;
	}
</style>
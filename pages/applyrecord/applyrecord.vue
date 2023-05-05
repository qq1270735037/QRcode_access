<template>
	<view>
		<!-- 管理员界面 -->
		<view v-if="type===0">
			<view>
				<uni-segmented-control :current="select" :values="subsectionlist" style-type="text"
					active-color="#2a781d" @clickItem="sectionChange" style="border-radius: 50upx;" />

			</view>
			<view>
				<u-transition :show="transitionshow" mode="fade-left" duration="800">
					<view>
						<uni-card style="border-radius: 30upx;" v-for="(item, index) in applylist" :key="index"
							:index="index" @click="clickcard(index)" v-if="item.applyState===1&&select===0">

							<!-- 头像 -->
							<view>
								<u-avatar :src="allimage[index]" shape="circle" size="50px" mode="aspectFill"
									default-url="../../static/home/ad1.jpg"></u-avatar>
							</view>
							<u-row style="background-color: #ffffff;height: 80upx;">
								<u-col span="6">
									<view>
										<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
									</view>
								</u-col>
								<u-col span="6">
									<text
										style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">申请编号:{{item.applyId}}</text>
								</u-col>
							</u-row>

						</uni-card>
						<uni-card style="border-radius: 30upx;" v-for="(item, index) in applylist" :key="index"
							:index="index" @click="clickcard(index)" v-if="item.applyState===2&&select===1">

							<!-- 头像 -->
							<view>
								<u-avatar :src="allimage[index]" shape="circle" size="50px" mode="aspectFill"
									default-url="../../static/home/ad1.jpg"></u-avatar>
							</view>
							<u-row style="background-color: #ffffff;height: 80upx;">
								<u-col span="6">
									<view>
										<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
									</view>
								</u-col>
								<u-col span="6">
									<text
										style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">申请编号:{{item.applyId}}</text>
								</u-col>
							</u-row>


						</uni-card>

					</view>
					<view style="margin-top: 80upx;"></view>

				</u-transition>
			</view>
		</view>



		<!-- 游客界面 -->
		<view v-if="type===2">
			<u-transition :show="transitionshow" mode="fade-left" duration="800">
				<view>
					<uni-card style="border-radius: 30upx;" v-for="(item, index) in applylist" :key="index"
						:index="index" @click="clickcard(index)">

						<!-- 头像 -->
						<view>
							<u-avatar :src="allimage[index]" shape="circle" size="50px" mode="aspectFill"
								default-url="../../static/home/ad1.jpg"></u-avatar>
						</view>
						<u-row style="background-color: #ffffff;height: 80upx;">
							<u-col span="6">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
								</view>
							</u-col>
							<u-col span="6">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">申请编号:{{item.applyId}}</text>
							</u-col>
						</u-row>

					</uni-card>


				</view>
				<view style="margin-top: 80upx;"></view>

			</u-transition>
		</view>
	</view>

</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	export default {
		data() {
			return {
				type: '',
				subsectionlist: ['未处理', '已处理'],
				select: 0,
				//申请列表
				applylist: [],
				test: [],
				//动画
				transitionshow: true,
				allimage: [],
				pop: {
					name: '',
					applyid: '',
					time: '',
					state: '',
					applyMessage: '',
					userid: '',
					permittime: '',
					permitstate: '',
					idcard: '',
				}
			}
		},
		methods: {
			sectionChange(index) {
				this.select = index.currentIndex;
				this.allimage = [],
					this.getList()

			},
			getImage(imagePic) {
				return new Promise((resolve, reject) => {
					let a = uni.request({
						url: 'http://47.100.242.36:6001/' + 'fiximage/getFixImage',
						responseType: 'arraybuffer',
						data: {
							fixImageId: imagePic
						},

						success: (res) => {
							// console.log(res);
							let result = res.data;
							//我们所需要的数据
							let i = 'data:image/png;base64,' + btoa(new Uint8Array(
								result).reduce((
								result, byte) => result + String.fromCharCode(byte), ''));
							base64ToPath(i)
								.then(path => {
									// console.log("path", path)

									this.allimage.splice(this.allimage.length, 0, path)
									// console.log("this.allimage.length",imagePic)
								})
								.catch(error => {
									console.error("error", error)
								})
							resolve(res)



						},
						fail: (err) => {
							reject(err)
							console.warn("失败", err);


						},
					});
				})


			},
			clickcard(index) {
				console.log("index：", index)
				this.pop = this.applylist[index]
				console.log("this.applylist[index]", this.applylist[index])
				uni.navigateTo({
					url: '/pages/applyInfo/applyInfo' + '?item=' + encodeURIComponent(JSON.stringify(this.pop))
				})
			},
			// 显示列表
			getList() {
				//显示申请状态
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'permit/searchAllPermit',
					data: {
						applyState: this.select + 1
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {

						console.log("permit:", res);
						this.applylist = res.data
						for (var i = 0; i < this.applylist.length; i++) {
							// console.log("this.applylist[i].userImage",this.applylist[i].userImage)
							this.allimage.splice(this.allimage.length, 0, this.applylist[i].userImage)


						}

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})


			},
			//个人申请列表
			getListById(user) {
				//显示申请状态
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'permit/searchAllPermitById',
					data: {
						applyUser: user
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {

						console.log("permit:", res);
						this.applylist = res.data
						for (var i = 0; i < this.applylist.length; i++) {
							// console.log("this.applylist[i].userImage",this.applylist[i].userImage)
							
							this.allimage.splice(this.allimage.length, 0, this.applylist[i].userImage)

						}

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})


			},


		},
		onShow() {



			let datas = uni.getStorageSync("info")

			this.type = datas.userType
			if (this.type === 2) {
				this.getListById(datas.userId)
			}
			if (this.type === 0) {
				this.getList()
			}






		},


	}
</script>

<style>

</style>
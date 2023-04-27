<template>
	<view>
		<view>
			<uni-segmented-control :current="select" :values="subsectionlist" style-type="text" active-color="#2a781d"
				@clickItem="sectionChange" style="border-radius: 50upx;" />

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
							<u-col span="2">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
								</view>
							</u-col>
							<u-col span="10">
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
								default-url="../../static/home/ad1.jpg" ></u-avatar>
						</view>
						<u-row style="background-color: #ffffff;height: 80upx;">
							<u-col span="2">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
								</view>
							</u-col>
							<u-col span="10">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">申请编号:{{item.applyId}}</text>
							</u-col>
						</u-row>
						<!-- <u-row style="background-color: #ffffff;height: 30upx;">
					
							<u-col>
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">申请编号:{{item.applyId}}</text>
							</u-col>
						</u-row> -->

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
				subsectionlist: ['未处理', '已处理'],
				select: 0,
				//申请列表
				applylist: [],
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
					permitstate: ''
				}
			}
		},
		methods: {
			sectionChange(index) {
				this.select = index.currentIndex;
				
			},
			getImage(imagePic) {
				uni.request({
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
								console.log("path", path)
								this.allimage.splice(this.allimage.length, 0, path)
							})
							.catch(error => {
								console.error("error", error)
							})


						//微信小程序不支持btoa，所以可以用下面这个
						//this.image_list[index].src = 'data:image/png;base64,'+uni.arrayBufferToBase64(result);


					}
				})
			},
			clickcard(index) {
				console.log("index：", index)
				this.pop=this.applylist[index]
				console.log("this.applylist[index]",this.applylist[index])
				uni.navigateTo({
					url:'/pages/applyInfo/applyInfo'+'?item='+encodeURIComponent(JSON.stringify(this.pop))
				})
				//详情
				// uni.request({
				// 	url: 'http://47.100.242.36:6001/' + 'fix/searchByState',
				// 	data: {
				// 		fixState: this.select
				// 	},
				// 	method: "POST",
				// 	dataType: "json",
				// 	success: (res) => {

				// 		console.log("success:", res);
				// 		this.fixList = res.data.datas;

				// 	},
				// 	fail: (res) => {


				// 	}
				// })
			}
		},
		onShow() {



			let datas = uni.getStorageSync("info")

			//显示申请状态
			uni.request({
				url: 'http://47.100.242.36:6001/' + 'permit/searchAllPermit',
				data: {

				},
				method: "POST",
				dataType: "json",
				success: (res) => {

					console.log("permit:", res);
					this.applylist = res.data
					for (var i = 0; i < this.applylist.length; i++) {
						this.getImage(this.applylist[i].userImage)
					}

				},
				fail: (res) => {

					this.showToast("网络出错", 'error')


				}
			})




		},


	}
</script>

<style>

</style>
<template>
	<view>

		<view>
			<u-transition :show="transitionshow" mode="fade-up" duration="800">
				<view>
					<uni-card style="border-radius: 30upx;" v-for="(item, index) in selfList" :key="index"
						:index="index">



						<u-row style="background-color: #ffffff;height: 100upx;">
							<u-col span="3">
								<!-- 头像 -->
								<view>
									<u-avatar :src="image" shape="circle" size="50px" mode="aspectFill"
										default-url="../../static/home/ad1.jpg" @click="open"></u-avatar>
								</view>
							</u-col>
							<u-col span="10">
								<text
									style="font-size: 40upx; font-weight:400;  text-align:left; background-color: #ffffff;color: black;">{{item.backTime}}</text>
							</u-col>
						</u-row>
						<u-row style="background-color: #ffffff;height: 50upx; ">
							<u-col span="3">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{userName}}</text>
								</view>
							</u-col>
							<u-col span="9">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">编号:{{item.recordId}}</text>
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
				userName: '',
				subsectionlist: ['未处理', '已处理'],
				select: 0,
				//申请列表
				selfList: [],
				//动画
				transitionshow: true,
				image: "",

			}
		},
		methods: {
			
			open() {

				uni.previewImage({
					urls: [this.image], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: "", // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},


				});
			},
		},
		onLoad() {


			uni.showLoading({
				title: '加载中'
			})
			let datas = uni.getStorageSync("info")
			// this.image = datas.userImage
			this.userName = datas.userName
			this.image = datas.userImage
			//显示申请状态
			
			uni.request({
				url: 'http://47.100.242.36:6001/' + 'record/searchByUserId',
				data: {
					recordUserId: datas.userId
				},
				method: "POST",
				dataType: "json",
				success:async (res) => {

					console.log("record:", res);
					this.selfList = res.data.datas.All

					
					uni.hideLoading()
				},
				fail: (res) => {

					this.showToast("网络出错", 'error')


				}
			})
			



		}
	}
</script>

<style>

</style>
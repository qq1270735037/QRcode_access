<template>

	<view>

		<view>
			<u-transition :show="transitionshow" mode="fade-down" duration="500">
				<view>
					<swiper class="swiper-item" indicator-dots=true autoplay=true interval="8000" circular>
						<swiper-item v-for="(item,index) in image_list" :key="index">
							<image class="swiper-image" :src="item.adName"></image>
						</swiper-item>
					</swiper>
				</view>
			</u-transition>
		</view>


		<view>
			<u-transition :show="transitionshow" mode="fade-up" duration="500">
				<view>
					<u-grid :border="false" :col="3" style="background-color: #ffffff; margin-top: 20upx;">
						<u-grid-item v-for="(item,index) in taskList" :key="index" @click="clicktask(index)">
							<image :src=item.src mode="aspectFill"
								style="height: 100upx;width: 100upx;margin-top: 40upx"></image>
							</uni-grid-item>
							<text class="grid-text">{{item.name}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</u-transition>
		</view>


		<tabBar :current="0"></tabBar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				transitionshow: true,
				scrollTop: 0,
				taskList: [],
				current: 0,
				href: [],
				image_list: [{
						src: "../../static/home/ad1.jpg"
					},
					{
						src: "../../static/home/ad2.jpg"
					},
					{
						src: "../../static/home/ad3.jpg"
					},


				],
			}

		},
		methods: {
			clicktask(index) {
				console.log(index)
				switch (index) {

					case 0:
						uni.navigateTo({
							url: '/pages/qrcode/qrcode',
							// url: '/pages/scan/scan',

						});
						break;
					case 1:
						uni.navigateTo({

							url: '/pages/selfrecord/selfrecord',

						});
						break;
					case 2:

						if (this.type === 1) {
							uni.navigateTo({
								url: '/pages/fixrecord/fixrecord',

							});
						}
						if (this.type === 2 || this.type === 0) {
							uni.navigateTo({
								url: '/pages/applyrecord/applyrecord',

							});
						}



						break;
					case 3:

						uni.navigateTo({
							url: '/pages/fixrecord/fixrecord',

						});
						break;
					case 4:
						uni.navigateTo({

							url: '/pages/allrecord/allrecord',
						});
						break;
					case 5:
						uni.navigateTo({
							url: '/pages/manage/manage',
						});
						break;
					case 6:
						uni.navigateTo({
							url: '/pages/ads/ads',
						});
						break;
					default:
						uni.navigateTo({
							url: '/pages/scan/scan',
						});

						break;
				}
			},
			getallimage() {
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'ad/search',
					data: {

					},
					method: "POST",
					dataType: "json",
					success: (res) => {


						console.log(res)
						this.image_list = res.data.datas


					},
					fail: (res) => {


					}

				})
			},
			refresh() {
				uni.reLaunch({
					url: '/pages/home/home'
				})
			}
		},
		onPullDownRefresh() {
			this.refresh()
			uni.stopPullDownRefresh();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			let datas = uni.getStorageSync("info")
			this.getallimage()
			this.type = datas.userType
			if (this.type === 0) {
				this.taskList = [{
						name: '生成二维码',
						src: '../../static/home/code.png'
					},
					{
						name: '个人出行记录',
						src: '../../static/home/record.png'
					},
					{
						name: '门禁申请记录',
						src: '../../static/home/apply.png'
					},
					{
						name: '报修记录',
						src: '../../static/fix/fixapply.png'

					},

					{
						name: '统计',
						src: '../../static/home/statistics.png'
					},


					{
						name: '人员管理',
						src: '../../static/home/manage.png'
					},
					{
						name: '公告管理',
						src: '../../static/home/ad.png'
					}

				]
			}
			if (this.type === 1) {
				this.taskList = [{
						name: '生成二维码',
						src: '../../static/home/code.png'
					},
					{
						name: '个人出行记录',
						src: '../../static/home/record.png'
					},

					{
						name: '报修记录',
						src: '../../static/fix/fixapply.png'

					},
				]
			}
			if (this.type === 2) {
				this.taskList = [{
						name: '生成二维码',
						src: '../../static/home/code.png'
					},
					{
						name: '个人出行记录',
						src: '../../static/home/record.png'
					},
					{
						name: '门禁申请记录',
						src: '../../static/home/apply.png'
					},
				]
			}
		}

	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.swiper-item {
		display: flex;
		height: 380upx;
		text-align: center;
		line-height: 20upx;
		margin: auto;
		background-color: #ffffff;
	}

	.swiper-image {
		border-radius: 50upx;
		height: 350upx;
		width: 700upx;

	}

	.backicon {
		margin-bottom: 50upx;
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
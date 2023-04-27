<template>

	<view>
		
		<view>
			<u-transition :show="transitionshow" mode="fade-down" duration="500">
				<view>
					<swiper class="swiper-item" indicator-dots=true autoplay=true interval="8000" circular>
						<swiper-item v-for="(item,index) in image_list" :key="index">
							<image class="swiper-image" :src="item.src"></image>
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
				transitionshow:true,
				scrollTop: 0,
				taskList: [{
						name: '报修记录',
						src: '../../static/fix/fixapply.png'

					},
					
					{
						name: '统计',
						src: '../../static/home/statistics.png'
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
						name: '人员管理',
						src: '../../static/home/manage.png'
					}
				],
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
							url: '/pages/fixrecord/fixrecord',

						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/applyrecord/applyrecord',

						});
						break;
					case 3:

						uni.navigateTo({
							url: '/pages/applyrecord/applyrecord',
						
						});
						break;
					case 4:

						break;
					case 5:

						break;
					case 6:

						break;
					default:

						break;
				}
			},
			refresh() {
				this.href.splice(this.href.length, 0, "dk")
				console.log(this.href)
			}
		},
		onPullDownRefresh() {
			this.refresh()
			uni.stopPullDownRefresh();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
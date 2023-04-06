<template>

	<view>
		<view>
			<u-back-top class="backicon" :scroll-top="scrollTop" top="60"></u-back-top>
		</view>
		<view>
			<swiper class="swiper-item" indicator-dots=true autoplay=true interval="8000" circular>
				<swiper-item v-for="(item,index) in image_list" :key="index" >
					<image class="swiper-image" :src="item.src"></image>
				</swiper-item>
			</swiper>
		</view>
		<tabBar :current="0"></tabBar>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				current: 0,
				href: '../../static/home/ad1.jpg',
				image_list:[
					{src: "../../static/home/ad1.jpg"},
					{src: "../../static/home/ad2.jpg"},
					{src: "../../static/home/ad3.jpg"},
					
					
				],
			}

		},
		methods: {
			refresh() {
				this.href = Math.random()
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
		display: block;
		height: 380upx;
		text-align: center;
		margin-top: 20upx;
		line-height: 20upx;

	}

	.swiper-image {
		border-radius: 50upx;
		height: 350upx;
		width: 700upx;

	}
	.backicon{
		margin-bottom: 50upx;
	}
</style>
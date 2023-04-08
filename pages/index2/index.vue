<template>

	<view>
		<view>
			<u-row>
				<u-col span="2.8">
					<view>
						<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">个人信息:</text>
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
				<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">报修物品:</text>
			</view>
			<uni-grid  :column="3" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in 8" :index="index" :key="index">
					<view class="grid-item-box" >
						<uni-icons type="image" :size="40" color="#777" />
						<text class="text">文本信息</text>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>

		<tabBar :current="3"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',



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

	.contain {
		background-color: #ffaa00;
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
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 20px;
		margin-top: 5px;
	}


	.grid{
		padding-top: 20upx;
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
		padding: 15px 0;
	}
	
</style>
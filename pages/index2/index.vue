<template>

	<view>
		<u-row >
			<u-col span="2.8">
				<view >
					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600" >个人信息:</text>
				</view>
			</u-col>
			<u-col >
				<view >
					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">{{name}}</text>
				</view>
			</u-col>
		</u-row>
		<u-row >
			<u-col span="3">
				<view >
					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">联系方式:</text>
				</view>
			</u-col>
			<u-col span="9">
				<view class="inputview">
						<input class="form_style" type="number" v-model="phone" placeholder="请输入联系方式" ></input>
				</view>
			</u-col>
		</u-row>

		<tabBar :current="3"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				phone: '',
					
				

			}

		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.uForm.validateField('userInfo.sex')
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
	.inputview{
		background-color: #e6e6e6;
		font-size: 35upx;
		height: 80upx;
		width: 500upx;
		margin-top: 6upx;
		border-radius: 20upx;
	}
</style>
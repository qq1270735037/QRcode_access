<template>
	<view>
		<u--input v-model="phone" type="number" class="inputview" maxlength="11" placeholder="请输入联系方式" border="bottom" clearable
			fontSize="40upx"></u--input>
		<view>
			<button class="submit-btn" @click="submit">确认</button>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>

</template>

<script>
	export default {
		onLoad(){
			this.phone = uni.getStorageSync("info").userNumber

			


		},
		data() {
			return {
				phone: "",
				
			};
		},
		methods: {
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,
			
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			submit() {
					if (this.phone.length===11) {
						let datas = uni.getStorageSync("info")
				
						uni.request({
							url: 'http://47.100.242.36:6001/user/edit',
							data: {
								userId: datas.userId,
								userNumber: this.phone
							},
							method: "POST",
							dataType: "json",
							success: (res) => {
								let result = res.data.code
								console.log("success:", res);
								uni.setStorageSync('info', res.data.datas)
				
								if (result === 200) {
									this.showToast("修改成功", 'success')
									setTimeout(() => {
				
										uni.navigateBack()
									}, 1000);
								}
								if (result === 100) {
									this.showToast("修改失败", 'error')
									setTimeout(() => {
								
					
									}, 1000);
								}
				
				
							},
							fail: (res) => {
								console.log(res);
								uni.hideLoading();
								this.showToast("网络错误", 'error')
							}
						})
				
				
					}
					else{
						this.showToast("请输入正确的联系方式", 'error')
					}
				
			},

		},

	}
</script>

<style lang="scss">
	.inputview {
		background-color: #ffffff;
		font-weight: 400;
		padding-left: 30upx;
		margin-top: 8upx;
		border-radius: 20upx;
	}

	.submit-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 10px;
		margin-top: 28upx;
		background: #566cec;
		color: #ffffff;
		font-size: 28upx;
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #b9b9b9;
		box-shadow: 0 0 10px #cdcdcd;
		border-radius: 100px;

	}
</style>
<template>
	<view>
		<button @click="click">scan</button>
		<view>
			<u-toast ref="uToast" />
		</view>
		<view v-if="code===108" style="margin-top: 30px;">
			<image :src="src" mode="aspectFill" style="width: 320px;height: 320px; display:flex;margin: 0 auto;">

			</image>
			<text style="font-size: 40upx; display:block;margin: 0 auto;text-align:center;">暂无权限</text>
		</view>

		<view v-if="code===200" style="margin-top: 30px;">
			<image :src="src" mode="aspectFill" style="width: 320px;height: 320px; display:flex;margin: 0 auto;">
			</image>
			<text style="font-size: 40upx; display:block;margin: 0 auto;text-align:center;">验证成功</text>

		</view>

		<view v-if="code===100" style="margin-top: 30px;">
			<image :src="src" mode="aspectFill" style="width: 320px;height: 320px; display:flex;margin: 0 auto;">
			</image>
			<text style="font-size: 40upx; display:block;margin: 0 auto;text-align:center;">验证失败</text>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				src: '',
				code: 0,
			}
		},
		methods: {
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: '../../static/personInfo/invalid.png'
				})
			},
			click() {
				let that = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						let datas = uni.getStorageSync("info")
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.request({
							url: 'http://47.100.242.36:6001/' + 'qrcode/verify',
							name: 'requestbody',
							data: {
								verify: res.result
							},
							method: "POST",
							dataType: "json",
							success: (res) => {
								let result = res.data.code
								that.code = res.data.code
								console.log("success:", res);
								if (result === 200) {
									console.log("验证成功")
									that.src = "../../static/personInfo/normal.png"
									that.showToast("验证成功，门已开", 'success')

								}
								if (result === 107) {
									that.showToast("二维码过期", 'error')
									that.src = "../../static/personInfo/invalid.png"
									console.log("二维码过期")
								}
								if (result === 100) {
									that.showToast("验证失败", 'error')
									that.src = "../../static/personInfo/invalid.png"
									console.log("验证失败")
								}
								if (result === 108) {
									that.src = "../../static/qrcode/limit.png"
									that.showToast("无权限", 'error')

								}


							},
							fail: (res) => {
								console.log(res);

								that.showToast("网络错误", 'error')
							}
						});
					}
				});
			}
		},
		onShow() {

		}

	}
</script>

<style>

</style>
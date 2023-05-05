<template>
	<view>
		<uni-card style="height: 600px;">
			<text
				style="font-size: 40upx; font-weight:700;  text-align:left; background-color: #ffffff; color: black;">门禁二维码</text>
			<u-divider lineColor="#dfdfdf"></u-divider>
			<u-row style="background-color: #ffffff;height:100upx;margin-top: 20px;">
				<u-col span="3">
					<view>
						<u-avatar :src="myImage" size="70px" mode="aspectFill"
							default-url="../../static/home/ad1.jpg"></u-avatar>
					</view>
				</u-col>
				<u-col span="6">
					<text style="font-size: 40upx;text-align:left; background-color: #ffffff;">{{myName}}</text>
				</u-col>
			</u-row>
			<view style="margin-top: 50px;width: 100%; height: 350px; ">
				<u-loading-icon v-if="mycode===''" text="加载中" :vertical="true" size="80" mode="circle"
					style="width: 350px;height: 350px;margin:auto;margin-top: 20px;"></u-loading-icon>
				<image v-if="mycode!==''" :src="mycode" mode="aspectFill"
					style="width: 320px;height: 320px; display:flex;margin: 0 auto;">
				</image>
				<view style="width: 100%;"></view>
				<text v-if="mycode==='../../static/qrcode/limit.png'" style="font-size: 40upx; display:block;margin: 0 auto;text-align:center; background-color: #ffffff;">暂无权限</text>

			</view>

		</uni-card>

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
				mycode: '',
				myImage: "",
				myName: ''
			}
		},
		methods: {
			
			generateCodeImage(userId) {
				return new Promise((resolve, reject) => {
					let a = uni.request({
						url: 'http://47.100.242.36:6001/' + 'qrcode/generateCode',
						dataType: "json",
						data: {
							userId: userId
						},
						method: "POST",
						success: (res) => {
							if (res.data.code === 108) {
								console.log("getcode", res);
								this.mycode = "../../static/qrcode/limit.png"
								resolve(res)
							}
							if(res.data.code === 200){
								console.log("getcode", res);
								let result = res.data.datas.codeImage;
								//我们所需要的数据
								
								this.mycode = result
								console.log("this.mycode", this.mycode)
								resolve(res)
								
							}
							

						},
						fail: (err) => {
							reject(err)
							console.warn("失败", err);


						},
					});
				})
			},

		},
		onLoad() {

			let datas = uni.getStorageSync("info")
			
			this.myName = datas.userName
			this.myImage =datas.userImage
			this.generateCodeImage(datas.userId)
		}

	}
</script>

<style>

</style>
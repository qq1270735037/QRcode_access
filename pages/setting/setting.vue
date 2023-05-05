<template>
	<view>

		<view>
			<u-transition :show="transitionshow" mode="fade-up" duration="800">
				<view>
					<uni-card style="border-radius: 30upx;" >
						<u-row style="background-color: #ffffff;height: 50upx; ">
							<u-col span="3">
								<view>
									<text style="font-size: 35upx; font-weight:600">当前版本</text>
								</view>
							</u-col>
							<u-col span="9">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">1.0</text>
							</u-col>
						</u-row>

					</uni-card>


				</view>
				

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
				transitionshow:true,
				image: "",

			}
		},
		methods: {
			getImage(userImage) {
				console.log("userImage", userImage)
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'user/image',
					responseType: 'arraybuffer',
					data: {
						userImage: userImage
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
								// console.log("path", path)

								this.image = path


							})
							.catch(error => {
								console.error("error", error)
							})
					}
				})
			}
			
		},
		onLoad() {}
	}
</script>

<style>

</style>
<template>



	<u-tabbar :value="current?current:0" @change="change1" :fixed="true" :border="false" :placeholder="true"
		:safeAreaInsetBottom="true">
		<image src="../../static/home/nav_btn.png" class="btnfixMin"></image>
		<u-tabbar-item :class="item.margin" v-for="(item,index) in list" :key="index" :text="item.text" @click="click1">
			<image :class="item.class" slot="active-icon" :src="item.src"></image>
			<image :class="item.class" slot="inactive-icon" :src="item.src2"></image>
		</u-tabbar-item>
		<view>
			<u-toast ref="uToast" />
		</view>
	</u-tabbar>





</template>

<script>
	export default {
		name: 'tabBar',
		props: {
			current: Number
		},
		data() {
			return {

				list: [{
						margin: "",
						class: "image_item",
						src2: "../../static/tabbar/home.png",
						src: "../../static/tabbar/home-fill.png",
						text: '首页',
						customIcon: false,
						pagePath: "pages/home/home"
					},
					{
						margin: "",
						class: "image_item",
						src2: "../../static/tabbar/rocket.png",
						src: "../../static/tabbar/rocket-fill.png",
						text: '出行',
						customIcon: false,
						pagePath: "pages/travel/travel"
					},
					{
						margin: "txt-item",
						class: "image_item_big",
						src2: "../../static/tabbar/scan.png",
						src: "../../static/tabbar/scan.png",
						text: '扫一扫',
						customIcon: false,
						pagePath: "pages/index1/index"
					},
					{
						margin: "",
						class: "image_item",
						src2: "../../static/tabbar/fix.png",
						src: "../../static/tabbar/fix-fill.png",

						text: '报修',
						customIcon: false,
						pagePath: "pages/fix/fix"
					},
					{
						margin: "",
						class: "image_item",
						src2: "../../static/tabbar/my.png",
						src: "../../static/tabbar/my-fill.png",
						text: '我的',
						customIcon: false,
						pagePath: "pages/my/my"
					}
				],
			}
		},
		onLoad() {

		},
		created() {

			uni.hideTabBar()
		},
		onShow() {

		},
		methods: {
			click1(e) {
				console.log('click1', e);
			},
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			change1(name) {

				console.log("name:", name)
				if (name !== 2) {
					uni.reLaunch({
						url: '/' + this.list[name].pagePath,
					})
				} else {
					let that = this
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							let datas = uni.getStorageSync("info")
							console.log('时间：' + uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss'));
							console.log('条码内容：' + res.result);
							if (res.result === "e479401727f9c41586af596c714a5632") {
								uni.request({
									url: 'http://47.100.242.36:6001/' + 'qrcode/request',
									name: 'requestbody',
									data: {
										verify: datas,
										time: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')
									},
									method: "POST",
									dataType: "json",
									success: (res) => {
										let result = res.data.code
										console.log("success:", res);
										if (result === 200) {
											console.log("验证成功")
											that.showToast("验证成功，门已开", 'success')

										}
										if (result === 100) {
											that.showToast("验证失败", 'success')
											console.log("验证失败")
										}
										if (result === 108) {
											that.showToast("无权限", 'error')

										}


									},
									fail: (res) => {
										console.log(res);

										that.showToast("网络错误", 'error')
									}
								});
							}
							else{
								that.showToast("请扫描正确的门禁二维码", 'error')
							}
						}
					});
				}

			},
		},
	}
</script>

<style lang="scss">
	.btnfixMin {
		width: 750upx;
		height: 178upx;
		position: absolute;
		z-index: -100;
		bottom: 0;
	}

	.content {
		text-align: center;
		height: 400upx;

	}

	.image_item {
		height: 40upx;
		width: 40upx;
	}

	.image_item_big {
		height: 90upx;
		width: 90upx;

	}

	.txt-item {
		margin-bottom: 50upx;
	}
</style>
<template>

	<view>
		<u-transition :show="transitionshow" mode="slide-up" duration="500">
			<!-- 头像部分 -->
			<view style="margin-top: 15upx;">
				<u-row style="background-color: #ffffff;height: 155upx;">
					<u-col span="9" @click="userImage">
						<view style="margin-left: 20upx;">
							<text class="imagetext">头像</text>
						</view>
					</u-col>
					<u-col span="2">
						<view>
							<u-avatar :src="myImage" shape="circle" size="120upx" mode="aspectFill"
								default-url="../../static/home/ad2.jpg" @click="open"></u-avatar>
						</view>
					</u-col>
					<u-col span="1" @click="userImage">
						<view style="margin:0 auto; display: flex; height: 155upx;">
							<image style="margin-top: 55upx;" class="image" src="../../static/my/right.png"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<!-- 详细信息部分 -->
			<view>
				<u-row class="list" v-for="(item, index) in my_list" :index="index" :key="index"
					@click="select_cell(item.select)">
					<u-col span="3">
						<view style="margin-left: 20upx;">
							<text style="font-size: 35upx; font-weight:400">{{item.name}}</text>
						</view>
					</u-col>
					<u-col span="8">
						<text
							style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">{{item.text}}</text>
					</u-col>
					<u-col span="1" style="display: flex;">
						<view style="margin:0 auto; display: flex;">
							<image class="image" src="../../static/my/right.png"></image>
						</view>
					</u-col>
				</u-row>
			</view>
			<view>
				<u-datetime-picker :show="showdate" :minDate="-2209017943000" :maxDate="maxdate" visibleItemCount=6
					itemHeight=88 v-model="datepicker" mode="date" @confirm="dateconfirm"
					@cancel="datecancel"></u-datetime-picker>
				<u-picker :show="locationshow" visibleItemCount=4 itemHeight=120 :columns="location"
					@confirm="locationconfirm" @cancel="locationcancel"></u-picker>
			</view>
			<view>
				<u-toast ref="uToast" />
			</view>
		</u-transition>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				transitionshow: true,
				maxdate: new Date().getTime(),
				location: [
					['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼']
				],
				locationshow: false,
				showdate: false,
				datepicker: Number(new Date()),
				flag1: true,
				myImage: "../../static/home/ad3.jpg",
				name: "高富帅",
				id: "600005",
				my_list: [{
						name: "名称",
						text: "高富帅",
						select: 0,
						url: "pages/changename/changename"
					},
					{
						name: "ID",
						text: "600500",
						select: 1,

					},
					{
						name: "性别",
						text: "女",
						select: 2,
						url: "pages/changegender/changegender"
					},
					{
						name: "联系方式",
						text: "18888888888",
						select: 3,
						url: "pages/changephone/changephone"
					},
					{
						name: "生日",
						text: "2000-11-11",
						select: 4,
					},
					{
						name: "身份证",
						text: "353232323256565656",
						select: 5,
						url: "pages/changecard/changecard"
					},
					{
						name: "楼栋号",
						text: "2",
						select: 6
					},

				],

			}

		},
		methods: {
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			userImage() {
				console.log("点击了头像")

			},
			open() {

				uni.previewImage({
					urls: [this.myImage], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: "", // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},


				});
			},
			detail() {

			},
			select_cell(e) {
				console.log("点击了", e)
				let url = "/" + this.my_list[e].url
				switch (e) {

					case 0:
						uni.navigateTo({
							url: url,

						});
						break;
					case 2:
						uni.navigateTo({
							url: url,

						});
						break;
					case 3:
						uni.navigateTo({
							url: url,

						});
						break;
					case 4:
						this.showdate = true
						break;
					case 5:
						uni.navigateTo({
							url: url,

						});
						break;
					case 6:
						this.locationshow = true
						break;
					default:

						break;
				}




			},
			dateconfirm(e) {
				console.log("ok", uni.$u.timeFormat(e.value, 'yyyy-mm-dd'))
				this.my_list[4].text = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')

				let datas = uni.getStorageSync("info")

				uni.request({
					url: 'http://47.100.242.36:6001/user/edit',
					data: {
						userId: datas.userId,
						userDate: this.my_list[4].text
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



				this.showdate = false
			},
			datecancel(e) {
				this.showdate = false
			},
			locationconfirm(e) {
				this.locationshow = false
				let datas = uni.getStorageSync("info")
				uni.request({
					url: 'http://47.100.242.36:6001/user/edit',
					data: {
						userId: datas.userId,
						userLocation: e.indexs[0] + 1
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						let result = res.data.code
						console.log("success:", res);
						uni.setStorageSync('info', res.data.datas)
						let datas = uni.getStorageSync("info")
						this.my_list[6].text = datas.userLocation + "号楼"
						if (result === 200) {
							this.showToast("修改成功", 'success')
							setTimeout(() => {


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
				console.log("ok", e.indexs[0])
			},
			locationcancel(e) {
				this.locationshow = false
			},
			// refresh() {
			// 	uni.reLaunch({
			// 		url: '/pages/userinfo/userinfo'
			// 	})
			// },
		},

		onShow() {
			let datas = uni.getStorageSync("info")
			this.my_list[0].text = datas.userName
			this.my_list[1].text = datas.userId
			this.my_list[2].text = datas.userGender
			this.my_list[3].text = datas.userNumber
			this.my_list[4].text = uni.$u.timeFormat(datas.userDate, 'yyyy-mm-dd')
			this.my_list[5].text = datas.userIdcard
			this.my_list[6].text = datas.userLocation + "号楼"
			uni.request({
				url: 'http://47.100.242.36:6001/user/image',
				responseType: 'arraybuffer',
				data: {
					userImage: datas.userImage
				},
				success: (res) => {
					// console.log(res);
					let result = res.data;
					//我们所需要的数据
					this.myImage = 'data:image/png;base64,' + btoa(new Uint8Array(
						result).reduce((
						result, byte) => result + String.fromCharCode(byte), ''));
					//微信小程序不支持btoa，所以可以用下面这个
					//this.image_list[index].src = 'data:image/png;base64,'+uni.arrayBufferToBase64(result);


				}
			})
		}


	}
</script>

<style>
	.left {
		padding-left: 50upx;
		background-color: aqua;
		height: 200upx;
	}

	.imagetext {
		font-size: 35upx;
		height: 155upx;
		font-weight: 400;
		display: flex;
		align-items: center;
		flex-direction: row;

	}

	.list {
		height: 110upx;
		background-color: #ffffff;
		margin-top: 5upx
	}

	.image {
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
</style>
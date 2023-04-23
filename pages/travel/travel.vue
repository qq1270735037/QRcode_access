<template>

	<view>
		<u-transition :show="transitionshow" mode="slide-left" duration="800">
			<view>
				<uni-card title="申请" v-for="(item, index) in applylist" :key="index" :index="index"
					thumbnail="../../static/travel/apply.png" @click="clickcard(index)">
					<u-steps :current="item.applyState"  dot>
						<u-steps-item title="提交申请"></u-steps-item>
						<u-steps-item title="待审批"></u-steps-item>
						<u-steps-item title="已完成"></u-steps-item>
					</u-steps>
					<u-row style="background-color: #ffffff;height: 80upx;">
						<u-col span="8">
							<view v-if="item.applyState===1">
								<text style="color: #60d04c; font-size: 35upx">收到了一个申请</text>
							</view>
							<view v-if="item.applyState===2">
								<text style="color: #fc926b; font-size: 35upx">已完成</text>
							</view>
						</u-col>
						<u-col span="5">
							<view>
								<text>来自：{{item.userName}}</text>
							</view>
						</u-col>

					</u-row>

				</uni-card>
			</view>
			<view style="margin-top: 80upx;"></view>

		</u-transition>
		<view>
			<u-overlay :show="overlayshow" @click="overlayshow=false" opacity=0.7>
				<view class="warp">

					<view class="rect" @tap.stop>
						<!-- 头像 -->
						<view>
							<u-avatar class="imagecenter" :src="myImage" shape="circle" size="80px" mode="aspectFill"
								default-url="../../static/home/ad1.jpg" @click="open"></u-avatar>
						</view>

						<!-- 信息Name -->
						<u-row style="background-color: #f5efff;height: 100upx;margin-top: 30upx;border-radius: 50upx;">
							<u-col span="3">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">Name:</text>
								</view>
							</u-col>
							<u-col span="5">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.name}}</text>
								</view>
							</u-col>
						</u-row>

						<!-- 信息ID -->
						<u-row style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
							<u-col span="1.8">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">ID:</text>
								</view>
							</u-col>
							<u-col span="5">
								<view>
									<text style="font-size: 40upx ">{{pop.userid}}</text>
								</view>
							</u-col>
						</u-row>
						<!-- 信息Time -->
						<u-row style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
							<u-col span="4">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">申请时间:</text>
								</view>
							</u-col>
							<u-col span="8">
								<view>
									<text style="font-size: 35upx;margin-left: 20upx; ">{{pop.time}}</text>
								</view>
							</u-col>
						</u-row>
						<!-- 信息State -->
						<u-row style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
							<u-col span="2.5">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">状态:</text>
								</view>
							</u-col>
							<u-col span="5">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.state}}</text>
								</view>
							</u-col>
						</u-row>
						<!-- 信息Message -->
						<u-row
							style="background-color: #f5efff;width: 25%; height: 95upx;margin-top: 10upx;border-radius: 50upx;">
							<u-col>
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">备注:</text>
								</view>
							</u-col>

							<!-- <u-col span="5">
								<view>
									<text style="font-size: 40upx;margin-left: 20upx; ">通过</text>
								</view>
							</u-col> -->
						</u-row>
						<view class="messagebody">
							<uni-card style="border-radius: 50upx; background-color: #f5efff;" :is-shadow="false">
								<text style="font-size: 40upx ;color: black;">{{pop.applyMessage}}</text>
							</uni-card>
						</view>
						<view v-if="pop.state==='待审批'" style="flex: auto;">
							<u-row style="background-color: aqua;">
								<u-col span="6">
									<view style="position: absolute; bottom: 190upx;margin-left: 50upx;">
										<button class="buttonitem1" @click="reject(pop.id)">拒绝</button>
									</view>
								</u-col>
								<u-col span="6">
									<view style="position: absolute; bottom: 190upx;margin-left: 30upx;">
										<button class="buttonitem2" @click="agree(pop.id)">同意</button>
									</view>
								</u-col>
							</u-row>
						</view>
						<view v-if="pop.state==='已完成'" style="flex: auto;">
							<view style="position: absolute; bottom: 190upx; width: 85%;">
								<button class="buttonitem3" @click="overlayshow=false">已完成</button>
							</view>
						</view>
					</view>

				</view>
			</u-overlay>
		</view>
		<tabBar :current="1"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// message:'da6d56',
				myImage: '',
				applylist: [],
				overlayshow: false,
				transitionshow: true,
				pop: {
					name: '',
					id: '',
					time: '',
					state: '',
					applyMessage: '',
					userid: ''
				}
			}

		},
		methods: {
			clickcard(index) {
				console.log("点击", index)
				//获取单个数据 并单独获取申请者
				uni.request({
						url: 'http://47.100.242.36:6001/' + 'user/' + this.applylist[index].applyUser,
						data: {

						},
						method: "GET",
						dataType: "json",
						success: (res) => {

							console.log("success:", res);
							this.pop.name = res.data.userName
							this.pop.userid = res.data.userId
							this.pop.time = this.applylist[index].applyTime;
							this.pop.applyMessage = this.applylist[index].applyMessage;
							this.pop.id = this.applylist[index].applyId;
							if (this.applylist[index].applyState === 1) {
								this.pop.state = "待审批"
							}
							if (this.applylist[index].applyState === 2) {
								this.pop.state = "已完成"
							}
							this.overlayshow = true
						},
						fail: (res) => {

							console.log("fail:", res);
						}
					}),
					//获取头像
					uni.request({
						url: 'http://47.100.242.36:6001/user/image',
						responseType: 'arraybuffer',
						data: {
							userImage: this.applylist[index].userImage
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



			},
			reject(id) {
				this.overlayshow = false
				console.log("拒绝")
			},
			agree(id) {
				this.overlayshow = false
				console.log("同意")
				//提交同意
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'apply/edit',
					data: {
						applyId: this.pop.id,
						applyState: 2
					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("apply:", res);

					},
					fail: (res) => {


					}
				})
			},
			open() {

				uni.previewImage({
					//需要预览的图片http链接列表，多张的时候，url直接写在后面
					urls: [this.myImage],
					// 当前显示图片的http链接，默认是第一个
					current: "",
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},


				});
			},
		},
		onShow() {
			//显示申请列表
			uni.request({
				url: 'http://47.100.242.36:6001/' + 'apply/search',
				data: {

				},
				method: "POST",
				dataType: "json",
				success: (res) => {

					console.log("success:", res);
					this.applylist = res.data.datas;

				},
				fail: (res) => {


				}
			})
		},
		//物理返回按钮先返回到首页
		onBackPress(options) {
			this.overlayshow = false
			return true;
		},
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 320px;
		height: 600px;
		background-color: #fff;
	}

	.imagecenter {
		display: flex;
		margin: 0 auto;
		margin-top: 20upx;


	}

	.messagebody {
		width: 420upx;
		margin-left: 130upx;
		margin-top: -120upx;

	}

	.buttonitem1 {
		height: 100upx;
		width: 220upx;
		border-radius: 40upx;
		background-color: #ff8585;
		font-size: 40upx;
	}

	.buttonitem2 {
		height: 100upx;
		width: 220upx;
		border-radius: 40upx;
		background-color: #55aaff;
		font-size: 40upx;
	}

	.buttonitem3 {
		height: 100upx;
		width: 220upx;
		border-radius: 40upx;
		background-color: #61ff73;
		justify-items: center;
		align-items: center;
		font-size: 40upx;
	}
</style>
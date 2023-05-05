<template>

	<view>
		<!-- 管理员界面 -->
		<view v-if="type===0">
			<u-transition :show="transitionshow" mode="fade-left" duration="800">
				<view>
					<uni-card title="申请" v-for="(item, index) in applylist" :key="index" :index="index"
						thumbnail="../../static/travel/apply.png" @click="clickcard(index,item)">
						<u-steps :current="item.applyState" dot>
							<u-steps-item title="提交申请"></u-steps-item>
							<u-steps-item title="待审批"></u-steps-item>
							<u-steps-item title="已完成"></u-steps-item>
						</u-steps>
						<u-row style="background-color: #ffffff;height: 60upx;">
							<u-col span="8">
								<view v-if="item.applyState===1">
									<text style="color: #3c9cff; font-size: 35upx">收到了一个申请</text>
								</view>
								
								<view v-if="item.applyState===2">
									<text style="color: #fc926b; font-size: 35upx">已完成</text>
								</view>
								
							</u-col>
							

						</u-row>
						
						<u-row style="background-color: #ffffff;height: 60upx;">
							<u-col span="8">
								<view >
									<text style=" font-size: 35upx">申请ID:{{item.applyId}}</text>
								</view>
							</u-col>
							<u-col span="4">
								<view >
									<text style=" font-size: 35upx">来自：{{item.userName}}</text>
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
							<scroll-view style="height: 500px;" scroll-y="true" class="scroll-Y">
								<!-- 头像 -->
								<view>
									<u-avatar class="imagecenter" :src="myImage" shape="circle" size="80px"
										mode="aspectFill" default-url="../../static/home/ad1.jpg"
										@click="open"></u-avatar>
								</view>

								<!-- 信息Name -->
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 30upx;border-radius: 50upx;">
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
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
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
								<!-- 身份证 -->
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
									<u-col span="2.5">
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">证件:</text>
										</view>
									</u-col>
									<u-col span="9.5">
										<view>
											<text style="font-size: 35upx;margin-left: 20upx; ">{{pop.idcard}}</text>
										</view>
									</u-col>
								</u-row>
								<!-- 信息Time -->
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
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
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
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
									<uni-card style="border-radius: 50upx; background-color: #f5efff;"
										:is-shadow="false">
										<text style="font-size: 40upx ;color: black;">{{pop.applyMessage}}</text>
									</uni-card>
								</view>
								<view v-if="pop.state==='已完成'">
									<!-- 审批时间 -->
									<u-row
										style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
										<u-col span="4">
											<view>
												<text style="font-size: 40upx;margin-left: 20upx; ">审批时间:</text>
											</view>
										</u-col>
										<u-col span="8">
											<view>
												<text
													style="font-size: 35upx;margin-left: 20upx; ">{{pop.permittime}}</text>
											</view>
										</u-col>
									</u-row>
									<!-- 审批状态 -->
									<u-row
										style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
										<u-col span="4">
											<view>
												<text style="font-size: 40upx;margin-left: 20upx; ">审批状态:</text>
											</view>
										</u-col>
										<u-col span="8">
											<view>
												<text
													style="font-size: 35upx;margin-left: 20upx; ">{{pop.permitstate}}</text>
											</view>
										</u-col>
									</u-row>

								</view>
							</scroll-view>


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
		</view>





		<!-- 游客租户界面 -->
		<view class="input-content" v-if="type!==0">

			<view>
				<!-- 账号 -->
				<u-row style="background-color: #ffffff;height: 100upx;margin-top: 20upx;border-radius: 20upx;">
					<u-col span="1.5" style="background-color: #ffffff;">
						<view>
							<image src="../../static/travel/detail.png"
								style=" margin-top: 7px; margin-left: 5px; width: 30px;height: 30px;">
							</image>
						</view>
					</u-col>
					<u-col span="8">
						<view>
							<input placeholder-style="color: #a7a7a7" type="number" v-model="form.userId"
								placeholder="请输入申请账号(数字)" maxlength="18" 
								style="color: #000000;font-size: 20px;" />
						</view>
					</u-col>
				</u-row>
				<!-- 姓名 -->
				<u-row style="background-color: #ffffff;height: 100upx;margin-top: 20upx;border-radius: 20upx;">
					<u-col span="1.5" style="background-color: #ffffff;">
						<view>
							<image src="../../static/travel/name.png"
								style=" margin-top: 7px; margin-left: 5px; width: 30px;height: 30px;">
							</image>
						</view>
					</u-col>
					<u-col span="8">
						<view>
							<input placeholder-style="color: #a7a7a7" type="text" v-model="form.username"
								placeholder="请输入姓名" maxlength="10" 
								style="color: #000000;font-size: 20px;" />
						</view>
					</u-col>
				</u-row>

				<!-- 描述 -->
				<view style="background-color: #ffffff;height: 100upx;margin-top: 20upx;border-radius: 20upx;">

					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">描述:</text>


					<u--textarea class="textarea" v-model="form.applyMessage" placeholder="请输入申请理由" maxlength="100"
						autoHeight></u--textarea>

				</view>
			</view>

			<view>
				<button class="submit-btn" @click="applySubmit">提交</button>
			</view>


		</view>


		<view>
			<u-toast ref="uToast" />
		</view>
		<tabBar :current="1"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
				// message:'da6d56',
				permit: [],
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
					userid: '',
					permittime: '',
					permitstate: '',
					idcard: ''
				},
				form: {
					userId: '',
					username: '',
					applyMessage: '',

				},
			}

		},
		methods: {
			//游客，业主
			applySubmit() {
				if (this.form.userId && this.form.username) {
					uni.request({
						url: 'http://47.100.242.36:6001/' + 'apply/add',
						data: {
							applyUser: this.form.userId,
							applyState: 1,
							applyMessage: this.form.applyMessage,
							applyTime:uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')
						},
						method: "POST",
						dataType: "json",
						success: (res) => {

							if (res.data.code === 200) {

								console.log("applysubmit:", res);
								this.showToast("提交成功", 'success')
								
							}
							if (res.data.code === 101) {
							
								console.log("applysubmit:", res);
								this.showToast("请输入正确的ID", 'error')
							}
							if (res.data.code === 102) {
							
								console.log("applysubmit:", res);
								this.showToast("提交失败", 'error')
							}
							this.form.userId=null
							this.form.username=null
							this.form.applyMessage=null
						},
						fail: (res) => {
							this.showToast("网络错误", 'error')
							this.form.userId=null
							this.form.username=null
							this.form.applyMessage=null
						}
					})
				} else {
					this.showToast("请完善信息", 'error')

				}
			},
			//管理员
			clickcard(index, item) {
				console.log("点击", index)
				console.log("点击", item)
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
							this.pop.time = uni.$u.timeFormat(this.applylist[index].applyTime,
								'yyyy-mm-dd hh:MM:ss')
							if (this.applylist[index].applyMessage) {
								this.pop.applyMessage = this.applylist[index].applyMessage;
							} else {
								this.pop.applyMessage = '无'
							}
							this.pop.id = this.applylist[index].applyId;
							this.pop.idcard = res.data.userIdcard
							this.myImage=res.data.userImage
							if (this.applylist[index].applyState === 1) {
								this.pop.state = "待审批"
							}
							if (this.applylist[index].applyState === 2) {
								this.pop.state = "已完成"
							}
							for (var i = 0; i < this.permit.length; i++) {

								if (this.permit[i].applyId === this.pop.id) {
									this.pop.permittime = this.permit[i].permitTime
									console.log("apply:", this.permit[i].permitTime);
									if (this.permit[i].permitState === 0) {
										this.pop.permitstate = "已拒绝"
									}
									if (this.permit[i].permitState === 1) {
										this.pop.permitstate = "已同意"
									}
								}
							}
							this.overlayshow = true
						},
						fail: (res) => {


							this.showToast("网络出错", 'error')

							console.log("fail:", res);
						}
					})




			},
			submit() {
				//提交apply同意
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'apply/edit',
					data: {
						applyId: this.pop.id,
						applyState: 2,
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
			reject(id) {
				this.overlayshow = false
				console.log("拒绝")
				this.submit()
				this.pop.state = "已完成"
				let that = this;
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'permit/add',
					data: {
						applyId: this.pop.id,
						permitState: 0,
						permitTime: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						uni.reLaunch({
							url: '/pages/travel/travel'
						})
						console.log("permit:", res);


					},
					fail: (res) => {


					}
				})
			},
			agree(id) {
				this.overlayshow = false
				console.log("同意")
				this.submit()
				this.pop.state = "已完成"
				let that = this;
				//登记permit时间和状态
				// let time=uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')
				// console.log("time",time)

				uni.request({
					url: 'http://47.100.242.36:6001/' + 'permit/add',
					data: {
						applyId: this.pop.id,
						applyUser:this.pop.userid,
						permitState: 1,
						permitTime: uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss')
					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("permit:", res);
						uni.reLaunch({
							url: '/pages/travel/travel'
						})


					},
					fail: (res) => {


					}
				})
			},
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
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
			let datas = uni.getStorageSync("info")
			this.type = datas.userType
			//显示申请列表
			uni.request({
				url: 'http://47.100.242.36:6001/' + 'apply/search',
				data: {

				},
				method: "POST",
				dataType: "json",
				success: (res) => {

					console.log("success:", res.data.datas.All);
					this.applylist = res.data.datas.All;

				},
				fail: (res) => {

					this.showToast("网络出错", 'error')


				}
			})
			//显示申请状态
			uni.request({
				url: 'http://47.100.242.36:6001/' + 'permit/searchPermit',
				data: {

				},
				method: "GET",
				dataType: "json",
				success: (res) => {

					// console.log("permit:", res);
					this.permit = res.data

				},
				fail: (res) => {

					this.showToast("网络出错", 'error')


				}
			})
		},
		//物理返回按钮先返回到首页
		onBackPress(options) {
			this.overlayshow = false
			return true;
		},
		onPullDownRefresh() {

			uni.reLaunch({
				url: '/pages/travel/travel'
			})

			uni.stopPullDownRefresh();
		},
	}
</script>

<style>
	.container {
		padding-top: 20rpx;
		position: relative;
		overflow: hidden;
		/* background: url(../../static/images/public/bg.png); */
		background-color: #ffffff;
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
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

	.input-item {
		/* display: flex; */
		flex-direction: row;
		/* align-items: center;
		justify-content: center; */
		padding: 0 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-bottom: 50rpx;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.6);
		border: 1rpx solid #eee;

	}

	.input-content {
		padding: 0 30rpx;
	}

	.textarea {
		font-size: 35px;
		font-weight: 600;
		border-radius: 20upx;

	}

	.submit-btn {
		width: 500upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 10px;
		margin-top: 300upx;
		background: #566cec;
		color: #ffffff;
		font-size: 40upx;
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #b9b9b9;
		box-shadow: 0 0 10px #cdcdcd;
		border-radius: 100px;

	}
</style>
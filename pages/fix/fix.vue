<template>

	<view>
		<!-- 用户页面 -->
		<view v-if="type===1">
			<view style="background-color: #ffffff;margin-top: 15upx;">
				<u-row style="padding-top: 15upx;">
					<u-col span="3">
						<view>
							<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">个人信息: </text>
						</view>
					</u-col>
					<u-col span="9">
						<view>
							<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">{{name}}</text>
						</view>
					</u-col>
				</u-row>
				<u-row>
					<u-col span="3">
						<view>
							<text style=" font-size: 35upx;margin-left: 15upx; font-weight:600">联系方式:</text>
						</view>
					</u-col>
					<u-col span="9">
						<view class="inputview">
							<text style=" font-size: 35upx;margin-left: 15upx; font-weight:600">{{phone}}</text>
						</view>
					</u-col>
				</u-row>
			</view>
			<view style="background-color: #ffffff;margin-top: 15upx; height: 760upx;">
				<view>
					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">选择报修物品:</text>
				</view>
				<view style="padding-top: 15upx;">
					<uni-grid class="grid" :column="3" @change="change" :showBorder="false" :highlight="false">
						<uni-grid-item class="grid-item" style="width: 190upx; height: 190upx; "
							v-for="(item, index) in image_list" :index="index" :key="index">
							<view :class="item.class">
								<image :src="item.src" class="image" mode="aspectFill" />
								<text class="text">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>

			</view>
			<!-- 上传头像 -->
			<view style="background-color: #ffffff;margin-top: 15upx;">
				<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">上传物品图片:</text>
				<scroll-view style="padding-top:10px;" scroll-y="true" class="scroll-Y">
					<view>
						<u-upload class="upload" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
							name="1" multiple :maxCount="3" :previewFullImage="true" width="170" height="170">
							<image src="../../static/fix/upload.png" mode="widthFix"
								style="width: 170upx;height: 170upx;">
							</image>
						</u-upload>
					</view>
				</scroll-view>
			</view>


			<view style="background-color: #ffffff;margin-top: 15upx;">
				<view>
					<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">描述:</text>
				</view>
				<view>
					<u--textarea class="textarea" v-model="describe" placeholder="请输入内容" maxlength="100"
						autoHeight></u--textarea>
				</view>
			</view>

			<view>
				<button class="submit-btn" @click="submit">提交</button>
			</view>
			<view>
				<u-toast ref="uToast" />
			</view>


			<view style="margin-top:200upx;">

			</view>
		</view>
		<!-- 管理员页面 -->
		<view v-if="type===0">
			<u-transition :show="transitionshow" mode="fade-left" duration="800">
				<view>
					<uni-card title="报修申请" v-for="(item, index) in fixList" :key="index" :index="index"
						thumbnail="../../static/fix/fixapply.png" @click="clickcard(index)">

						<u-row style="background-color: #ffffff;height: 80upx;">
							<u-col span="8">
								<view v-if="fixList[index].fixState===0">
									<text style="color: #57c248; font-size: 35upx">收到了一个报修申请</text>
								</view>
								<view v-if="fixList[index].fixState===1">
									<text style="color: #7c7c7c; font-size: 35upx">已检修</text>
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
				<u-overlay :show="overlayshow" @click="overlayshow=false ,allimage=[]" opacity=0.7>
					<view class="warp">

						<view class="rect" @tap.stop>
							<scroll-view style="height: 500px;" scroll-y="true" class="scroll-Y">
								<!-- 名字Name -->
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

								<!-- 联系方式 -->
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
									<u-col span="4">
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">联系方式:</text>
										</view>
									</u-col>
									<u-col span="8">
										<view>
											<text style="font-size: 35upx;margin-left: 20upx; ">{{pop.phone}}</text>
										</view>
									</u-col>
								</u-row>

								<!-- 状态State -->
								<u-row
									style="background-color: #f5efff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
									<u-col span="4">
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">报修物品:</text>
										</view>
									</u-col>
									<u-col span="5">
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.fixname}}</text>
										</view>
									</u-col>
								</u-row>
								<!-- 图片 -->
								<u-row
									style="background-color: #f5efff;width: 25%; height: 95upx;margin-top: 10upx;border-radius: 50upx;">
									<u-col>
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">图片:</text>
										</view>
									</u-col>

								</u-row>
								<view>
									<uni-grid :column="3" :showBorder="false" :highlight="false">
										<uni-grid-item class="grid-item2" style="width: 180upx; height: 180upx; "
											v-for="(item,index) in allimage" :key="index">
											<image :src=item mode="aspectFill" style="height: 180upx;width: 180upx;"
												@click="clickImage(index)"></image>
										</uni-grid-item>
									</uni-grid>
								</view>

								<!-- 信息Message -->
								<u-row
									style="background-color: #f5efff;width: 25%; height: 95upx;margin-top: 30upx;border-radius: 50upx;">
									<u-col>
										<view>
											<text style="font-size: 40upx;margin-left: 20upx; ">备注:</text>
										</view>
									</u-col>

								</u-row>
								<!-- fixmessage -->
								<view class="messagebody">
									<uni-card style="border-radius: 50upx; background-color: #f5efff;"
										:is-shadow="false">
										<text
											style="font-size: 40upx ;color: black;width:100%;display:inline-block;white-space: pre-wrap;word-wrap: break-word;height: auto;"
											space="nbsp">{{pop.fixMessage}}</text>
									</uni-card>
								</view>

							</scroll-view>
							<!-- 按钮 -->
							<view v-if="pop.state===0" style="flex: auto;">
								<u-row style="background-color: aqua;">
									<u-col span="6">
										<view style="position: absolute; bottom: 190upx;margin-left: 50upx;">
											<button class="buttonitem1" @click="reject(pop.id)">未完成</button>
										</view>
									</u-col>
									<u-col span="6">
										<view style="position: absolute; bottom: 190upx;margin-left: 30upx;">
											<button class="buttonitem2" @click="agree(pop.id)">已检修</button>
										</view>
									</u-col>
								</u-row>
							</view>
							<view v-if="pop.state===1" style="flex: auto;">
								<view style="position: absolute; bottom: 190upx; width: 85%;">
									<button class="buttonitem3" @click="overlayshow=false,allimage=[]">已检修</button>
								</view>
							</view>
						</view>

					</view>
				</u-overlay>
			</view>
		</view>

		<!-- 游客界面 -->
		<view v-if="type===2">
			<u-empty mode="permission" width="500" height="500" marginTop="50" textSize="80"
				icon="http://cdn.uviewui.com/uview/empty/permission.png">
			</u-empty>
		</view>


		<tabBar :current="3"></tabBar>
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
				test: "",
				//管理员端数据
				//宫格图片列表
				allimage: [],
				//图片api列表
				FixImage: [],
				overlayshow: false,
				pop: {
					id: '',
					name: '',
					phone: '',
					fixname: '',
					state: '0',
					fixMessage: '无',
				},
				//报修列表
				fixList: [],

				//用户端数据
				//动画
				transitionshow: true,
				//用户类型
				type: 2,
				//选项框属性
				select: 0,
				describe: '',
				beselect: '',
				//设置图片event
				event_image: [],
				name: '',
				phone: '',
				fileList1: [],
				image_list: [{
						src: "../../static/fix/air_conditioner.png",
						name: "空调",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/water_pump.png",
						name: "水泵",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/door.png",
						name: "大门",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/window.png",
						name: "窗户",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/Water.png",
						name: "饮水机",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/elevator.png",
						name: "电梯",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/stairway.png",
						name: "楼梯",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/dianlu.png",
						name: "电路",
						class: "grid-item-box",
						select: 0
					},
					{
						src: "../../static/fix/other.png",
						name: "其他",
						class: "grid-item-box",
						select: 0
					},

				],


			}

		},
		methods: {
			reject(id) {
				this.overlayshow = false
				this.allimage = []

			},
			agree(id) {
				this.overlayshow = false
				this.allimage = []
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'fix',
					data: {
						fixId: this.pop.id,
						fixState: 1
					},
					method: "PUT",
					dataType: "json",
					success: (res) => {

						console.log("fix success:", res);
						this.refresh()


					},
					fail: (res) => {


					}

				})
			},
			//管理员端列表图片点击
			clickImage(index) {

				console.log("点击图片：", index)

				this.open(index)
				// console.log(this.allimage[index])

			},
			open(index) {

				uni.previewImage({
					urls: this.allimage, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: index, // 当前显示图片的http链接，默认是第一个
					indicator: "default",
					success: function(res) {
						console.log("点击图片成功")
					},
					fail: function(res) {
						console.log("点击图片失败")
					},
					complete: function(res) {},


				});
			},
			//管理员端页面列表点击
			clickcard(index) {
				console.log("点击")
				this.pop.name = this.fixList[index].userName
				this.pop.state = this.fixList[index].fixState
				this.pop.fixname = this.fixList[index].fixName
				this.pop.phone = this.fixList[index].userNumber
				this.pop.id = this.fixList[index].fixId
				if (this.fixList[index].fixMessage) {
					this.pop.fixMessage = this.fixList[index].fixMessage
				} else {
					this.pop.fixMessage =
						'无'
				}
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'fiximage/getImageList',
					data: {
						fixId: this.pop.id
					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("FixImage:", res.data.datas);

						this.FixImage = res.data.datas

						if (this.FixImage !== null) {
							for (var i = 0; i < this.FixImage.length; i++) {
								
								this.allimage.splice(this.allimage.length, 0, this.FixImage[i].imagePic)
							}

						}
					},
					fail: (res) => {

						this.FixImage = null
					}

				})

				//最后显示
				this.overlayshow = true

			},
			// getImage(imagePic) {
			// 	uni.request({
			// 		url: 'http://47.100.242.36:6001/' + 'fiximage/getFixImage',
			// 		responseType: 'arraybuffer',
			// 		data: {
			// 			fixImageId: imagePic
			// 		},
			// 		success: (res) => {
			// 			// console.log(res);
			// 			let result = res.data;
			// 			//我们所需要的数据
			// 			let i = 'data:image/png;base64,' + btoa(new Uint8Array(
			// 				result).reduce((
			// 				result, byte) => result + String.fromCharCode(byte), ''));
			// 			base64ToPath(i)
			// 				.then(path => {
			// 					console.log("path", path)
			// 					this.allimage.splice(this.allimage.length, 0, path)
			// 				})
			// 				.catch(error => {
			// 					console.error("error", error)
			// 				})


			// 			//微信小程序不支持btoa，所以可以用下面这个
			// 			//this.image_list[index].src = 'data:image/png;base64,'+uni.arrayBufferToBase64(result);


			// 		}
			// 	})
			// },
			//用户端页面点击
			change(e) {
				let {
					index
				} = e.detail

				this.beselect = this.image_list[e.detail.index].name
				//背景颜色调整
				if (this.image_list) {
					this.image_list[index].class = "grid-item-color"
					this.image_list[index].select = 1
					this.select = 1
					for (let i = 0; i < this.image_list.length; i++) {
						if (i !== index) {
							this.image_list[i].class = "grid-item-box"
							this.image_list[i].select = 0
						}
					}
					console.log(e.detail.index)

				}
			},
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
				this.event_image.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// console.log("this[`fileList${event.name}`]",this[`fileList${event.name}`])
				for (let i = 0; i < lists.length; i++) {
					// const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',

					}))
					fileListLen++
				}
				for (let i = 0; i < fileListLen; i++) {
					let item = this[`fileList${event.name}`]
					this.event_image[i] = item[i].url
				}
				//console.log("this.event_image",this.event_image)
			},
			async submit() {
				let len = this.event_image.length
				let result = ""
				if (len > 0 && this.select === 1 && this.phone) {
					//上传数据
					let datas = uni.getStorageSync("info")
					let uploadid = ''
					uni.request({
						url: 'http://47.100.242.36:6001/' + 'fix/upload',
						data: {
							userId: datas.userId,
							fixName: this.beselect,
							fixState: 0,
							fixMessage: this.describe
						},
						method: "POST",
						dataType: "json",
						success: (res) => {
							let uploadresult = res.data.code
							console.log("id:", res.data.datas.fixId);
							uploadid = res.data.datas.fixId;
							console.log("success:", uploadresult);
							if (uploadresult === 200) {
								this.showToast("提交成功", 'success')
								//上传图片
								for (let i = 0; i < len; i++) {
									result = this.uploadFilePromise(this.event_image[i], uploadid)
									// console.log("result",result)
								}

								setTimeout(() => {
									this.refresh()
								}, 1000);

							}
							if (uploadresult === 101) {
								this.showToast("提交失败", 'error')
							}

						},
						fail: (res) => {
							this.showToast("网络错误", 'error')

						}
					})



				} else {
					this.showToast("请选择物品类型", 'error')
				}

			},
			refresh() {
				uni.reLaunch({
					url: '/pages/fix/fix'
				})
			},
			uploadFilePromise(url, id) {
				return new Promise((resolve, reject) => {
					const uploadTask = uni.uploadFile({
						url: 'http://47.100.242.36:6001/fiximage/image/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							uploadid: id
						},

						success: (res) => {
							resolve(res)
							console.log("上传成功", res);


						},
						fail: (err) => {
							reject(err)
							console.warn("失败", err);


						},
					});
				})
			},


		},

		onShow() {

			let datas = uni.getStorageSync("info")
			this.name = datas.userName
			this.phone = datas.userNumber
			this.type = datas.userType
			if (this.type === 0) {
				//显示报修列表

				uni.request({
					url: 'http://47.100.242.36:6001/' + 'fix/search',
					data: {

					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						// console.log("success:", res);
						this.fixList = res.data.datas;

					},
					fail: (res) => {


					}
				})

			}

		},
		onPullDownRefresh() {

			uni.reLaunch({
				url: '/pages/fix/fix'
			})

			uni.stopPullDownRefresh();
		},
		//物理返回按钮先返回到首页
		onBackPress(options) {

			this.overlayshow = false;
			this.allimage = []
			return true;

		},

	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
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
		background-color: #ffffff;
		font-size: 35upx;
		height: 82upx;
		width: 500upx;
		margin-top: 35upx;
		border-radius: 20upx;
	}

	.image {
		width: 40px;
		height: 40px;

	}

	.text {
		font-size: 20px;
		margin-top: 2px;
	}


	.grid {
		/* padding-left: 50px; */
		// width: 90%;
		display: flex;
		margin: 0 auto;
		border-radius: 120upx;
		border-color: #ffffff;
	}


	.grid-item-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 15px;
		// border-radius: 120upx;
		background-color: #ffffff;
	}

	.grid-item-color {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 15px;
		background-color: #94d6ff;
		border-radius: 120upx;
	}

	.grid-item {
		margin-top: 30upx;
		margin-left: 55upx;
		border-radius: 120upx;

	}

	.grid-item2 {
		margin-top: 30upx;
		margin-left: 20upx;


	}

	.upload {
		padding-top: 15upx;
		width: 100%;
		height: 200px;
		margin-left: 20upx;
		/* 		background-color:#fafafa  ; */
	}

	.line-item {
		flex: 1;
		/* position: relative; */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30upx;

	}

	.textarea {
		font-size: 555upx;
		margin-left: 15upx;
		margin-top: 20upx;
		font-weight: 600;

	}

	.box-bg {
		background-color: #F5F5F5;
		padding: 5px 0;
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

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 340px;
		height: 620px;
		background-color: #fff;
	}

	.imagecenter {
		display: flex;
		margin: 0 auto;
		margin-top: 20upx;


	}

	.messagebody {
		width: 500upx;
		margin-left: 140upx;
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
<template>

	<view >
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
							<input class="form_style" type="number" maxlength="11" v-model="phone"
								placeholder="请输入联系方式"></input>
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
			
			<view style="background-color: #ffffff;margin-top: 15upx;">
				<text style="font-size: 35upx;margin-left: 15upx; font-weight:600">上传物品图片:</text>
				<scroll-view style="padding-top:10px;" scroll-y="true" class="scroll-Y">
					<view>
						<u-upload class="upload" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1"
							multiple :maxCount="3" :previewFullImage="true" width="170" height="170">
							<image src="../../static/fix/upload.png" mode="widthFix" style="width: 170upx;height: 170upx;">
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
			<u-transition :show="transitionshow" mode="slide-up" duration="800">
				<view>
					<uni-card title="报修申请" v-for="(item, index) in 8" :key="index" :index="index"
						thumbnail="../../static/fix/fixapply.png" @click="clickcard(index)">
						
						<!-- <u-steps :current="item.fixState" dot>
							<u-steps-item title="提交申请" ></u-steps-item>
							<u-steps-item title="待完成" ></u-steps-item>
							<u-steps-item title="已结单"></u-steps-item>
						</u-steps> -->
						<u-row style="background-color: #ffffff;height: 80upx;">
							<u-col span="8">
								<view>
									<text>收到了一个报修申请</text>
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
		</view>
		

		<tabBar :current="3"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fixList:[],
				//动画
				transitionshow: true,
				//用户类型
				type:2,
				//选项框属性
				select: 0,
				describe: '',
				beselect:'',
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
			change(e) {
				let {
					index
				} = e.detail

				this.beselect=this.image_list[e.detail.index].name
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
					let datas=uni.getStorageSync("info")
					let uploadid=''
					uni.request({
						url: 'http://47.100.242.36:6001/' + 'fix/upload',
						data: {
							userId: datas.userId,
							fixName:this.beselect,
							fixState:0,
							fixMessage:this.describe
						},
						method: "POST",
						dataType: "json",
						success: (res) => {
							let uploadresult = res.data.code
							console.log("id:", res.data.datas.fixId);
							uploadid=res.data.datas.fixId;
							console.log("success:", uploadresult);
							if (uploadresult === 200) {
								this.showToast("提交成功", 'success')
								//上传图片
								for (let i = 0; i < len; i++) {
									result = this.uploadFilePromise(this.event_image[i],uploadid)
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
					this.showToast("请选择物品类型和联系方式", 'error')
				}

			},
			refresh() {
				uni.reLaunch({
					url: '/pages/fix/fix'
				})
			},
			uploadFilePromise(url,id) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://47.100.242.36:6001/fiximage/image/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							uploadid:id
						},

						success: (res) => {
							resolve(res)
							console.log("成功", res);


						},
						fail: (err) => {
							reject(err)
							console.warn("失败", err);


						},
					});
				})
			},


		},
		onNavigationBarButtonTap(e) {
			this.refresh();
		},
		onShow() {
			let datas = uni.getStorageSync("info")
			this.name = datas.userName
			this.phone = datas.userNumber
			this.type=datas.userType
		}

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
</style>
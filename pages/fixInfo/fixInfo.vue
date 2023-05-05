<template>

	<view>
		<scroll-view style="height: 700px;" scroll-y="true" class="scroll-Y">
			<!-- 名字Name -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 30upx;border-radius: 50upx;">
				<u-col span="3">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">业主:</text>
					</view>
				</u-col>
				<u-col span="5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.name}}</text>
					</view>
				</u-col>
			</u-row>

			<!-- 联系方式 -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
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
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="4">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">报修内容:</text>
					</view>
				</u-col>
				<u-col span="5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.fixname}}</text>
					</view>
				</u-col>
			</u-row>


			<!-- 报修状态 -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="3.5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">报修状态:</text>
					</view>
				</u-col>
				<u-col span="8">
					<view>
						<text v-if="pop.state===0"
							style="font-size: 40upx;margin-left: 20upx; color: #d44300;">待处理</text>
					</view>
					<view>
						<text v-if="pop.state===1" style="font-size: 40upx;margin-left: 20upx;  ">已完成</text>
					</view>
				</u-col>
			</u-row>
			<!-- 信息Message -->
			<u-row style=" height: 95upx;margin-top: 10upx;">
				<u-col>
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">备注:</text>
					</view>
				</u-col>

			</u-row>

			<u-row
				style="background-color: #ffffff; height: 150upx;margin-top: 10upx;border-radius: 10upx; margin-left: 20upx;">
				<u-col>
					<view>
						<text style="font-size: 40upx;margin-left: 40upx; ">{{pop.fixMessage}}</text>
					</view>
				</u-col>

			</u-row>
			<!-- 图片 -->
			<u-row style=" height: 95upx;margin-top: 10upx;">
				<u-col>
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">详情:</text>
					</view>
				</u-col>

			</u-row>
			<view>
				<uni-grid :column="3" :showBorder="false" :highlight="false" style="background-color: #ffffff;">
					<uni-grid-item class="grid-item" style="width: 180upx; height: 180upx; "
						v-for="(item,index) in allimage" :key="index">
						<image :src=item.imagePic mode="aspectFill" style="height: 180upx;width: 180upx;"
							@click="clickImage(index)"></image>
					</uni-grid-item>
				</uni-grid>
				<view style="padding-top: 50upx;"></view>
			</view>

		</scroll-view>
		<!-- 按钮 -->
		<view v-if="pop.state===0&&type===0" style="flex: auto; ">
			<u-row style="background-color: aqua;">
				<u-col span="4.5">

				</u-col>
				<u-col>
					<view style="position: absolute; bottom: 5%">
						<button class="buttonitem" @click="clickdeal()">去处理</button>
					</view>
				</u-col>

			</u-row>
		</view>
		<view v-if="pop.state===1&&type===0" style="flex: auto; ">
			<u-row style="background-color: aqua;">
				<u-col span="5">

				</u-col>
				<u-col>
					<view style="position: absolute; bottom: 50upx;">
						<image src="../../static/fix/success.png" mode="aspectFill"
							style="width: 120upx; height: 120upx;"></image>
					</view>
				</u-col>

			</u-row>
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
				type: '',
				FixImage: [],
				allimage: [],
				pop: {
					id: '',
					name: '',
					phone: '',
					fixname: '',
					state: 0,
					fixMessage: '',
				},
			}
		},
		methods: {
			clickdeal() {
				uni.reLaunch({
					url: '/pages/fix/fix'
				})


			},
			clickImage(index) {
				this.openimage(index)
			},
			openimage(index) {
				let url = [];

				for (var i = 0; i < this.allimage.length; i++) {
					url.splice(url.length, 0, this.allimage[i].imagePic)
				}
				uni.previewImage({
					//需要预览的图片http链接列表，多张的时候，url直接写在后面
					urls: url,
					// 当前显示图片的http链接，默认是第一个
					current: index,
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},


				});
			},
			getImage(imagePic) {
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'fiximage/getFixImage',
					responseType: 'arraybuffer',
					data: {
						fixImageId: imagePic
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
								console.log("path", path)
								this.allimage.splice(this.allimage.length, 0, path)
							})
							.catch(error => {
								console.error("error", error)
							})


						//微信小程序不支持btoa，所以可以用下面这个
						//this.image_list[index].src = 'data:image/png;base64,'+uni.arrayBufferToBase64(result);


					}
				})
			},
			getallimage(id) {
				uni.request({

					url: 'http://47.100.242.36:6001/' + 'fiximage/getImageList',
					data: {
						fixId: id
					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("FixImage:", res.data.datas);

						this.FixImage = res.data.datas

						if (this.FixImage !== null) {
							this.allimage = this.FixImage

						}
					},
					fail: (res) => {

						this.FixImage = null
					}

				})
			}
		},
		onLoad: function(option) {
			if (option) {
				this.pop = JSON.parse(decodeURIComponent(option.item));
				// this.pop=option
				console.log("option", option.item)

			}

		},
		onShow() {
			let datas = uni.getStorageSync("info")
			this.type = datas.userType
			this.allimage = [],
				this.getallimage(this.pop.id)
		}

	}
</script>

<style>
	.messagebody {
		width: 500upx;
		margin-left: 140upx;
		margin-top: -120upx;

	}

	.buttonitem {
		height: 100upx;
		width: 220upx;
		border-radius: 40upx;
		background-color: #aaff00;
		font-size: 40upx;
	}

	.grid-item {
		margin-top: 30upx;
		margin-left: 50upx;


	}
</style>
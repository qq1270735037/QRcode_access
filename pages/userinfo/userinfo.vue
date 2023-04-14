<template>

	<view>
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

	</view>
</template>

<script>
	export default {
		data() {
			return {
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
						url: "pages/changename/changename"
					},
					{
						name: "性别",
						text: "男",
						select: 2,
						url: "pages/changename/changename"
					},
					{
						name: "联系方式",
						text: "18888888888",
						select: 3,
						url: "pages/changename/changename"
					},
					{
						name: "生日",
						text: "2000-11-11",
						select: 4,
						url: "pages/changename/changename"
					},
					{
						name: "身份证",
						text: "353232323256565656",
						select: 5,
						url: "pages/changename/changename"
					},
					{
						name: "楼栋号",
						text: "6号楼",
						select: 6,
						url: "pages/changename/changename"
					},

				],

			}

		},
		methods: {
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
				switch (e) {
					case 0:
						let url = "/" + this.my_list[e].url + "?nickname=" + this.my_list[e].text

						uni.navigateTo({
							url: url,
							events: {
								// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
								acceptDataFromOpenedPage: function(data) {
									console.log("acceptDataFromOpenedPage",data)
								},
								submitname: function(data) {
										console.log("submitname",data)
										console.log("submitname",data.code)
									}
									
							},
							success: function(res) {
								// 通过eventChannel向被打开页面传送数据
								res.eventChannel.emit('acceptDataFromOpenerPage', {
									data: '上一页传参'
								})
							}
						});
						break;
					case 1:

						break;
					default:

						break;
				}




			},
			refresh() {
				uni.reLaunch({
					url: '/pages/userinfo/userinfo'
				})
			},
		},
		onNavigationBarButtonTap(e) {
			this.refresh();
		},
	

	
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
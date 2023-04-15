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
		<view>
			<u-datetime-picker :show="showdate" :maxDate="maxdate" visibleItemCount=6 itemHeight=88 v-model="datepicker" mode="date"
				@confirm="dateconfirm" @cancel="datecancel"></u-datetime-picker>
			<u-picker :show="locationshow"  visibleItemCount=4 itemHeight=120 :columns="location" @confirm="locationconfirm" @cancel="locationcancel"></u-picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxdate:new Date().getTime(),
				location:[
					['1号楼', '2号楼', '3号楼','4号楼','5号楼','6号楼','7号楼']
				],
				locationshow:false,
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
						url: "pages/changename/changename"
					},
					{
						name: "楼栋号",
						text: "2号楼",
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
						let url = "/" + this.my_list[e].url + "?my_list=" + JSON.stringify(this.my_list[e])

						uni.navigateTo({
							url: url,

						});
						break;
					case 2:
						let url2 = "/" + this.my_list[e].url + "?my_list=" + JSON.stringify(this.my_list[e])

						uni.navigateTo({
							url: url2,

						});
						break;
					case 3:
						let url3 = "/" + this.my_list[e].url + "?my_list=" + JSON.stringify(this.my_list[e])

						uni.navigateTo({
							url: url3,

						});
						break;
					case 4:
						this.showdate = true
						break;
					case 5:
						let url5 = "/" + this.my_list[e].url + "?my_list=" + JSON.stringify(this.my_list[e])

						uni.navigateTo({
							url: url5,

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
				this.showdate = false
			},
			datecancel(e) {
				this.showdate = false
			},
			locationconfirm(e){
				this.locationshow = false
				console.log("ok",e.indexs[0])
			},
			locationcancel(e){
				this.locationshow = false
			},
			refresh() {
				uni.reLaunch({
					url: '/pages/userinfo/userinfo'
				})
			},
		},
		onNavigationBarButtonTap(e) {
			console.log("e",e)
			if(e.float==="right"){
				this.refresh();
			}
			if(e.float==="left"){
				uni.reLaunch({
					url: '/pages/my/my'
				})
			}
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
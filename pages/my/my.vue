<template>

	<view>

		<view>
			<u-row style="background-color: #ffffff;height: 220upx;">
				<u-col span="3">
					<view style="margin-left: 20upx;">
						<u-avatar :src="myImage" shape="circle" size="80px" mode="aspectFill"
							default-url="../../static/home/ad2.jpg" @click="open"></u-avatar>
					</view>
				</u-col>
				<u-col span="7">
					<view>
						<view>
							<text style="font-size: 40upx;margin-left: 20upx; font-weight:600">{{name}}</text>
						</view>
						<view style="margin-top: 30upx;">
							<text style="font-size: 40upx;margin-left: 20upx;color:#7e7e7e">ID:{{id}}</text>
						</view>

					</view>
				</u-col>
				<u-col span="2">
					<view @click="detail">
						<image src="../../static/my/code.png" style="width: 50upx;height: 50upx;margin-left: 20px;" ></image>

					</view>
				</u-col>
			</u-row>
		</view>
		<view style="padding-top: 30upx;" v-show="flag1" >
			<u-row  style="height: 110upx; background-color: #ffffff;margin-top:3upx"v-for="(item, index) in my_list" :index="index" :key="index" @click="select_cell(item.select)" >
				<u-col span="2" >
					<view style="display: flex;">
						<image :src="item.src" style="height: 40upx;width: 40upx;margin-left: 50upx;"></image>
					</view>
				</u-col>
				<u-col span="8"  >
					<view style="margin-top: -5upx; ">
						<text style="font-size: 35upx; font-weight:400">{{item.name}}</text>
					</view>
				</u-col>
				<u-col span="2"style="display: flex;background-color: #ffffff;">
					<view style="margin:0 auto; display: flex;">
						 <image src="../../static/my/right.png" style="width: 40upx;height: 40upx;margin-left: 20px;" ></image>
					</view>
				</u-col>
			</u-row>
			
			
		</view>

		<tabBar :current="4"></tabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag1:true,
				myImage: "../../static/home/ad3.jpg",
				name: "高富帅",
				id: "600005",
				my_list: [{
						src: "../../static/my/detail.png",
						name: "个人信息",
						select: 0
					},
					{
						src: "../../static/my/travel.png",
						name: "出行记录",
						select: 1,
					},
					{
						src: "../../static/my/fix.png",
						name: "报修记录",
						select: 2
					},
					{
						src: "../../static/my/setting.png",
						name: "设置",
						class: "grid-item-box",
						select: 3
					},
					{
						src: "../../static/my/loginout.png",
						name: "退出登录",
						class: "grid-item-box",
						select: 4
					},
				],
				page:[
					{
						url:"pages/userinfo/userinfo"
					},
					{
						url:"pages/userinfo/userinfo"
					},
					{
						url:"pages/userinfo/userinfo"
					},
					{
						url:"pages/userinfo/userinfo"
					},
					{
						url:"pages/login/login"
					},
				],
			}

		},
		methods: {
			open(){
				
				uni.previewImage({
				        urls: [this.myImage], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
				        current: "", // 当前显示图片的http链接，默认是第一个
				        success: function (res) {},
				        fail: function (res) {},
				        complete: function (res) {},
				
				       
				      });
			},
			detail(){
				
			},
			select_cell(e){
				console.log("点击了：",e)
				let url="/"+this.page[e].url
				if(e!==4){
					uni.reLaunch({
						url: url
					});
				}
				else{
					uni.redirectTo({
						url: url
					});
				}
				
			},
		}
	}
</script>

<style>
	.left {
		padding-left: 50upx;
		background-color: aqua;
		height: 200upx;
	}
</style>
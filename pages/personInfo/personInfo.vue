<template>

	<view>
		<scroll-view style="height: 650px;" scroll-y="true" class="scroll-Y">
			<u-transition :show="transitionshow" mode="slide-up" duration="500">

				<!-- 头像部分 -->
				<view style="margin-top: 15upx;">
					<u-row style="background-color: #ffffff;height: 155upx;">
						<u-col span="9.5" @click="userImage">
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
						<u-col span="8.5" v-if="item.name!=='状态'">
							<text
								style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">{{item.text}}</text>
						</u-col>
						<u-col span="8.5" v-if="item.name==='状态'&&item.text===1">
							<image class="image" src="../../static/personInfo/normal.png"></image>
						</u-col>

						<u-col span="8.5" v-if="item.name==='状态'&&item.text===0">
							<image class="image" src="../../static/personInfo/invalid.png"></image>
						</u-col>

					</u-row>

				</view>
				<view>
					<u-toast ref="uToast" />
				</view>
				<view>
					<u-picker :show="statepickshow" :columns="columns" visibleItemCount=2 itemHeight=120 @cancel="cancel"
						@confirm="stateconfirm"></u-picker>
				</view>
				<view>
					<u-picker :show="typepickshow" :columns="columns2" visibleItemCount=2 itemHeight=120 @cancel="cancel"
						@confirm="typeconfirm"></u-picker>
				</view>
			</u-transition>
		</scroll-view>

		<!-- <view style="position: absolute; bottom: 10upx; width: 100%;">
			<button class="buttonitem" @click="button">权限管理</button>
		</view> -->

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
				typepickshow: false,
				statepickshow: false,
				columns: [
					[ '异常','正常']
				],
				columns2: [
					[ '管理员','业主/租户','游客']
				],
				overlayshow: false,
				transitionshow: true,
				maxdate: new Date().getTime(),
				location: [
					['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼', '7号楼']
				],

				showdate: false,
				myImage: "../../static/home/ad3.jpg",

				id: "600005",
				my_list: [{
						name: "名称",
						text: "",
						select: 0,
						url: "pages/changename/changename"
					},
					{
						name: "ID",
						text: "",
						select: 1,

					},
					{
						name: "身份",
						text: "",
						select: 2,
					},

					{
						name: "性别",
						text: "",
						select: 3,
						url: "pages/changegender/changegender"
					},
					{
						name: "联系方式",
						text: "",
						select: 4,
						url: "pages/changephone/changephone"
					},
					{
						name: "生日",
						text: "",
						select: 5,
					},
					{
						name: "身份证",
						text: "",
						select: 6,
						url: "pages/changecard/changecard"
					},
					{
						name: "楼栋号",
						text: "",
						select: 7
					},
					{
						name: "状态",
						text: "",
						select: 8
					},

				],

			}

		},
		methods: {
			cancel(){
				this.statepickshow=false
				this.typepickshow=false
			},
			typeconfirm(e) {
				console.log('confirm', '确定:', e.indexs[0])
				if(e.indexs[0]===0){
					this.my_list[2].text="管理员"
					this.updateType(0)
				}
				if(e.indexs[0]===1){
					this.my_list[2].text="业主/租户"
					this.updateType(1)
				}
				if(e.indexs[0]===2){
					this.my_list[2].text="游客"
					this.updateType(2)
				}
				
				this.typepickshow=false
				
			},
			stateconfirm(e) {
				console.log('confirm', '确定:', e.indexs[0])
				if(e.indexs[0]===0){
					this.my_list[8].text=0
					this.updateState(0)
				}
				if(e.indexs[0]===1){
					this.my_list[8].text=1
					this.updateState(1)
				}
				
				this.statepickshow=false
				
			},
			updateState(state){
				uni.request({
					url: 'http://47.100.242.36:6001/user/edit',
					data: {
						userId: this.my_list[1].text,
						userState:state
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						console.log("success:", res);
						let result = res.data.code
						if (result === 200) {
							this.showToast("修改成功", 'success')
							setTimeout(() => {
								
								uni.navigateBack()
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
						
						this.showToast("网络错误", 'error')
					}
				})
			},
			updateType(type){
				uni.request({
					url: 'http://47.100.242.36:6001/user/edit',
					data: {
						userId: this.my_list[1].text,
						userType:type
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						console.log("success:", res);
						let result = res.data.code
						if (result === 200) {
							this.showToast("修改成功", 'success')
							setTimeout(() => {
								
								uni.navigateBack()
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
						
						this.showToast("网络错误", 'error')
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
			userImage() {
				console.log("点击了头像")

			},
			button() {

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
				if(e===8){
					this.statepickshow=true
				}
				if(e===2){
					this.typepickshow=true
				}
				
			},


		},

		onLoad: function(option) {
			if (option) {
				let datas = JSON.parse(decodeURIComponent(option.item));
				// this.pop=option
				console.log("option", option.item)

				this.my_list[0].text = datas.userName
				this.my_list[1].text = datas.userId
				this.my_list[3].text = datas.userGender
				this.my_list[4].text = datas.userNumber
				if (datas.userDate) {
					this.my_list[5].text = uni.$u.timeFormat(datas.userDate, 'yyyy-mm-dd')
				}

				this.my_list[6].text = datas.userIdcard
				if (datas.userLocation) {
					this.my_list[7].text = datas.userLocation + "号楼"
				}
				if (datas.userType === 0) {
					this.my_list[2].text = "管理员"
				}
				if (datas.userType === 1) {
					this.my_list[2].text = "业主/租户"
				}
				if (datas.userType === 2) {
					this.my_list[2].text = "游客"
				}

				this.my_list[8].text = datas.userState

				this.myImage=datas.userImage
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
		width: 50upx;
		height: 50upx;
		margin-left: 260px;
	}

	.buttonitem {
		height: 100upx;
		width: 220upx;
		border-radius: 40upx;
		background-color: #b18774;
		justify-items: center;
		align-items: center;
		font-size: 40upx;
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
</style>
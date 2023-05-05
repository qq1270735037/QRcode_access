<template>
	<view>
		<!-- 管理员 -->
		<view v-if="type===0">
			<view>
				<uni-segmented-control :current="select" :values="subsectionlist" style-type="text" active-color="#2a781d"
					@clickItem="sectionChange" style="border-radius: 50upx;" />
			
			</view>
			<view>
				<u-transition :show="transitionshow" mode="fade-left" duration="800">
					<view>
						<uni-card style="border-radius: 30upx;" v-for="(item, index) in fixList" :key="index" :index="index"
							@click="clickcard(index)">
			
							<u-row style="background-color: #ffffff;height: 80upx;">
								<u-col span="9">
									<view>
										<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
									</view>
								</u-col>
							</u-row>
							<u-row style="background-color: #ffffff;height: 30upx;">
			
								<u-col>
									<text
										style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">报修编号:{{item.fixId}}</text>
								</u-col>
							</u-row>
							
						</uni-card>
					</view>
					<view style="margin-top: 80upx;"></view>
			
				</u-transition>
			</view>
		</view>
		<!-- 业主 -->
		<view v-if="type===1">
			<view>
				<u-transition :show="transitionshow" mode="fade-left" duration="800">
					<view>
						<uni-card style="border-radius: 30upx;" v-for="(item, index) in fixList" :key="index" :index="index"
							@click="clickcard(index)">
			
							<u-row style="background-color: #ffffff;height: 80upx;">
								<u-col span="9">
									<view>
										<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
									</view>
								</u-col>
							</u-row>
							<u-row style="background-color: #ffffff;height: 30upx;">
			
								<u-col>
									<text
										style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">报修编号:{{item.fixId}}</text>
								</u-col>
							</u-row>
							
						</uni-card>
					</view>
					<view style="margin-top: 80upx;"></view>
			
				</u-transition>
			</view>
		</view>
		
		<!-- 游客界面 -->
		<view  v-if="type===2">
			<u-empty
			        mode="permission"
					width="500"
					height="500"
					marginTop="50"
					textSize="80"
			        icon="http://cdn.uviewui.com/uview/empty/permission.png"
			>
			</u-empty>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				type:'',
				subsectionlist: ['未处理', '已处理'],
				select: 0,
				//报修列表
				fixList: [],
				//动画
				transitionshow: true,
				allimage:[],
				pop: {
					id: '',
					name: '',
					phone: '',
					fixname: '',
					state: 0,
					fixMessage: '无dailjflsjflsfgjvlfjslivsjdfiljsdlfjs菜的抠脚分段',
				},
			}
		},
		methods: {
			sectionChange(index) {
				this.select = index.currentIndex;
				//显示报修列表
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'fix/searchByState',
					data: {
						fixState: this.select
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						
						console.log("success:", res);
						this.fixList = res.data.datas;

					},
					fail: (res) => {


					}
				})
				
			},
			clickcard(index){
				console.log("index：",index)
				this.pop.name = this.fixList[index].userName
				this.pop.state = this.fixList[index].fixState
				this.pop.fixname = this.fixList[index].fixName
				this.pop.phone = this.fixList[index].userNumber
				this.pop.id = this.fixList[index].fixId
				if (this.fixList[index].fixMessage) {
					this.pop.fixMessage = this.fixList[index].fixMessage
				} else {
					this.pop.fixMessage ='无'
				}
				uni.navigateTo({
					url:'/pages/fixInfo/fixInfo'+'?item='+encodeURIComponent(JSON.stringify(this.pop))
				})
				//详情
				// uni.request({
				// 	url: 'http://47.100.242.36:6001/' + 'fix/searchByState',
				// 	data: {
				// 		fixState: this.select
				// 	},
				// 	method: "POST",
				// 	dataType: "json",
				// 	success: (res) => {
						
				// 		console.log("success:", res);
				// 		this.fixList = res.data.datas;
				
				// 	},
				// 	fail: (res) => {
				
				
				// 	}
				// })
			}
		},
		onShow() {

			let datas = uni.getStorageSync("info")
			this.type = datas.userType
			//显示管理员报修列表
			if(this.type===0){
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'fix/searchByState',
					data: {
						fixState: this.select
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
				
						console.log("success:", res);
						this.fixList = res.data.datas;
				
					},
					fail: (res) => {
				
				
					}
				})
			}
			if(this.type===1){
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'fix/searchById',
					data: {
						userId:datas.userId
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
				
						console.log("success:", res);
						this.fixList = res.data.datas;
				
					},
					fail: (res) => {
				
				
					}
				})
			}
			




		},


	}
</script>

<style>

</style>
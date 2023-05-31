<template>
	<view>
		<view style="margin-top: 20upx;">

			<nx-search :selectList="selectList" class="sn-earch-input-box" button="inside" placeholder="请输入关键字"
				@search="doSearch" @confirm="doSearch" v-model="searchQuery.keyword" />

		</view>
		<view class="charts-box">
			<qiun-data-charts type="column" :chartData="chartData" />
		</view>



		<view>
			<u-transition :show="transitionshow" mode="fade-up" duration="800">
				<view>
					<uni-card style="border-radius: 30upx;" v-for="(item, index) in selfList" :key="index"
						:index="index">



						<u-row style="background-color: #ffffff;height: 100upx;">
							<u-col span="3">
								<!-- 头像 -->
								<view>
									<u-avatar :src="item.userImage" shape="circle" size="50px" mode="aspectFill"
										default-url="../../static/home/ad1.jpg"></u-avatar>
								</view>
							</u-col>
							<u-col span="10">
								<text
									style="font-size: 40upx; font-weight:400;  text-align:left; background-color: #ffffff;color: black;">{{item.backTime}}</text>
							</u-col>
						</u-row>
						<u-row style="background-color: #ffffff;height: 50upx; ">
							<u-col span="3">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
								</view>
							</u-col>
							<u-col span="9">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">编号:{{item.recordId}}</text>
							</u-col>
						</u-row>

					</uni-card>


				</view>
				<view style="margin-top: 80upx;"></view>

			</u-transition>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchQuery: {
					keyword: '',
					selectIndex: 0,
				},
				selectList: [{
						id: 1,
						name: 'ID'
					},
					{
						id: 2,
						name: '姓名'
					},
					{
						id: 3,
						name: '7日'
					},

				],
				chartData: {},
				userName: '',
				subsectionlist: ['未处理', '已处理'],
				select: 0,
				//申请列表
				selfList: [],
				//动画
				transitionshow: true,
				image: "",
			}
		},

		methods: {
			// 执行搜索
			doSearch(searchQuery) {
				console.log('searchQuery', searchQuery);
				if (searchQuery.selectIndex === 2) {
					this.getseven()
				}
				if (searchQuery.keyword) {
					switch (searchQuery.selectIndex) {

						case 0:
							console.log('searchQuery', 0);
							this.searchById(searchQuery.keyword)
							break;
						case 1:
							this.searchByName(searchQuery.keyword)
							break;



						default:

							break;
					}
				}
				else{
					if (searchQuery.selectIndex !== 2){
						this.showToast("请输入内容", 'error')
					}
					
				}

			},
			searchById(message) {
				//通过Id
				if (!isNaN(parseFloat(message)) && isFinite(message)) {
					uni.request({
						url: 'http://47.100.242.36:6001/' + 'record/searchAllById',
						data: {
							recordUserId: message
						},
						method: "POST",
						dataType: "json",
						success: async (res) => {
							console.log("searchByName:", res);
							if (res.data.code === 200) {
								this.selfList = res.data.datas

							}

						},
						fail: (res) => {

							this.showToast("网络出错", 'error')


						}
					})
				} else {
					this.showToast("请输入正确ID", 'error')
				}

			},
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			searchByName(message) {
				//通过名字
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'record/searchAllByName',
					data: {
						userName: message
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {
						console.log("searchByName:", res);
						if (res.data.code === 200) {
							this.selfList = res.data.datas

						}

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})
			},
			getseven() {
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'record/getSeven',
					data: {

					},
					method: "POST",
					dataType: "json",
					success: (res) => {

						console.log("record:", res);
						this.selfList = res.data.datas.seven

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})
			},
			getServerData() {
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'record/getSeven',
					data: {

					},
					method: "POST",
					dataType: "json",
					success: async (res) => {

						console.log("record:", res);
						//模拟从服务器获取数据时的延时
						setTimeout(() => {
							let char = {
								categories: res.data.datas.data,
								series: [{
										name: "近七日通行人数",
										data: res.data.datas.cnt
									},
									// {
									// 	name: "完成量",
									// 	data: [18, 27, 21, 24, 6, 28]
									// }
								]
							};
							this.chartData = JSON.parse(JSON.stringify(char));
						}, 500);


						uni.hideLoading()
					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})

			},

		},
		onReady() {
			this.getServerData();
		},
		onLoad() {


			uni.showLoading({
				title: '加载中'
			})




			//显示申请状态

			uni.request({
				url: 'http://47.100.242.36:6001/' + 'record/searchAll',
				data: {

				},
				method: "POST",
				dataType: "json",
				success: async (res) => {

					console.log("record:", res);
					this.selfList = res.data.datas.All


					uni.hideLoading()
				},
				fail: (res) => {

					this.showToast("网络出错", 'error')


				}
			})




		}

	}
</script>

<style scoped>
	.charts-box {
		width: 100%;
		height: 300px;
		margin-top: 20px;
	}
</style>
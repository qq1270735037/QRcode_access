<template>
	<view>

		<view style="margin: 20px;">
			<nx-search :selectList="selectList" class="sn-earch-input-box" button="inside" placeholder="请输入关键字"
				@search="doSearch" @confirm="doSearch" v-model="searchQuery.keyword" />
		</view>

		<view>
			<u-transition :show="transitionshow" mode="fade-left" duration="800">
				<view>
					<uni-card style="border-radius: 30upx;" v-for="(item, index) in userlist" :key="index"
						:index="index" @click="clickcard(index)">


						<u-row style="background-color: #ffffff;height: 80upx;">
							<!-- 头像 -->
							<u-col span="2.5">
								<view>
									<u-avatar :src="allimage[index]" shape="circle" size="50px" mode="aspectFill"
										default-url="../../static/home/ad1.jpg"></u-avatar>
								</view>
							</u-col>

							<u-col span="3.5">
								<view>
									<text style="font-size: 35upx; font-weight:600">{{item.userName}}</text>
								</view>
							</u-col>
							<u-col span="6">
								<text
									style="font-size: 35upx; font-weight:400;  text-align:right; background-color: #ffffff;">编号:{{item.userId}}</text>
							</u-col>
						</u-row>

					</uni-card>


				</view>
				<view style="margin-top: 80upx;"></view>
				<u-loadmore :status="status" iconSize="40px" :loading-text="loadingText" :loadmore-text="loadmoreText"
					:nomore-text="nomoreText" color="#093ed2" lineColor="#000000" dashed line />

			</u-transition>
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
				load: true,
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				status: 'loadmore',
				allimage: [],
				transitionshow: true,
				//用户列表
				userlist: [],
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
						name: '证件'
					},
				],
			}
		},
		methods: {
			clickcard(index) {
				uni.navigateTo({
					url: '/pages/personInfo/personInfo' + '?item=' + encodeURIComponent(JSON.stringify(this
						.userlist[index]))
				})
			},
			// 执行搜索
			doSearch(searchQuery) {
				console.log('searchQuery', searchQuery);
				if (searchQuery.keyword) {
					switch (searchQuery.selectIndex) {

						case 0:
							console.log('searchQuery', 0);
							this.searchById(searchQuery.keyword)
							break;
						case 1:
							this.searchByName(searchQuery.keyword)
							break;
						case 2:
							this.searchByIdCard(searchQuery.keyword)
							break;

						default:

							break;
					}
				} else {
					this.userlist = []
					this.allimage = []
					this.search10()
				}

			},
			searchById(message) {
				//通过部分Id查找
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'user/searchById',
					data: {
						userId: message
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {
						console.log("searchById:", res);
						if (res.data.code === 200) {
							this.userlist = []
							this.allimage = []
							for (var i = 0; i < res.data.datas.length; i++) {
								this.userlist.splice(this.userlist.length, 0, res.data.datas[i])
								if (this.userlist[i].userImage !== null) {
									this.allimage.splice(this.allimage.length, 0, this.userlist[i].userImage)
								} else {
									this.allimage.splice(this.allimage.length, 0, "../../static/home/ad1.jpg")
								}
								

							}



						} else {
							this.userlist = []
							this.allimage = []
						}
					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})
			},
			searchByName(message) {
				//通过名字
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'user/searchByName',
					data: {
						userName: message
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {
						console.log("searchByName:", res);
						if (res.data.code === 200) {
							this.userlist = []
							this.allimage = []
							for (var i = 0; i < res.data.datas.length; i++) {
								this.userlist.splice(this.userlist.length, 0, res.data.datas[i])
								// console.log("imagePic", this.userlist[i + initlength].userImage)
								if (this.userlist[i].userImage !== null) {
									this.allimage.splice(this.allimage.length, 0, this.userlist[i].userImage)
								} else {
									this.allimage.splice(this.allimage.length, 0, "../../static/home/ad1.jpg")
								}
							}



						}

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})
			},
			searchByIdCard(message) {

				//通过名字
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'user/searchByIdCard',
					data: {
						userIdcard: message
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {
						console.log("searchByName:", res);
						if (res.data.code === 200) {
							this.userlist = []
							this.allimage = []
							for (var i = 0; i < res.data.datas.length; i++) {
								this.userlist.splice(this.userlist.length, 0, res.data.datas[i])
								// console.log("imagePic", this.userlist[i + initlength].userImage)

								this.allimage.splice(this.allimage.length, 0, this.userlist[i].userImage)
							}



						}

					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})

			},
			search10() {
				//查找全部
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'user/searchByPage',
					data: {
						page: this.userlist.length,
						limit: 10
					},
					method: "POST",
					dataType: "json",
					success: async (res) => {
						console.log("queryAll:", res);
						if (res.data.code === 100) {
							this.load = false
						}
						if (res.data.code === 200) {
							this.load = true
							let initlength = this.userlist.length
							for (var i = 0; i < res.data.datas.length; i++) {
								this.userlist.splice(this.userlist.length, 0, res.data.datas[i])
								// console.log("imagePic", this.userlist[i + initlength].userImage)
								this.allimage.splice(this.allimage.length, 0, this.userlist[i + initlength]
									.userImage)

							}



						}
						// console.log("userlist:", this.userlist);
					},
					fail: (res) => {

						this.showToast("网络出错", 'error')


					}
				})
			},

		},
		onLoad() {
			this.search10()
		},
		onReachBottom() {
			this.status = 'loadmore';
			setTimeout(() => {
				this.status = 'loading';
				if (this.load === true && "" === this.searchQuery.keyword) {

					this.search10()
					return;

				} else {
					this.status = 'nomore';

					return;
				}
			}, 2000)
		}

	}
</script>

<style lang="scss">
	.sn-earch-input-box {
		width: 100%;
	}
</style>
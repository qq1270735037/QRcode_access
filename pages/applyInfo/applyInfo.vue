<template>
	<view>
		<scroll-view style="height: 700px;" scroll-y="true" class="scroll-Y">
			<!-- 名字Name -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 30upx;border-radius: 50upx;">
				<u-col span="2">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">姓名:</text>
					</view>
				</u-col>
				<u-col span="5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.userName}}</text>
					</view>
				</u-col>
			</u-row>

			<!-- ID -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="1">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">ID:</text>
					</view>
				</u-col>
				<u-col span="8">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.applyUser}}</text>
					</view>
				</u-col>
			</u-row>
			<!-- 身份证 -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="2">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">证件:</text>
					</view>
				</u-col>
				<u-col span="5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.userIdcard}}</text>
					</view>
				</u-col>
			</u-row>
			<!-- 申请时间 -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="3.5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">申请时间:</text>
					</view>
				</u-col>
				<u-col span="8">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.applyTime}}</text>
					</view>
				</u-col>
			</u-row>
			<!-- 状态State -->
			<u-row style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="2">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">状态:</text>
					</view>
				</u-col>
				<u-col span="5">
					<view>
						<text v-if="pop.applyState===1" style="font-size: 40upx;margin-left: 20upx;color: #d44300; ">待审核</text>
					</view>
					<view>
						<text v-if="pop.applyState===2" style="font-size: 40upx;margin-left: 20upx; ">已审核</text>
					</view>
				</u-col>
			</u-row>


			<!-- 审批 -->
			<u-row v-if="pop.permitState!==null"
				style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="3.5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">审批状态:</text>
					</view>
				</u-col>
				<u-col span="8">
					<view>
						<text v-if="pop.permitState===0"
							style="font-size: 40upx;margin-left: 20upx; color: #d44300;">已拒绝</text>
					</view>
					<view>
						<text v-if="pop.permitState===1" style="font-size: 40upx;margin-left: 20upx;  ">已通过</text>
					</view>
				</u-col>
			</u-row>

			<!-- 审批时间 -->
			<u-row v-if="pop.permitState!==null"
				style="background-color: #ffffff;height: 100upx;margin-top: 10upx;border-radius: 50upx;">
				<u-col span="3.5">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">审批时间:</text>
					</view>
				</u-col>
				<u-col span="8">
					<view>
						<text style="font-size: 40upx;margin-left: 20upx; ">{{pop.permitTime}}</text>
					</view>

				</u-col>
			</u-row>



		</scroll-view>
		<!-- 按钮 -->
		<view v-if="pop.applyState===1&&type===0" style="flex: auto; ">
			<u-row style="background-color: aqua;">
				<u-col span="4.5">

				</u-col>
				<u-col>
					<view style="position: absolute; bottom: 50upx;">
						<button class="buttonitem" @click="clickdeal()">去处理</button>
					</view>
				</u-col>

			</u-row>
		</view>
		<view v-if="pop.applyState===2" style="flex: auto; ">
			<u-row style="background-color: aqua;">
				<u-col span="5">

				</u-col>
				<u-col v-if="pop.permitState===1">
					<view style="position: absolute; bottom: 50upx;">
						<image src="../../static/fix/success.png" mode="aspectFill"
							style="width: 120upx; height: 120upx;"></image>
					</view>
				</u-col>
				<u-col v-if="pop.permitState===0">
					<view style="position: absolute; bottom: 50upx;">
						<image src="../../static/fix/false.png" mode="aspectFill"
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
				type:'',
				pop: {
					id: '',
					name: '',
					phone: '',
					fixname: '',
					state: 0,
					fixMessage: '',
					idcard:'',
				},
			}
		},
		methods: {
			clickdeal() {
				uni.reLaunch({
					url: '/pages/travel/travel'
				})


			},


		},
		onLoad: function(option) {
			let datas = uni.getStorageSync("info")
			
			this.type = datas.userType
			if (option) {
				this.pop = JSON.parse(decodeURIComponent(option.item));
				// this.pop=option
				console.log("option", option.item)

			}

		},


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
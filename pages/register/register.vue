<template>
	<view class="container">

		<view class="wrapper">
			<view>

				<uni-notice-bar show-icon scrollable :text="text1" show-close />

			</view>
			<view class="welcome">
				<image mode="widthFix" src="../../static/login/door.png" class="logo"></image>
				<view class="txt">
					<text class="b">码上禁</text>
				</view>
			</view>
			<view class="input-content">
				<!-- 账号 -->
				<view class="input-item">
					<image src="../../static/register/account.png"
						style="padding-left:15rpx;width: 40rpx;height: 40rpx;"></image>
					<input placeholder-style="color: #a7a7a7" type="number" v-model="form.userId"
						placeholder="请输入账号(数字)" maxlength="8" @input="inputChange" style="color: #4a4545;" />
				</view>
				<!-- 密码 -->
				<view class="input-item">
					<image src="../../static/register/pwd.png" style="padding-left:15rpx;width: 40rpx;height: 40rpx;">
					</image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.password" placeholder="请输入密码"
						placeholder-class="input-empty" maxlength="20" :password="showPassword" @input="inputChange"
						style="color: #4a4545;" />
					<image :src="passwordbtn" style="padding-left:15rpx;width: 40rpx;height: 40rpx;margin-right: 40rpx;"
						@click="changePassword"></image>
				</view>

				<!-- 确认密码-->
				<view class="input-item">
					<image src="../../static/register/pwd.png" style="padding-left:15rpx;width: 40rpx;height: 40rpx;">
					</image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.confirmPassword"
						placeholder="请再次确认密码" placeholder-class="input-empty" maxlength="20" :password="showPassword2"
						@input="inputChange" style="color: #4a4545;" />
					<image :src="passwordbtn2"
						style="padding-left:15rpx;margin-right: 40rpx;  width: 40rpx;height: 40rpx;"
						@click="changePassword2"></image>
				</view>
				<!-- 昵称 -->
				<view class="input-item">
					<image src="../../static/register/account.png"
						style="padding-left:15rpx;width: 40rpx;height: 40rpx;"></image>
					<input placeholder-style="color: #a7a7a7" v-model="form.username" placeholder="请输入昵称" maxlength="8"
						@input="inputChange" style="color: #4a4545;" />
				</view>
				<!-- 身份证 -->
				<view class="input-item">
					<image src="../../static/register/IDcard.png"
						style="padding-left:15rpx;width: 40rpx;height: 40rpx;"></image>
					<input placeholder-style="color: #a7a7a7" type="number" v-model="form.id" placeholder="请输入身份证号"
						maxlength="18" @input="inputChange" style="color: #4a4545;" />
				</view>
				<view>
					<u-cell-group>
						<u-cell class="select_item" title="请选择身份" :value="identify_type" :isLink="true"
							arrow-direction="right" border:false @click="identify_change"></u-cell>
					</u-cell-group>
				</view>
				<view>

					<u-picker :show="pick_show" :columns="columns" visibleItemCount=3 itemHeight=120 @cancel="cancel"
						@confirm="confirm" @change='changeHandler'></u-picker>
				</view>

				<view>
					<u-toast ref="uToast" />
				</view>

			</view>

			<!-- 注册按钮 -->
			<button class="confirm-btn" @click="toRegist" :disabled=logining>注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				columns: [
					['管理员', '业主/租户', '游客']
				],
				identify_type: "",
				form: {
					userId: '',
					username: '',
					password: '',
					confirmPassword: '',
					mobile: '',
					usertype: '',
					id:''
				},
				logining: true,
				showPassword: true,
				showPassword2: true,
				text1: '请正确填写用户资料，否则无法通过',
				passwordbtn: '../../static/register/close.png',
				passwordbtn2: '../../static/register/close.png',

				pick_show: false,

			}
		},
		onLoad() {

		},
		onShow() {

			console.log(this.form.username, "666");


		},
		methods: {
			inputChange() {
				if (this.form.userId && this.form.username && this.form.password && this.form.confirmPassword && this.form
					.id && this
					.identify_type) {
					this.logining = false
				} else {
					this.logining = true
				}


			},
			navBack() {
				uni.navigateBack();
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},

			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,

					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			changePassword() {
			
				this.showPassword = !this.showPassword;
				//显示密码
				if (this.showPassword === true) {
					this.passwordbtn = '../../static/register/close.png'
			
				}
				//隐藏密码
				if (false === this.showPassword) {
					this.passwordbtn = '../../static/register/open.png'
				}
			},
			
			changePassword2() {
			
				this.showPassword2 = !this.showPassword2;
				//显示密码
				if (this.showPassword2 === true) {
					this.passwordbtn2 = '../../static/register/close.png'
				}
				//隐藏密码
				if (false === this.showPassword2) {
					this.passwordbtn2 = '../../static/register/open.png'
				}
			},
			
			//模拟请求身份类型
			changeHandler(e) {
				
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', '确定:', e.indexs[0])
				this.form.usertype=e.indexs[0]
				this.identify_type = e.value[0]
				this.pick_show = false
				if (this.form.username && this.form.password && this.form.confirmPassword && this.form.id && this
					.identify_type) {
					this.logining = false
				} else {
					this.logining = true
				}
			},
			cancel(e) {
				console.log('cancel', '取消')
				this.identify_type = ''
				this.pick_show = false
				if (this.form.username && this.form.password && this.form.confirmPassword && this.form.id && this
					.identify_type) {
					this.logining = false
				} else {
					this.logining = true
				}
			},
			identify_change() {
				console.log('change')
				this.pick_show = true
			},
			toRegist() {
				if (this.form.password !== this.form.confirmPassword) {
					console.log("error")
					this.showToast("两次密码不一致请重试", 'error')
					this.form.confirmPassword = ""
					this.form.password = "";

				}
				else if(this.form.id.length !==18){
					this.showToast("请输入正确身份证", 'error')
				}
				else {
					uni.request({
						url: 'http://47.100.242.36:6001/' + 'register',
						data: {
							userId: this.form.userId,
							userPassword: this.form.password,
							userType: this.form.usertype,
							userName:this.form.username,
							userNumber:this.form.id,
						},
						method: "POST",
						dataType: "json",
						success:(res)=>{
							let result = res.data.code
							console.log("success:", result);
							if(result===200){
								this.showToast("注册成功", 'success')
								setTimeout(()=> {
									uni.navigateTo({
										url:"/pages/login/login"
									})
								}, 2000);
								
							}
							if(result===101){
								this.showToast("账号已存在", 'error')
							}
							
						},
						fail: (res)=>{
							this.showToast("网络错误", 'error')
							
						}
					})
				}
			},
			

		},

	}
</script>

<style lang='scss'>
	.container {
		padding-top: 20rpx;
		position: relative;
		overflow: hidden;
		/* background: url(../../static/images/public/bg.png); */
		background-color: #ffffff;
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 40rpx;
	}



	.welcome {

		text-align: center;
		position: relative;
		padding-left: 40rpx;
		padding-bottom: 20rpx;
		padding-top: 20rpx;

		.logo {
			width: 100rpx;
		}

		.txt {
			display: flex;
			flex-direction: column;
			text-align: center;
			color: #000000;
			padding-left: 20rpx;
			padding-bottom: 40rpx;
			font-size: 26rpx;

			.b {
				font-size: 40rpx;
				font-weight: bold;
			}
		}
	}

	.input-content {
		padding: 0 60rpx;
	}

	.select_item {
		justify-content: center;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.6);
		border: 1rpx solid #eee;
		border-radius: 40rpx;
		justify-content: center;
		margin-bottom: 50rpx;
		-moz-box-shadow: 0 0 10rpx #06c;
		-webkit-box-shadow: 0 0 10rpx #b9b9b9;
		box-shadow: 0 0 10rpx #cdcdcd;


	}

	.input-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 10rpx;
		height: 80rpx;
		line-height: 80rpx;
		margin-bottom: 50rpx;
		border-bottom: 1rpx solid rgba(255, 255, 255, 0.6);
		border: 1rpx solid #eee;
		border-radius: 40rpx;
		-moz-box-shadow: 0 0 10rpx #06c;
		-webkit-box-shadow: 0 0 10rpx #b9b9b9;
		box-shadow: 0 0 10rpx #cdcdcd;

		&:last-child {
			margin-bottom: 0;
		}


		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: 28upx;
			color: 28upx;
		}

		input {
			height: 60upx;
			font-size: 28upx;
			color: #ffffff;
			width: 100%;
			padding-left: 20upx;
		}
	}


	.confirm-btn {
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
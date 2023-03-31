<template>
	<view class="container">

		<view class="wrapper">
			<view>
				<u-notice-bar :text="text1" mode="closable" speed="50" url="/pages/componentsB/tag/tag"></u-notice-bar>
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
					<input placeholder-style="color: #a7a7a7" v-model="form.username" placeholder="请输入账号" maxlength="11"
						@input="inputChange" style="color: #4a4545;" />
				</view>
				<!-- 密码 -->
				<view class="input-item">
					<image src="../../static/register/pwd.png" style="padding-left:15rpx;width: 40rpx;height: 40rpx;">
					</image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.password" placeholder="请输入密码"
						placeholder-class="input-empty" maxlength="20" :password="showPassword" @input="inputChange"
						style="color: #4a4545;" />
					<image :src="passwordbtn" style="padding-left:15rpx;width: 40rpx;height: 40rpx;"
						@click="changePassword"></image>
				</view>
				<!-- 确认密码-->
				<view class="input-item">
					<image src="../../static/register/pwd.png" style="padding-left:15rpx;width: 40rpx;height: 40rpx;">
					</image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.confirmPassword"
						placeholder="请再次确认密码" placeholder-class="input-empty" maxlength="20" :password="showPassword2"
						@input="inputChange" style="color: #4a4545;" />
					<image :src="passwordbtn2" style="padding-left:15rpx;width: 40rpx;height: 40rpx;"
						@click="changePassword2"></image>
				</view>
				<!-- 身份证 -->
				<view class="input-item">
					<image src="../../static/register/IDcard.png"
						style="padding-left:15rpx;width: 40rpx;height: 40rpx;"></image>
					<input placeholder-style="color: #a7a7a7" type="number" v-model="form.id" placeholder="请输入身份证号"
						maxlength="18" @input="inputChange" style="color: #4a4545;" />
				</view>
				<!-- <u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm"></u-select>
 -->
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
				show: true,
				list: [{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									}
								]
							},
							{
								value: 5,
								label: '广西',
								children: [{
										value: 6,
										label: '南宁'
									},
									{
										value: 7,
										label: '桂林'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [{
							value: 9,
							label: '纽约',
							children: [{
								value: 10,
								label: '皇后街区'
							}]
						}]
					}
				],

				form: {
					username: '',
					password: '',
					confirmPassword: '',
					id: '',
					mobile: '',
				},
				logining: true,
				showPassword: true,
				showPassword2: true,
				text1: '请正确填写用户资料，否则无法通过',
				passwordbtn: '../../static/register/close.png',
				passwordbtn2: '../../static/register/close.png',

				pick_show: false,
				columns: [
					['中国', '美国', '1', '454'],
					['深圳', '厦门', '上海', '拉萨']
				],
				columnData: [
					['深圳', '厦门', '上海', '666'],
					['得州', '华盛顿', '纽约', '阿拉斯加'],
					['111'],
					['1'],
				]

			}
		},
		onLoad() {

		},
		onShow() {

			console.log(this.form.username, "666");


		},
		methods: {
			inputChange() {
				if (this.form.username && this.form.password && this.form.confirmPassword && this.form.id) {
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

			toRegist() {
				if (this.form.password !== this.form.confirmPassword) {
					console.log("error")
				}
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

			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				this.pick_show = false
			},
			cancel(e) {
				console.log('cancel', e)
				this.pick_show = false
			},

		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
		width: 100%;
		height: 100%;
	}

	.container {
		padding-top: 20px;
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
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 30upx;
		color: #000000;
	}

	.left-top-sign {
		font-size: 120upx;
		color: #EEEEEE;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {

		text-align: center;
		position: relative;
		padding-left: 40upx;
		padding-bottom: 20upx;
		padding-top: 20upx;

		.logo {
			width: 100upx;
		}

		.txt {
			display: flex;
			flex-direction: column;
			text-align: center;
			color: #000000;
			padding-left: 20upx;
			padding-bottom: 40upx;
			font-size: 26upx;

			.b {
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid rgba(255, 255, 255, 0.6);
		border: 1px solid #eee;
		border-radius: 40upx;
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #b9b9b9;
		box-shadow: 0 0 10px #cdcdcd;

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

	.link {
		display: flex;
		padding: 30upx 60upx;
		color: #ffffff;
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

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: 28upx;
		color: #fff;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: 28upx;
		color: #4E46D2;
		text-align: center;

		text {
			color: #ffffff;
			margin-left: 10upx;
		}
	}

	.chat {
		position: fixed;
		right: 30upx;
		font-size: 28upx;
		color: #000000;
		top: 85upx;
		width: 200upx;
		height: 100upx;
		z-index: 999;
		text-align: right;
	}

	.banben {
		justify-content: center; //水平居中
		font-size: 20upx;
		text-align: center;
		margin-top: 50upx;
	}

	.logintab {}

	.login {
		width: 280upx;
		height: 55upx;
		margin-left: 200upx;
		color: #b3b3b3;
		background-color: #ffffff;
		text-align: center;
		font-size: 25upx;
		border-bottom: 1px solid #EEEEEE;

	}

	.register {
		width: 280upx;
		height: 55upx;
		margin-right: 200upx;
		color: #000000;
		background-color: #ffffff;
		text-align: center;
		font-size: 30upx;
		decoration: underline;
		font-weight: bold;
		border-bottom: 1px solid #ff8945;
	}

	.cu-form-group {
		background-color: #ffffff;
		padding: 1upx 15upx;
		display: flex;
		align-items: center;
		min-height: 52upx;
		justify-content: space-between;
		margin-bottom: 28upx;
	}

	/* .uni-input-placeholder{
		color: #4a4545!important;
	} */
	.uni-input-placeholder {
		color: #bdbdbd;
	}

	.uni-input-input {
		.uni-input-input {
			height: 100%;
			background: #ffffff !important;
			color: #000000 !important;
		}
	}

	.uni-input-wrapper {
		color: #4a4545 !important;
	}
</style>
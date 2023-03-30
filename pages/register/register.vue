<template>
	<view class="container">
		
		<view class="wrapper">
			<view class="welcome">
				<image mode="widthFix" src="../../static/login/door.png" class="logo"></image>
				<view class="txt">
					<text class="b">码上禁</text>
				</view>
			</view>

			<view class="input-content">
				<view class="input-item">
					<image src="../../static/register/account.png" class="icon"></image>
					<input placeholder-style="color: #a7a7a7"  v-model="form.username" placeholder="请输入账号" maxlength="11" @input="inputChange"  style="color: #4a4545;"/>
				</view>
				
				<view class="input-item">
					<image src="../../static/register/pwd.png" class="icon"></image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.password" placeholder="请输入密码" placeholder-class="input-empty"
					 maxlength="20" password data-key="password" @input="inputChange"  style="color: #4a4545;" />
				</view>
				<view class="input-item">
					<image src="../../static/register/pwd.png" class="icon"></image>
					<input placeholder-style="color: #a7a7a7" type="mobile" v-model="form.confirmPassword" placeholder="请再次确认密码" placeholder-class="input-empty"
					 maxlength="20" password data-key="password" @input="inputChange2"  style="color: #4a4545;" />
				</view>
				
			</view>

			<button class="confirm-btn" @click="toRegist" :disabled="logining">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seconds: 60,
						tips: '',
				form: {
					username: '',
					password: '',
					confirmPassword: '',
					invitCode: '',
					// deviceid:plus.device.uuid,
					authCode: '1234:abc',
					capital_passwd:'',
				},
				mobile: '',
				password: '',
				logining: false,
				authCode: {
					captchaCode: undefined,
					token: undefined
				},
			}
		},
		onLoad() {

		},

		methods: {
			navBack() {
				uni.navigateBack();
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			toRegist() {
				
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
		width: 100%;
		height: 100%;
	}
	.container{
		padding-top: 20px;
		position:relative;
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

	.welcome{
		
		text-align: center;
		position:relative;
		padding-left: 40upx;
		padding-bottom: 20upx;
		.logo{
			width: 100upx;
		}
		.txt{
			display: flex;
			flex-direction: column;
			text-align: center;
			color: #000000;
			padding-left: 20upx;
			padding-bottom: 40upx;
			font-size: 26upx;
			.b{
				font-size: 40upx;
				font-weight: bold;
			}
		}
	}

	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 10upx;
		height: 80upx;
		line-height: 80upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid rgba(255,255,255,0.6);
		border: 1px solid #eee;
		border-radius: 40upx;
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #b9b9b9;
		box-shadow: 0 0 10px #cdcdcd;
		&:last-child{
			margin-bottom: 0;
		}
		.icon{
			margin-left: 15rpx;
			width: 50rpx;
			height: 50rpx;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: 28upx;
			color: 28upx;
		}
		input{
			height: 60upx;
			font-size: 28upx;
			color: #ffffff;
			width: 100%;
			padding-left: 20upx;
		}	
	}
	.link{
		display: flex;
		padding: 30upx 60upx;
		color: #ffffff;
	}
	.confirm-btn{
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
		&:after{
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: 28upx;
		color: #fff;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: 28upx;
		color: #4E46D2;
		text-align: center;
		text{
			color: #ffffff;
			margin-left: 10upx;
		}
	}
	.chat{
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
	.banben{
		justify-content: center;//水平居中
		font-size: 20upx;
		text-align: center;
		margin-top: 50upx; 
	}
	.logintab{
	
	}
	.login{
		width: 280upx;
		height: 55upx;
		margin-left: 200upx;
		color: #b3b3b3;
		background-color: #ffffff;
		text-align: center;
		font-size: 25upx;
		border-bottom: 1px solid #EEEEEE;
		
	}
	.register{
		width: 280upx;
		height: 55upx;
		margin-right: 200upx;
		color: #000000;
		background-color: #ffffff;
		text-align: center;
		font-size: 30upx;
		decoration : underline;
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
	.uni-input-placeholder{
		color: #bdbdbd;
	}
	.uni-input-input{
		.uni-input-input {
		    height: 100%;
		    background: #ffffff!important;
		    color: #000000!important;
		}
	}
	.uni-input-wrapper{
		color: #4a4545!important;
	}
</style>

<!-- 
现在还差
和服务器的链接地址
登录自动获取本地已保存密码
登录功能
 -->
<template>
	<view class="content">
		<!-- 图标 -->
		<view class="login">
			<image class="logo" src="../../static/login/door.png" mode="widthFix"></image>
		</view>
		<form name="from1">
			<!-- 账号 -->
			<view class="inputView">
				<image class="keyImage" src="../../static/login/account.png"></image>

				<input class="inputText" type="number" placeholder="请输入账号" value="user" v-model="userId"
					@input="onInput" placeholder-style='color:rgb(126, 126, 126);font-size:34rpx;' />
			</view>

			<!-- 密码 -->
			<view class="inputView">
				<image class="keyImage" src="../../static/login/pwd.png"></image>

				<input class="inputText" maxlength="16" password="true" type="text" placeholder="请输入密码" value="password"
					v-model="userPassword" @input="onInput"
					placeholder-style='color:rgb(126, 126, 126);font-size:34rpx;' />
			</view>

		</form>
		<!-- 选择身份框 -->
		<view class="uni-title">请选择身份</view>
		<view class="checkid">
			<u-radio-group v-model="radiovalue1" placement="row"  shape="circle">
				<u-radio class="radioclass" size=40upx labelSize=25upx v-for="(item, index) in radiolist1" :key="index"
					:label="item.name" :name="item.name" @change="groupChange(index)">
				</u-radio>
			</u-radio-group>
		</view>

		<!-- 忘记密码和记住密码 -->
		<view style="display: flex;flex-direction: row;margin-left: 14%">
			<view class=" mui-input-row mui-checkbox ">
				<checkbox-group @change="checkboxChange">
					<checkbox id="chkRem" type="checkbox" :checked="rememberPassword"
						@tap="rememberPassword = !rememberPassword" class="RememberCheck">
						记住密码
					</checkbox>
				</checkbox-group>
			</view>
			<text class="register" @click="register_account">注册</text>
			<text class="forget" @click="forget_password">忘记密码？</text>
		</view>
		<!-- 登录按钮 -->
		<view class="loginBtnView">
			<button class="loginBtn" @tap="lands" :disabled=disable_btn>登录</button>
		

		<view>
			<u-toast ref="uToast" />
		</view>
			
		</view>


		<!-- 登陆成功 -->



	</view>

</template>

<script>
	export default {
		data() {
			return {
				userType:'2',
				userId: '',
				userPassword: '',
				pwd2: '',
				message: '',
				rememberPassword: false,
				show_modal: false,
				disable_btn: true,
				clear: 0,
				// 基本案列数据
				radiolist1: [
					{
						name: '管理员',
						disabled: false
					},
					{
						name: '业主/租户',
						disabled: false
					},
					{

						name: '游客',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '游客'
			}
		},
		onLoad() {
			uni.setStorageSync('linkAddress', 'http://127.0.0.1:9999/');
		},
		onShow() {
			this.userId = uni.getStorageSync('global_ID');
			//如果本地有密码,直接移到输入框
			if (uni.getStorageSync('global_password')) {
				this.userPassword = uni.getStorageSync('global_password');
			}
			//取消登录按钮一开始的禁用
			if (this.userId && this.userPassword) {
				this.disable_btn = false
			}
			//记住"记住密码"的状态
			if (this.userPassword) {
				this.rememberPassword = true
			}
		},
		methods: {
			groupChange(n) {
				console.log('groupChange',n);
				this.userType=n
			},

			onInput(e) {
				if(this.rememberPassword === true){
					uni.setStorageSync('global_ID', this.userId);
					uni.setStorageSync('global_password', this.userPassword);
				}
				if (this.userId && this.userPassword) {
					this.disable_btn = false
					
				} else {
					this.disable_btn = true
				}

			},
			register_account() {
				uni.showLoading({
					title: '加载中'
				})
				setTimeout(function() {
					uni.hideLoading();
					//在起始页面跳转到test.vue页面并传递参数
					uni.navigateTo({
						url: '../register/register'
					});
				}, 500);
			},
			forget_password() {
				uni.showModal({
					title: '提示',
					content: '请携带有效身份证件,前往管理员处修改密码',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			showToast(Msg, Type) {
				this.$refs.uToast.show({
					message: Msg,
					type: Type,
			
					iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
				})
			},
			lands() {
				uni.setStorageSync('linkAddress', 'http://47.100.242.36:6001/');
				this.disable_btn = true
				uni.request({
					url: 'http://47.100.242.36:6001/' + 'login',
					data: {
						userId: this.userId,
						userPassword: this.userPassword,
						userType:this.userType
					},
					method: "POST",
					dataType: "json",
					success: (res) => {
						let result = res.data.code
						console.log("success:", res);
						if (result === 200) {
							this.showToast("登录成功", 'success')
							uni.setStorageSync('info',res.data.datas )
							let datas=uni.getStorageSync("info")
							console.log(datas)
							setTimeout(()=> {
								uni.hideLoading();
								//在起始页面跳转到test.vue页面并传递参数
								uni.switchTab({
									url: '../home/home'
								});

							}, 2000);
						}
						if (result === 100) {
							this.showToast("账号或密码错误", 'error')
							setTimeout(() => {
								this.userPassword = ""


							}, 2000);
						}
						if (result === 108) {
							this.showToast("账号异常", 'error')
							
						}


					},
					fail: (res) => {
						console.log(res);
						uni.hideLoading();
						this.showToast("网络错误", 'error')
					}
				})





			},
			checkboxChange: function(e) {

				console.log('记住密码的状态：', e.detail.value.length);
				if (e.detail.value.length == 1) {
					//设置缓存的账号
					uni.setStorageSync('global_ID', this.userId);
					uni.setStorageSync('global_password', this.userPassword);
				} else {
					uni.removeStorageSync('global_password');
				}
			}
		},
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;

	}

	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 300rpx;
		width: 300rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}



	.inputView {

		margin: 40rpx;
		border-radius: 25rpx;
		/*	border: 6rpx solid #9EC2EC;*/

		background-color: #efefef;
		line-height: 95rpx;
		border-width: 4px;
		border-bottom: 2dp;
		align-items: center
	}


	.keyImage {
		margin-left: 15rpx;
		margin-button: 0rpx;
		margin-top: 30rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.inputText {
		width: 80%;
		border-radius: true;
		background-color: #efefef;
		flex: block;
		float: right;
		text-align: left;
		margin-right: 22rpx;
		margin-top: 30rpx;
		color: #0c0c0c;
		font-size: 38rpx;
		height: 100%;
	}





	/* 记住密码 */
	.mui-checkbox input[type='checkbox']:checked:before {
		color: #00bbb1;
	}



	.RememberCheck {
		margin-left: -50%;
		margin-top: 10rpx;
		color: #adadad;
	}

	.forget {
		color: #5b50ec;
		margin-top: 10rpx;
		margin-left: 10%;
	}

	/*按钮*/
	.loginBtnView {
		width: 100%;
		height: auto;
		/* background-color:#FFFFFF; */
		margin-top: 50rpx;
		margin-bottom: 0rpx;
		padding-bottom: 0rpx;
	}

	.loginBtn {
		width: 90%;
		margin-top: 50px;
		background-color: #566cec;
		color: aliceblue;
	}

	.checkid {
		width: 90%;
		height: 20rpx;
		margin-top: 3%;
		margin-bottom: 8%;
		margin-left: 0%;
		border-radius: 25rpx;
	}

	.radioclass {
		margin-left: 13%;
	}

	.register {
		color: #5b50ec;
		margin-top: 10rpx;
		margin-left: 28%;
	}
</style>
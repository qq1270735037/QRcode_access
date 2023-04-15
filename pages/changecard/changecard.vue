<template>
	<view>
		<u--input v-model="phone" type="number" maxlength=18 class="inputview" placeholder="请输入证件号" border="bottom" clearable
			fontSize="40upx"></u--input>
		<view>
			<button class="submit-btn" @click="submit">确认</button>
		</view>
	</view>

</template>

<script>
	export default {
		onLoad: function(option) {
			//this.nickname = option.nickname
			if (option.my_list) {
				const item = JSON.parse(decodeURIComponent(option.my_list));
				this.phone = item.text
			}
			


		},
		data() {
			return {
				phone: "",
				
			};
		},
		methods: {
			submit() {
				if (this.nickname) {


				}
			},

		},

	}
</script>

<style lang="scss">
	.inputview {
		background-color: #ffffff;
		font-weight: 400;
		padding-left: 30upx;
		margin-top: 8upx;
		border-radius: 20upx;
	}

	.submit-btn {
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
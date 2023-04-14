<template>
	<view>
		<u--input v-model="nickname" class="inputview" placeholder="请输入名字" border="bottom" clearable
			fontSize="40upx"></u--input>
		<view>
			<button class="submit-btn" @click="submit">确认</button>
		</view>
	</view>

</template>

<script>
	export default {
		onLoad: function(option) {
			this.nickname = option.nickname
			const eventChannel = this.getOpenerEventChannel();
			// eventChannel.emit('acceptDataFromOpenedPage', {data: {nickname:this.nickname}});

			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				console.log(data)
			})
			console.log("数据", option);

		},
		data() {
			return {
				nickname: "",

			};
		},
		methods: {
			submit() {
				if (this.nickname) {
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('submitname', {
						nickname: this.nickname,
						code: this.nickname
					});

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
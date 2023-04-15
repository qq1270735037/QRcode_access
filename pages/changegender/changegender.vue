<template>
	<view>
		<view>
			<u-row :class="item.class" v-for="(item, index) in genderlist" :index="index" :key="index"
				@click="select_cell(item.select)">
				<u-col span="11">
					<view style="margin-left: 20upx;">
						<text style="font-size: 35upx; font-weight:400">{{item.name}}</text>
					</view>
				</u-col>
		
			</u-row>
		</view>
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
				if(item.text==="男"){
					this.genderlist[0].class="listcolor"
					this.genderlist[1].class="list"
				}
				else{
					this.genderlist[0].class="list"
					this.genderlist[1].class="listcolor"
				}
			}
			


		},
		data() {
			return {
				nickname: "",
				genderlist: [{
						name: "男",
						select: 0,
						class:"list"
					},
					{
						name: "女",
						select: 1,
						class:"list"
					},
					
				
				],
			};
		},
		methods: {
			submit() {
				
			},
			select_cell(e){
				
					console.log("点击了", e)
					if(e===0){
						this.genderlist[0].class="listcolor"
						this.genderlist[1].class="list"
					}
					else{
						this.genderlist[0].class="list"
						this.genderlist[1].class="listcolor"
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
	.left {
		padding-left: 50upx;
		background-color: aqua;
		height: 200upx;
	}
	
	.imagetext {
		font-size: 35upx;
		height: 155upx;
		font-weight: 400;
		display: flex;
		align-items: center;
		flex-direction: row;
	
	}
	
	.list {
		height: 110upx;
		background-color: #ffffff;
		margin-top: 5upx
	}
	.listcolor {
		height: 110upx;
		background-color: #55aaff;
		margin-top: 5upx
	}
	.image {
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
</style>
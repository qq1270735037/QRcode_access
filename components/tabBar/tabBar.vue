<template>



	<u-tabbar :value="current?current:0" @change="change1" :fixed="true" :border="false" :placeholder="true"
		:safeAreaInsetBottom="true">
		<image src="../../static/home/nav_btn.png" class="btnfixMin"></image>
		<u-tabbar-item :class="item.margin" v-for="(item,index) in list" :key="index" :text="item.text" @click="click1">
			<image :class="item.class" slot="active-icon" :src="item.src"></image>
			<image :class="item.class" slot="inactive-icon" :src="item.src2"></image>
		</u-tabbar-item>

	</u-tabbar>





</template>

<script>
	export default {
		name: 'tabBar',
		props: {
			current: Number
		},
		data() {
			return {

				list: [{
						margin: "",
						class: "image_item",
						src: "../../static/register/open.png",
						src2: "https://cdn.uviewui.com/uview/common/bell.png",
						text: '首页1',
						customIcon: false,
						pagePath: "pages/home/home"
					},
					{
						margin: "",
						class: "image_item",
						src: "../../static/register/open.png",
						src2: "https://cdn.uviewui.com/uview/common/bell.png",
						text: '首页2',
						customIcon: false,
						pagePath: "pages/index/index"
					},
					{
						margin: "txt-item",
						class: "image_item_big",
						src: "../../static/register/open.png",
						src2: "https://cdn.uviewui.com/uview/common/bell.png",
						text: '首页3',
						customIcon: false,
						pagePath: "pages/index1/index"
					},
					{
						margin: "",
						class: "image_item",
						src: "../../static/register/open.png",
						src2: "https://cdn.uviewui.com/uview/common/bell.png",
						text: '首页4',
						customIcon: false,
						pagePath: "pages/index2/index"
					},
					{
						margin: "",
						class: "image_item",
						src: "../../static/register/open.png",
						src2: "https://cdn.uviewui.com/uview/common/bell.png",
						text: '首页5',
						customIcon: false,
						pagePath: "pages/index3/index"
					}
				],
			}
		},
		onLoad() {

		},
		created() {

			uni.hideTabBar()
		},
		onShow() {

		},
		methods: {
			click1(e) {
				console.log('click1', e);
			},
			change1(name) {

				console.log("name:", name)
				uni.switchTab({
					url: '/' + this.list[name].pagePath,
				})


			},
		},
	}
</script>

<style lang="scss">
	.btnfixMin {
		width: 750upx;
		height: 178upx;
		position: absolute;
		z-index: -100;
		bottom: 0;
	}

	.content {
		text-align: center;
		height: 400upx;

	}

	.image_item {
		height: 40upx;
		width: 40upx;
	}

	.image_item_big {
		height: 90upx;
		width: 90upx;

	}

	.txt-item {
		margin-bottom: 50upx;
	}
</style>
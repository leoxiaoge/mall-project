<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
  /*每个页面公共css */
	@import './common/uni.css';
	
	page {
		background-color: #F4F4F4;
		font-size: 28rpx;
		line-height: 1.8;
		color: #333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		--red: #e54d42;
		--orange: #f37b1d;
		--yellow: #fbbd08;
		--olive: #8dc63f;
		--green: #39b54a;
		--cyan: #37bfc8;
		--blue: #0081ff;
		--purple: #6739b6;
		--mauve: #9c26b0;
		--pink: #e03997;
		--brown: #a5673f;
		--grey: #8799a3;
		--gray: #aaa;
		--black: #333;
		--white: #fff;
		--gradualRed: linear-gradient(45deg, #f43f3b, #ec008c);
		--gradualOrange: linear-gradient(45deg, #fe7f00, #fe083e);
		--gradualGreen: linear-gradient(45deg, #39b54a, #8dc63f);
		--gradualPurple: linear-gradient(45deg, #9000ff, #5e00ff);
		--gradualPink: linear-gradient(45deg, #ec008c, #6739b6);
		--gradualBlue: linear-gradient(45deg, #0081ff, #37bfc8);
		--gradualCyan: linear-gradient(45deg, #37bfc8, #0da7b3);
	}

	.container {
		box-sizing: border-box;
		background-color: #fff;
		font-family: PingFangSC-Light, helvetica, 'Heiti SC';
		position: relative;
	}

	view, image, text, navigator {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	view, text {
		font-family: PingFangSC-Light, helvetica, 'Heiti SC';
		font-size: 29rpx;
		color: #333;
	}

	text {
		color: #7a7a7a
	}

	.bg-gradual-red {
		background-image: var(--gradualRed);
		color: #fff;
	}

	.bg-orange {
		background-color: var(--orange);
		color: #fff;
	}

	.bg-gradual-orange {
		background-image: var(--gradualOrange);
		color: #fff;
	}

	.teng-flex {
		display: flex;
		align-items: center;
	}

	.teng-flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.teng-flex-end {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.teng-original {
		color: #fe7f00;
	}

	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}

	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}

	.i-flex {
		display: flex;
		align-items: center;
	}

	.i-flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.i-flex-end {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.i-original {
		color: #fe7f00;
	}
	
	button {
		border: none;
		border-radius: 0;
	}

	button::after{ 
		border: none; 
	} 

	.btn {
		border: none;
    border-radius: 0;
	}

	uni-button:after {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  }

	image {
		width: 100%;
		height: 100%;
	}
</style>

module.exports = {
    plugins: {
        "autoprefixer": {},
        'postcss-px-to-viewport': {
            viewportWidth: 375, //配置视口宽度，对应设计稿宽度，750对应标准设计稿（对应Retina屏幕），
            viewportHeight: 667, //配置视口高度，这里也可以不配置，按照我们给的宽高来转成vw，来适配不同的屏幕，最后这个数值还是和设计稿来比的
            unitPrecision: 3, //转成vw的时候，小数点可以保留几位，这里是保留5位小数
            viewportUnit: "vw", //可以按vw、vh来计算，一般是用vw
            // selectorBlackList: ['tab-bar'],
            // 指定不转换为视窗单位的类，可以自定义，把不需要转换的类可以放进来，比如这里的tab-bar不需要转换写上去就好了。
            //这里我们还可以添加一个ignore的类，给不需要转换的地方添加上ignore的类，就可以实现功能了
            minPixelValue: 1,  //最小转换单位，≤1px的就不转换了
            mediaQuery: false, //是否媒体查询，这里用vw一般就是false，如果要用媒体查询，记得设置为true
            exclude: [/Bar/] //所有含有Bar字符串的组件都不会修改了
        }
    }
}
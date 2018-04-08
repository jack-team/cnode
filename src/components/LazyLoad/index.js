const splashScreen = document.getElementById(`splash-screen`);
const splashScreenStyle = splashScreen.style;

const showSplash = () => {
    splashScreenStyle.visibility = `visible`;
    return () => splashScreenStyle.visibility = `hidden`;
};

const LazyLoad = Component => (() => {
    const closeSplash = showSplash();
    return Component().finally(() => {
        setTimeout(() => closeSplash(), 500)
    })
});

export default LazyLoad;



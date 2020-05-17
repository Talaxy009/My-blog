const friendship = [];
const push = (name, url, image = "", description = "") =>
  friendship.push({ name, url, image, description });

push("WAI科技社", "https://waitech.cn/", "WAI.jpg");
push("路由器", "http://mountain.qicp.vip/", "router.png");

module.exports = friendship;

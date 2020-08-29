---
title: 动手编译适合自己路由器的ipk
date: "2020-03-22T18:11:00.000Z"
description: "编译MiniEAP来使用GZHU校园网，同时与Mentohust做对比"
img: "img.png"
---

## 编译（以交叉编译为例）

### 若第一次编译还需以下步骤

- 安装相关依赖库

```bash
sudo apt-get update
sudo apt-get install git-core build-essential libssl-dev libncurses5-dev unzip gawk
sudo apt-get install subversion mercurial
```

- 安装 C 编译环境

```bash
sudo apt-get install ccache
```

- 下载您设备对应的 SDK
  [OpenWRT SDK](https://downloads.openwrt.org/) / [PandoraBox SDK](http://downloads.pangubox.com:6380/pandorabox/)

- 解压 SDK

```bash
tar xjf (SDK包名)
```

### 开始编译

- 定位到 SDK 目录(即解压出来的文件夹)

```bash
cd /sdk目录
```

- 克隆 git

```bash
git clone https://github.com/ysc3839/openwrt-minieap.git -b gzhu package/minieap
```

此处使用的源并非是 MiniEAP 的官方源，而是[ysc3839 大佬的项目](https://github.com/ysc3839/openwrt-minieap)，区别在于大佬加入了 GZHU 的特定字段，具体可以看[这里](https://github.com/ysc3839/openwrt-minieap/blob/gzhu/patches/006-minieap-gzhu.patch)

- 选择要编译的包

```bash
make menuconfig # 依次选择 "Network" "minieap" "save" "OK" 然后一直"Exit"回到控制台
```

- 开始编译

```bash
make package/minieap/compile V=s
```

ipk 文件就在 `bin/packages/(处理器架构)/base/` 中

### 编译 luci-proto-minieap

为了能直观的使用 MiniEAP 我们还需要编译对应的 luci

方法些许不同

- 定位到 SDK 目录

```bash
cd /sdk目录
```

- 安装 luci feed

```bash
./scripts/feeds update luci
./scripts/feeds install -a
```

- 克隆 git

```bash
git clone https://github.com/ysc3839/luci-proto-minieap.git package/luci-proto-minieap
```

- 选择要编译的包

```bash
make menuconfig # 依次选择 "LuCI" "Protocols" "luci-proto-minieap" "save" "OK" 然后一直"Exit"回到控制台
```

- 开始编译

```bash
make package/luci-proto-minieap/compile V=s
```

同样在 `/bin/` 中的某个文件夹里就能找到啦

## MiniEAP 与 Mentohust 的对比

- 首先直观看上去第一眼，MiniEAP 的安装包要比 Mentohust 小很多

- MiniEAP 的设置在路由器的 `接口` 设置中，这意味着它可以随路由器自启而无需其他设置

具体使用情况还有待返校才能发现（QAQ 我想返校昂）

## 使用 MiniEAP （8月29日更新）

在 `网络-接口-wan` 中，将协议更换为 minieap 客户端 后输入账号和密码，本以为可以顺利认证的，结果认证倒是成功了，但系统日志里却提示 “ipv4地址获取错误”，具体如下：

```log
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): MiniEAP 0.92.1
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): Hamster Tian, 2016
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519):
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I]
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): RJv3 for MiniEAP 0.92.1
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): V3 校验算法来自 hyrathb@GitHub
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): Hamster Tian, 2016
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519):
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] ========================
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] MiniEAP 0.92.1已启动
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] 正在查找认证服务器
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [W] 第二 DNS 地址获取错误。若认证失败，请用 --fake-dns2 指定第二 DNS 地址
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] 正在回应用户名请求
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [W] 第二 DNS 地址获取错误。若认证失败，请用 --fake-dns2 指定第二 DNS 地址
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] 正在回应密码请求
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [W] 第二 DNS 地址获取错误。若认证失败，请用 --fake-dns2 指定第二 DNS 地址
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] 首次认证成功，正在执行 DHCP 脚本以准备第二次认证
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [E] IPv4 地址获取错误
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [W] DHCP 可能尚未完成，将继续等待……
Sat Aug 29 18:28:26 2020 daemon.notice netifd: wan (7519): [I] 认证成功
Sat Aug 29 18:28:26 2020 daemon.notice netifd: Interface 'wan' is now up
Sat Aug 29 18:28:31 2020 daemon.notice netifd: wan (7519): [E] IPv4 地址获取错误
Sat Aug 29 18:28:31 2020 daemon.notice netifd: wan (7519): [W] DHCP 可能尚未完成，将继续等待……
Sat Aug 29 18:28:36 2020 daemon.notice netifd: wan (7519): [E] IPv4 地址获取错误
Sat Aug 29 18:28:36 2020 daemon.notice netifd: wan (7519): [W] DHCP 可能尚未完成，将继续等待……
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): [E] IPv4 地址获取错误
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): [I] 计费通知：
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): [I] 您当前使用的服务为internet;
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): 账户余额为0.00元;
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): 计费策略为30元包月;
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): 您当前使用的接入控制为default;
Sat Aug 29 18:28:41 2020 daemon.notice netifd: wan (7519): [E] 无法获取 IPv4 地址等信息，将不会进行第二次认证而直接开始心跳
```

虽然显示的是认证成功，但却无法访问互联网，依旧在寻求解决办法中，有待更新······

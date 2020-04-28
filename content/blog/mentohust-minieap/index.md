---
title: 动手编译适合自己路由器的ipk
date: "2020-03-22T18:11:00.000Z"
description: "编译MiniEAP来使用GZHU校园网，同时与Mentohust做对比"
---

## 编译（以交叉编译为例）

### 若第一次编译还需以下步骤

* 安装相关依赖库

```sh
sudo apt-get update
sudo apt-get install git-core build-essential libssl-dev libncurses5-dev unzip gawk
sudo apt-get install subversion mercurial
```

* 安装C编译环境

```sh
sudo apt-get install ccache
```

* 下载您设备对应的SDK
[OpenWRT SDK](https://downloads.openwrt.org/) / [PandoraBox SDK](http://downloads.pangubox.com:6380/pandorabox/)

* 解压SDK

```sh
tar xjf (SDK包名)
```

### 开始编译

* 定位到SDK目录(即解压出来的文件夹)

```sh
cd /sdk目录
```

* 克隆git

```sh
git clone https://github.com/ysc3839/openwrt-minieap.git -b gzhu package/minieap
```

此处使用的源并非是MiniEAP的官方源，而是[ysc3839大佬的项目](https://github.com/ysc3839/openwrt-minieap)，区别在于大佬加入了GZHU的特定字段，具体可以看[这里](https://github.com/ysc3839/openwrt-minieap/blob/gzhu/patches/006-minieap-gzhu.patch)

* 选择要编译的包

```sh
make menuconfig # 依次选择 "Network" "minieap" "save" "OK" 然后一直"Exit"回到控制台
```

* 开始编译

```sh
make package/minieap/compile V=s
```

ipk文件就在 `bin/(SDK对应的处理器)/packages/base/` 中

### 编译luci-proto-minieap

为了能直观的使用MiniEAP我们还需要编译对应的luci

方法些许不同

* 定位到SDK目录

```sh
cd /sdk目录
```

* 安装luci feed

```sh
./scripts/feeds update luci
./scripts/feeds install -a
```

* 克隆git

```sh
git clone https://github.com/ysc3839/luci-proto-minieap.git package/luci-proto-minieap
```

* 选择要编译的包

```sh
make menuconfig # 依次选择 "LuCI" "Protocols" "luci-proto-minieap" "save" "OK" 然后一直"Exit"回到控制台
```

* 开始编译

```sh
make package/luci-proto-minieap/compile V=s
```

同样在 `/bin/` 中的某个文件夹里就能找到啦

## MiniEAP与Mentohust的对比

* 首先直观看上去第一眼，MiniEAP的安装包要比Mentohust小很多

* MiniEAP的设置在路由器的 `接口` 设置中，这意味着它可以随路由器自启而无需其他设置

具体使用情况还有待返校才能发现（QAQ我想返校昂）

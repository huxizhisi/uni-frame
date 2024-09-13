<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:24
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-11 15:11:06
 * @FilePath: \uni-frame\src\components\DownloadFile\index.vue
 * @Description: 下载文件组件
-->

<template>
  <view></view>
</template>

<script>
export default {
  name: "download",
  props: {
    fileUrl: {
      type: String,
      default: "",
    },
    fileType: {
      type: String,
      default: "", //1.预览图片，2.预览文件，3.预览视频
    },
    share: {
      type: Boolean,
      default: false,
    },
    fileName: {
      type: String,
      default: "", //
    },
    progressText: {
      type: String,
      default: "下载中", // 进度条展示中文名
    },
    successText: {
      type: String,
      default: "下载成功,文件已保存到相册", // 下载成功展示中文名
    },
  },
  data() {
    return {};
  },
  methods: {
    toDownload(item) {
      // #ifdef MP-WEIXIN
      if (item.type == 1) {
        this.saveToPhotosAlbum(item.src);
      } else if (item.type == 2) {
        this.saveFile(item.src);
      } else {
        this.getDownVideo(item.src);
      }
      // #endif
      // #ifdef APP-PLUS
      this.saveFileToApp(item.src);
      // #endif
    },
    //微信小程序保存文档,不支持h5 (pdf)
    saveFile(url) {
      /** 自定义文件路径 */
      let name = this.fileName.slice(0, this.fileName.lastIndexOf("."));
      let path = wx.env.USER_DATA_PATH + "/" + name;
      const _that = this;
      uni.showLoading();
      uni.downloadFile({
        //下载文件资源到本地,返回文件的本地临时路径
        url: url, //网络图片路径
        success: async (res) => {
          //保存到本地
          console.log(path, res, "data-----------------<");
          await wx.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath,
            filePath: path,
            success: function (res1) {
              console.log(res1.savedFilePath, _that.share, "savepath");
              //res.savedFilePath文件的保存路径
              if (_that.share) {
                /** 有分享走分享逻辑 */
                uni.hideLoading();
                _that.shareFile(res1.savedFilePath);
              } else {
                /** 没有分享就打开文件 */
                uni.openDocument({
                  filePath: res1.savedFilePath,
                  fileType: "pdf",
                  showMenu: true,
                  success: function (data) {
                    uni.hideLoading();
                    let fileMgr = wx.getFileSystemManager();
                    fileMgr.unlink({
                      filePath: res.filePath,
                      success: () => {
                        console.log("删除缓存成功!");
                      },
                    });
                  },
                  fail: function (err) {
                    uni.hideLoading();
                  },
                });
              }
            },
            fail(err) {
              console.log(err);
              uni.hideLoading();
              console.log("保存失败");
            },
          });
        },
        fail: async (res) => {
          console.log(path, res, "data-----------------<");
          uni.hideLoading();
          uni.showToast({
            title: res.errMsg || "下载失败",
            icon: "none",
          });
        },
      });
    },
    //微信小程序保存视频
    getDownVideo(url) {
      // 自定义 文件名称
      uni.showLoading({
        mask: true,
        title: "下载中...",
      });
      let fileName = new Date().valueOf();
      const task = uni.downloadFile({
        url: url,
        filePath: wx.env.USER_DATA_PATH + "/" + fileName + ".mp4", //  拼接本地文件路径
        success: (res) => {
          let filePath = res.filePath;
          uni.saveVideoToPhotosAlbum({
            filePath,
            success: (res) => {
              uni.showToast({
                title: "下载成功",
                icon: "success",
              });
              let fileMgr = wx.getFileSystemManager();
              // 删除本地文件
              fileMgr.unlink({
                filePath: wx.env.USER_DATA_PATH + "/" + fileName + ".mp4",
                success: function (r) {
                  console.log("unlink-getFileSystemManager");
                  console.log(r);
                },
              });
            },
            fail(err) {
              uni.showToast({
                title: "保存失败",
                icon: "none",
              });
            },
            complete(res) {
              console.log("saveVideoToPhotosAlbum-complete");
              console.log(res);
              uni.hideLoading();
            },
          });
        },
        fail(err) {
          uni.showToast({
            title: "下载失败,请稍后再试",
            icon: "none",
          });
        },
        complete(res) {
          console.log("downloadFiledownloadFiledownloadFiledownloadFiledownloadFile");
          console.log(res);
        },
      });
      task.onProgressUpdate(this.onProgress);
    },
    // 提示下载进度
    onProgress(res) {
      uni.showLoading({
        mask: true,
        title: res.progress ? this.progressText + res.progress + "%" : this.progressText,
      });
    },
    //微信小程序保存图片（此处也可用于app保存图片或视频）
    saveToPhotosAlbum(url) {
      const _that = this;
      /** 自定义文件路径 */
      let path = wx.env.USER_DATA_PATH + "/" + this.fileName;
      // #ifdef APP-PLUS
      let showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象
      // #endif
      let task = uni.downloadFile({
        url: url,
        filePath: path,
        success: (res) => {
          const { statusCode, filePath } = res;
          console.log("data1----------------->", res, path);
          if (statusCode == 200) {
            // saveImageToPhotosAlbum  saveVideoToPhotosAlbum
            uni.saveImageToPhotosAlbum({
              //此处也可用saveVideoToPhotosAlbum
              filePath: path,
              success: (data) => {
                console.log("data----------------->", uni, data);
                // if (_that.share) {
                /** 有分享走分享逻辑 */
                uni.hideLoading();
                // #ifdef MP-WEIXIN
                //   wx.showShareImageMenu({
                //        path: res.tempFilePath
                //      })
                // #endif
                // } else {
                uni.showToast({
                  title: this.successText,
                  icon: "success",
                });
                // }
                let fileMgr = wx.getFileSystemManager();
                fileMgr.unlink({
                  filePath: res.filePath,
                  success: () => {
                    console.log("删除缓存成功!");
                  },
                });
              },
              fail: (err) => {
                console.log(err);
                if (
                  err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
                  err.errMsg === "saveImageToPhotosAlbum:fail:auth denied"
                ) {
                  console.log("当初用户拒绝，再次发起授权");
                  wx.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    showCancel: false,
                    success: () => {
                      wx.openSetting({
                        success(settingdata) {
                          console.log("settingdata", settingdata);
                          if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                            wx.showModal({
                              title: "提示",
                              content: "获取权限成功,再次点击图片即可保存",
                              showCancel: false,
                            });
                          } else {
                            wx.showModal({
                              title: "提示",
                              content: "获取权限失败，将无法保存到相册哦~",
                              showCancel: false,
                            });
                          }
                        },
                        fail(failData) {
                          console.log("failData", failData);
                        },
                        complete(finishData) {
                          console.log("finishData", finishData);
                        },
                      });
                    },
                  });
                }
              },
              complete: (msg) => {
                // #ifdef APP-PLUS
                plus.nativeUI.closeWaiting();
                // #endif
              },
            });
          } else {
            uni.showToast({
              title: "下载失败",
              icon: "none",
            });
            // #ifdef APP-PLUS
            plus.nativeUI.closeWaiting();
            // #endif
          }
        },
        complete: (res) => {
          console.log(res, "complete");
        },
      });
      task.onProgressUpdate((res) => {
        // console.log('上传进度' + res.progress);
        // console.log('已经上传的数据长度' + res.totalBytesSent);
        // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
        // #ifdef APP-PLUS
        showLoading.setTitle(this.progressText + res.progress + "%  ");
        // #endif
      });
    },
    //移动端下载文件
    saveFileToApp(url) {
      let dtask = plus.downloader.createDownload(url, {}, function (d, status) {
        uni.showToast({
          title: "下载完成",
          mask: false,
          duration: 1000,
        });
        //console.log(dtask);
        // 下载完成
        console.log("status: " + status);
        if (status == 200) {
          console.log("下载成功：" + d.filename);
          console.log(
            "plus.io.convertLocalFileSystemURL(d.filename): " + plus.io.convertLocalFileSystemURL(d.filename)
          );
          plus.runtime.openFile(
            plus.io.convertLocalFileSystemURL(d.filename),
            {},
            function (success) {
              console.log("打开成功");
            },
            function (error) {
              console.log("打开失败");
            }
          );
        } else {
          uni.showToast({
            title: "下载失败-02",
            mask: false,
            duration: 1500,
          });
        }
      });
      try {
        dtask.start(); // 开启下载的任务
        let prg = 0;
        let showLoading = plus.nativeUI.showWaiting("正在下载"); //创建一个showWaiting对象
        dtask.addEventListener("statechanged", function (task, status) {
          // 给下载任务设置一个监听 并根据状态  做操作
          switch (task.state) {
            case 1:
              showLoading.setTitle("正在下载");
              break;
            case 2:
              showLoading.setTitle("已连接到服务器");
              break;
            case 3:
              prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100);
              showLoading.setTitle("  正在下载" + prg + "%  ");
              break;
            case 4:
              plus.nativeUI.closeWaiting();
              //下载完成
              break;
          }
        });
      } catch (err) {
        plus.nativeUI.closeWaiting();
        uni.showToast({
          title: "更新失败-03",
          mask: false,
          duration: 1500,
        });
      }
    },
    /** 分享 */
    shareFile(filePath) {
      console.log(filePath, "filePath");
      uni.showModal({
        title: this.fileName,
        content: "下载到本地成功, 是否需要分享?",
        success: (res2) => {
          if (res2.confirm) {
            uni.shareFileMessage({
              filePath: filePath,
              fileName: this.fileName,
              success: () => {
                uni.hideLoading();
              },
              fail: (err) => {
                uni.hideLoading();
                console.log(err, filePath);
                uni.showToast({
                  title: err.errMsg || "分享文件失败",
                  icon: "none",
                });
              },
            });
          } else if (res2.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
  },
  watch: {
    fileUrl: {
      deep: true,
      handler: function (value) {
        if (this.fileUrl) {
          this.toDownload({
            type: this.fileType,
            src: this.fileUrl,
          });
        }
      },
    },
  },
};
</script>

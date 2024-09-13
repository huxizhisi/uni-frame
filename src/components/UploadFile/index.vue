<!--
 * @Author: 马文龙 214170716@qq.com
 * @Date: 2024-09-11 14:39:25
 * @LastEditors: 马文龙 214170716@qq.com
 * @LastEditTime: 2024-09-13 17:13:00
 * @FilePath: \uni-frame\src\components\UploadFile\index.vue
 * @Description: 文件上传组件
-->

<template>
  <view class="l-upload">
    <view class="upload-box">
      <view
        class="image-item"
        :style="{
          '--margin-right': '16rpx',
        }"
        v-for="(item, index) in fileList"
        :key="index"
      >
        <block v-if="item.url.split('.')[1] == 'mp4'">
          <!-- <image
            class="img posterImg"
            :src="item + '?x-oss-process=video/snapshot,t_' + parseInt(currentTime * 1000) + ',f_jpg,w_800,m_fast'"
            mode="aspectFit"
          ></image> -->
          <video :src="item.url" class="img radius12" @timeupdate="timeupdate"></video>
          <cover-view class="img-del">
            <cover-image
              style="width: 40rpx; height: 40rpx"
              mode="widthFix"
              @tap.stop="delVideo(index)"
              src="@/static/images/common/close.png"
            />
          </cover-view>
        </block>
        <block v-else>
          <image
            :src="item.url"
            class="img radius12"
            :style="{ width: 'calc((100vw - 80rpx - 32rpx) / 3)', height: 'calc((100vw - 80rpx - 32rpx) / 3)' }"
            @tap.stop="previewImage(index)"
            mode="aspectFill"
          ></image>
          <image
            class="img-del"
            style="width: 40rpx; height: 40rpx"
            mode="widthFix"
            @tap.stop="delImage(index)"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBvcGFjaXR5PSIuOCI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE2NjFfMjU1ODcpIj48cGF0aCBvcGFjaXR5PSIuNiIgZD0iTTEwIDIwYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTUuNTIzIDAgMTAgMCAwIDQuNDc3IDAgMTBzNC40NzcgMTAgMTAgMTB6IiBmaWxsPSIjMTgxODE4Ii8+PC9nPjxwYXRoIGQ9Ik0xNCA2bC04IDhtMC04bDggOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMF8xNjYxXzI1NTg3Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+"
          />
        </block>
      </view>
      <view
        v-if="isShowAdd"
        class="upload-add radius12 u-flex u-flex-col u-row-center fz-12 third-font-color"
        @tap="chooseFile"
      >
        <image
          style="width: 64rpx; height: 64rpx"
          mode="widthFix"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMiAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSI1IiB5PSI3LjUiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxOCIgcng9IjQiIHN0cm9rZT0iIzE4MTgxOCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48cGF0aCBkPSJNNiAyMi41bDQuNDU3LTUuOTQzYTEgMSAwIDAgMSAxLjUyLS4wOTRsLjkwMy45MzZhMSAxIDAgMCAwIDEuNTM0LS4xMTJsMi4wMTQtMi44MmExIDEgMCAwIDEgMS41MjYtLjEyMUwyNiAyMi41IiBzdHJva2U9IiMxODE4MTgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSI5LjUiIGN5PSIxMiIgcj0iMSIgZmlsbD0iIzZGNkY2RiIgc3Ryb2tlPSIjMTgxODE4Ii8+PC9zdmc+"
        />
        <view> 添加图片 </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// 定义props和emit函数
/**
 * width | Number | 220 | 图片宽度，单位rpx |
 * height | Number | 220 | 图片高度，单位rpx |
 * uploadType | String | all | 上传类型 图片img 视频video  默认都可以 |
 * 禁用添加 | Boolean | false | 禁用添加按钮，默认达到限制数量后禁用 |
 * limit | Number | 9 | 图片视频限制数 |
 * sizeType | Array<String> | ['original', 'compressed'] | original 原图，compressed 压缩图，默认二者都有 |
 * sourceType | Array<String> | ['album', 'camera'] | album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项 |
 * imageFormat | Array<String> | [] | 可上传图片类型，默认为空，不限制 ['jpg','png','gif']  |
 * images | Array | [] | 初始图片，如果是修改需要回显内容就能用到 |
 * videos | Array | [] | 初始视频 |
 * serverUrl | String | '' | 服务器接口地址。当接口地址为空时，直接返回本地图片地址 |
 * fileKeyName | String | 'file' | 文件对应的key，默认为 file |
 * header | Object | {} | HTTP 请求 Header, header 中不能设置 Referer。 |
 * formData | Object | {} | HTTP 请求中其他额外的 form data |
 * maxSize | Number | 500 | 文件大小限制，单位 Mb |
 */

interface Props {
  width?: number;
  height?: number;
  uploadType?: string;
  disableAdd?: boolean;
  limit?: number;
  sizeType?: string[];
  sourceType?: string[];
  imageFormat?: string[];
  images?: string[];
  videos?: string[];
  serverUrl?: string;
  fileKeyName?: string;
  headers?: any;
  formData?: any;
  maxSize?: number;
}
interface STSUpload {
  accessKeyId?: string;
  accessKeySecret?: string;
  expiration?: string;
  host: string;
  path: string;
  policy?: string;
  securityToken?: string;
  signature?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 220,
  height: 220,
  uploadType: "all",
  disableAdd: false,
  limit: 9,
  sizeType: () => ["original", "compressed"],
  sourceType: () => ["album"],
  imageFormat: () => [],
  images: () => [],
  videos: () => [],
  serverUrl: "",
  fileKeyName: "file",
  header: () => {},
  formData: () => {},
  maxSize: 20,
});

//图片地址
const imageList = ref([...props.images]);
const videoList = ref([...props.videos]);
const fileList = ref([...props.videos, ...props.images]);
const currentTime = ref(0);
const duration = ref(0);
const disableAdd = ref(props.disableAdd);
const sourceType = ref(props.sourceType);
const uploadType = ref(props.uploadType);
const sizeType = ref(props.sizeType);
const maxSize = ref(props.maxSize);
const limit = ref(props.limit);
const imageFormat = ref(props.imageFormat);
const emits = defineEmits(["complete", "remove"]);

const isShowAdd = computed(() => {
  let isShow = true;
  if (disableAdd.value || (limit.value && imageList.value.length + videoList.value.length >= limit.value)) {
    isShow = false;
  }
  return isShow;
});

const timeupdate = (e: any) => {
  console.log(e.detail);
  duration.value = e.detail.duration;
  currentTime.value = e.detail.currentTime;
};

const change = () => {
  console.log(fileList.value);
  fileList.value = [...videoList.value, ...imageList.value];
  emits("complete", {
    imageArr: [...imageList.value],
    videoArr: [...videoList.value],
  });
};

const toast = (text: string) => {
  text &&
    uni.showToast({
      title: text,
      icon: "none",
    });
};

const chooseFile = () => {
  if (uploadType.value == "img") {
    chooseImage();
  } else if (uploadType.value == "video") {
    chooseVideo();
  } else {
    uni.showActionSheet({
      itemList: ["图片", "视频"],
      success: (res) => {
        if (res.tapIndex + 1 == 1) {
          chooseImage();
        } else {
          chooseVideo();
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    });
  }
};

const chooseVideo = () => {
  uni.chooseVideo({
    sizeType: sizeType.value,
    camera: "back", //默认摄像头是后置摄像头
    sourceType: sourceType.value,
    success: (e) => {
      videoList.value.push(e.tempFilePath);
      //服务器地址
      getUploadInfo("image", e.tempFilePath).then((res: any) => {
        console.log(res);
        uploadImage(res, "video", e.tempFilePath)
          .then(() => {
            change();
          })
          .catch(() => {
            change();
          });
      });
    },
  });
};

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: sizeType.value,
    sourceType: sourceType.value,
    success: (e) => {
      console.log(e);
      if (e.tempFiles[0].size / 1024 / 1024 > maxSize.value) {
        toast(`图片大小不能超过${maxSize.value}M!`);
        return;
      }
      let path = "";
      for (let i = 0; i < e.tempFiles.length; i++) {
        let len = imageList.value.length + videoList.value.length;
        if (len >= limit.value) {
          toast(`最多可上传${limit.value}张图片/视频`);
          break;
        }
        //过滤图片类型
        path = e.tempFiles[i].path;
        if (imageFormat.value.length > 0) {
          let format = "";
          // #ifdef H5
          let type = e.tempFiles[i].type;
          format = type.split("/")[1];
          // #endif
          // #ifndef H5
          format = path.split(".")[path.split(".").length - 1] || "";
          // #endif
          if (imageFormat.value.indexOf(format) == -1) {
            let text = `只能上传 ${imageFormat.value.join(",")} 格式图片！`;
            toast(text);
            continue;
          }
        }
        // imageArr.push(path);
        // imageList.value.push(path);
      }
      //服务器地址
      //无服务器地址则直接返回成功
      getUploadInfo("image", path).then((res: STSUpload) => {
        console.log(res);
        uploadImage(res, "image", path)
          .then(() => {
            change();
          })
          .catch(() => {
            change();
          });
      });
    },
  });
};
const uploadImage = (data: STSUpload, type: string, url: string) => {
  return new Promise<void>((resolve, reject) => {
    uni.uploadFile({
      url: data.host,
      name: props.fileKeyName,
      header: props.header,
      filePath: url,
      formData: {
        key: data.path,
        policy: data.policy,
        OSSAccessKeyId: data.accessKeyId,
        signature: data.signature,
        "x-oss-security-token": data.securityToken,
      },
      success: (res: any) => {
        const regex = /^20[0-9]$/;
        if (regex.test(String(res.statusCode))) {
          if (type === "image") {
            //图片 -此处无需修改
            imageList.value.push({ path: data.path, url }); //根据实际情况修改-（this.imageList不能改）
          } else if (type === "video") {
            //视频 -此处无需修改
            videoList.value.push({ path: data.path, url }); //根据实际情况修改-（this.videoList不能改）
          }
          //  eslint-disable-next-line no-console
          resolve();
        } else {
          reject(res?.msg || "上传失败");
        }
      },
      fail: function (res) {
        reject(res);
      },
    });
  });
};
const delVideo = (index: number) => {
  uni.showModal({
    title: "提示",
    content: "确认删除该视频吗？",
    success: (res) => {
      if (res.confirm) {
        videoList.value.splice(index, 1);
        emits("remove", {
          index: index,
          type: "video",
        });
        change();
      }
    },
  });
};
const delImage = (index: number) => {
  uni.showModal({
    title: "提示",
    content: "确认删除该图片吗？",
    success: (res) => {
      if (res.confirm) {
        imageList.value.splice(index, 1);
        emits("remove", {
          index: index,
          type: "image",
        });
        change();
      }
    },
  });
};
const previewImage = (index: number) => {
  if (!imageList.value.length) return;
  uni.previewImage({
    current: imageList.value[index],
    loop: true,
    urls: imageList.value,
  });
};
</script>

<style lang="scss" scoped>
$width: calc((100vw - 80rpx - 32rpx) / 3);
@font-face {
  font-family: "l-icon";
  src: url("data:font/ttf;charset=utf-8;base64,AAEAAAANAIAAAwBQRkZUTZarFdEAAAZYAAAAHEdERUYAKQAKAAAGOAAAAB5PUy8yPHBJCgAAAVgAAABgY21hcAAP6eYAAAHIAAABQmdhc3D//wADAAAGMAAAAAhnbHlmYF6IAwAAAxgAAABgaGVhZCQmMsUAAADcAAAANmhoZWEH3gOFAAABFAAAACRobXR4DAAAAAAAAbgAAAAQbG9jYQAwAAAAAAMMAAAACm1heHABEAAsAAABOAAAACBuYW1lXoIBAgAAA3gAAAKCcG9zdNPVdeEAAAX8AAAAMgABAAAAAQAAcg5zwF8PPPUACwQAAAAAAOCDd2QAAAAA4IN3ZAAA/4AEAAOAAAAACAACAAAAAAAAAAEAAAOA/4AAXAQAAAAAAAQAAAEAAAAAAAAAAAAAAAAAAAAEAAEAAAAEACAAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAABAQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZADA5jvmOwOA/4AAAAPcAIAAAAABAAAAAAAAAAAAAAAgAAEEAAAAAAAAAAQAAAAEAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAA5jv//wAA5jv//xnIAAEAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAIAAP+ABAADgAAPAB8AAAUxIiY1ETQ2MzEyFhURFAYBMTQ2MyEyFhUxFAYjISImAgAXIiIXFyIi/ekhGAOOGCEhGPxyGCGAIRgDjhghIRj8chghAgAXIiIXFyIiAAAAAAAAEgDeAAEAAAAAAAAAEwAoAAEAAAAAAAEACABOAAEAAAAAAAIABwBnAAEAAAAAAAMACACBAAEAAAAAAAQACACcAAEAAAAAAAUACwC9AAEAAAAAAAYACADbAAEAAAAAAAoAKwE8AAEAAAAAAAsAEwGQAAMAAQQJAAAAJgAAAAMAAQQJAAEAEAA8AAMAAQQJAAIADgBXAAMAAQQJAAMAEABvAAMAAQQJAAQAEACKAAMAAQQJAAUAFgClAAMAAQQJAAYAEADJAAMAAQQJAAoAVgDkAAMAAQQJAAsAJgFoAEMAcgBlAGEAdABlAGQAIABiAHkAIABpAGMAbwBuAGYAbwBuAHQAAENyZWF0ZWQgYnkgaWNvbmZvbnQAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFIAZQBnAHUAbABhAHIAAFJlZ3VsYXIAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAVmVyc2lvbiAxLjAAAGkAYwBvAG4AZgBvAG4AdAAAaWNvbmZvbnQAAEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AAEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC4AAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAGh0dHA6Ly9mb250ZWxsby5jb20AAAAAAgAAAAAAAAAKAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAQACAQIHdGlhbmppYQAAAAAAAf//AAIAAQAAAAwAAAAWAAAAAgABAAMAAwABAAQAAAACAAAAAAAAAAEAAAAA1aQnCAAAAADgg3dkAAAAAOCDd2Q=")
    format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.upload-icon {
  font-family: "l-icon" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 10rpx;
}

.icon-tianjia:before {
  content: "\e63b";
}

.l-upload {
  width: 100%;

  .upload-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .image-item {
      position: relative;
      width: $width;
      height: $width;
      margin-right: var(--margin-right);
      margin-bottom: var(--margin-right);
      &:nth-child(3n) {
        margin-right: 0;
      }

      .img {
        display: block;
        width: $width;
        height: $width;
      }

      .img-del {
        position: absolute;
        right: -10rpx;
        top: -10rpx;
        z-index: 200;
      }
    }

    .upload-add {
      width: $width;
      height: $width;
      border: 2px dashed #cacaca;
    }
  }
}
</style>

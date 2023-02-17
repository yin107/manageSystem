<template>
  <div style="margin-left: 10px; text-align: left; margin-top: 20px">
    <el-tag
      v-for="(tag, index) in $store.state.tabsList"
      :key="tag.title"
      :closable="tag.title !== '首页'"
      @close="handleClose(tag, index)"
      style="margin-left: 10px"
      :effect="$route.meta.title == tag.title ? 'dark' : 'plain'"
      @click="chosetag(tag)"
    >
      {{ tag.title}}
    </el-tag>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentindex: 0,
      ischose: [false, false, false, false],
    };
  },
  computed: {
    tags() {
      return this.$store.tabsList;
    },
  },
  methods: {
    chosetag(tag) {
      // 点击tag时候，切换路由
      this.$router.push({ name:tag.name });
    },
    handleClose(tag, index) {
      //删除当前tag，如果是最后一个，那么路由调整到他前面那个标签，并且背景变蓝，如果不是最后一个那么路由调整到他后面那个标签对应的路由
      //如果删掉这个标签与路由有关
      if (tag.path == this.$route.path) {
        //如果删掉的是最后一个那么就让他前移
        if (index == this.$store.state.tabsList.length - 1) {
          this.$router.push({
            name: this.$store.state.tabsList[index - 1].name,
          });
        } else {
          //如果删掉的是中间的tag。那么让路由后移
          this.$router.push({
            name: this.$store.state.tabsList[index + 1].name,
          });
        }
      }
      //如果删掉的这个标签与当前路由无关，那么就直接删除
      this.$store.commit("closetag", tag);
    },
  },
};
</script>

<style></style>

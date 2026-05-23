import { defineUserConfig, defaultTheme } from "vuepress";

export default defineUserConfig({
  lang: "zh-CN",
  title: "软工部分作业",
  base: "/sehomework/",
  theme: defaultTheme({
    navbar: [
      {
        text: "GitHub",
        link: "https://github.com/pku-software/sehomework"
      }
    ],
    sidebar: [
      {
        text: "软件测试",
        children: [
          "/test/intro",
          "/test/blackbox",
          "/test/whitebox",
          "/test/vcpkg",
          "/test/boost",
          "/test/llvm-cov",
          "/test/code"
        ],
      },
    ],
  }),
});

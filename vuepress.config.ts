import { defineUserConfig, defaultTheme } from "vuepress";

type TimedPage = {
  link: string;
  file: string;
  revealAt: string;
};

// Static deployments need to be rebuilt after the reveal time has passed.
const timedPages: TimedPage[] = [
  {
    link: "/test/answers",
    file: "test/answers.md",
    revealAt: "2026-06-02T23:59:00+08:00",
  },
  {
    link: "/refactor/intro",
    file: "refactor/intro.md",
    revealAt: "2026-06-07T13:00:00+08:00",
  },
  {
    link: "/refactor/task",
    file: "refactor/task.md",
    revealAt: "2026-06-07T13:00:00+08:00",
  }
];

const buildTime = Date.now();
const timedPageByLink = new Map(timedPages.map((page) => [page.link, page]));

const getRevealTime = ({ link, revealAt }: TimedPage): number => {
  const revealTime = Date.parse(revealAt);

  if (Number.isNaN(revealTime)) {
    throw new Error(`Invalid page reveal date for ${link}: ${revealAt}`);
  }

  return revealTime;
};

const isTimedPageVisible = (page: TimedPage, now = buildTime): boolean =>
  now >= getRevealTime(page);

const isSidebarEntryVisible = (link: string): boolean => {
  const timedPage = timedPageByLink.get(link);

  return timedPage === undefined || isTimedPageVisible(timedPage);
};

const visibleSidebarChildren = (children: string[]): string[] =>
  children.filter((child) => isSidebarEntryVisible(child));

const hiddenTimedPagePatterns = timedPages
  .filter((page) => !isTimedPageVisible(page))
  .map((page) => `!${page.file}`);

export default defineUserConfig({
  lang: "zh-CN",
  title: "软工部分作业",
  base: "/sehomework/",
  pagePatterns: [
    "**/*.md",
    "!.vuepress",
    "!node_modules",
    ...hiddenTimedPagePatterns,
  ],
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
        children: visibleSidebarChildren([
          "/test/intro",
          "/test/blackbox",
          "/test/whitebox",
          "/test/vcpkg",
          "/test/boost",
          "/test/llvm-cov",
          "/test/code",
          "/test/answers"
        ]),
      },
      {
        text: "软件设计模式",
        children: visibleSidebarChildren([
          "/design/intro",
          "/design/creation",
          "/design/structure",
          "/design/behavior",
          "/design/answers",
        ]),
      },
      {
        text: "软件重构",
        children: visibleSidebarChildren([
          "/refactor/intro",
          "/refactor/task",
          "/refactor/answers"
        ]),
      }
    ],
  }),
});

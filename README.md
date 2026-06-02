# 软工部分作业网站维护说明

这个仓库使用 VuePress 生成静态站点，并通过 GitHub Actions 发布到 GitHub Pages。

## 本地开发

安装依赖：

```bash
pnpm install
```

启动本地预览：

```bash
pnpm run dev
```

构建静态站点：

```bash
pnpm build
```

构建产物位于 `docs/.vuepress/dist`。

## 发布方式

发布流程在 `.github/workflows/pages.yml`。

当前有三种触发方式：

- 推送到 `main` 分支时自动发布。
- 在 GitHub Actions 页面手动运行 `Deploy GitHub Pages`。
- 每天北京时间 `00:05` 自动重新构建并发布一次。

定时任务的 cron 写法使用 UTC：

```yaml
schedule:
  - cron: "5 16 * * *"
```

`16:05 UTC` 对应北京时间次日 `00:05`。这个定时发布用于让按日期开放的页面和侧边栏入口在日期到达后自动出现，不需要再手动提交一次。

## 定时发布页面

定时发布配置在 `vuepress.config.ts` 顶部的 `timedPages`：

```ts
const timedPages: TimedPage[] = [
  {
    link: "/test/answers",
    file: "test/answers.md",
    revealAt: "2026-06-10T00:00:00+08:00",
  },
];
```

含义是：`docs/test/answers.md` 在 `2026-06-10 00:00:00 +08:00` 前不会被 VuePress 生成为页面，`/test/answers` 这个侧边栏入口也会隐藏。日期到达后的下一次构建会生成页面并显示入口。

注意：这个机制可以让公网网站 URL 在发布日期前访问不到，但如果仓库本身是公开的，别人仍然可能直接在 GitHub 仓库里看到 Markdown 源文件。如果页面内容本身不能提前公开，不要把对应 Markdown 文件提前提交到公开仓库。

## 新增一个定时发布的页面

假设要新增 `docs/test/new-answer.md`，并希望它在 `2026-07-01` 后出现在侧边栏：

1. 创建 Markdown 文件：`docs/test/new-answer.md`。
2. 在 `vuepress.config.ts` 对应 sidebar 分组的 `children` 中加入路径：

```ts
children: visibleSidebarChildren([
  "/test/intro",
  "/test/new-answer"
])
```

3. 在 `timedPages` 中加入同一个页面的链接、文件路径和开放时间：

```ts
const timedPages: TimedPage[] = [
  {
    link: "/test/answers",
    file: "test/answers.md",
    revealAt: "2026-06-10T00:00:00+08:00",
  },
  {
    link: "/test/new-answer",
    file: "test/new-answer.md",
    revealAt: "2026-07-01T00:00:00+08:00",
  },
];
```

路径规则：

- `link` 是 sidebar 使用的链接：`docs/test/new-answer.md` 对应 `/test/new-answer`，不要写 `docs` 前缀，也不要写 `.md` 后缀。
- `file` 是相对 `docs` 目录的 Markdown 文件路径：`docs/test/new-answer.md` 对应 `test/new-answer.md`。

## 更改发布日期

直接修改 `timedPages` 里对应页面的 `revealAt`：

```ts
{
  link: "/test/answers",
  file: "test/answers.md",
  revealAt: "2026-06-15T00:00:00+08:00",
}
```

建议始终写完整的 ISO 时间并带上时区，例如 `+08:00`，避免 GitHub Actions 的 UTC 环境造成误解。

修改提交到 `main` 后会立即触发一次发布。即使之后没有新的提交，每天北京时间 `00:05` 的定时任务也会重新构建，保证日期过后入口会出现。

## 取消定时隐藏

如果某个页面以后要一直显示并允许直接访问：

1. 保留 sidebar `children` 里的页面路径。
2. 从 `timedPages` 中删除对应条目。

这样该页面会在下一次构建后正常生成，侧边栏入口也会始终显示。

## 常见检查

改完配置后建议本地运行：

```bash
pnpm build
```

如果构建失败，优先检查：

- `timedPages` 里的 `revealAt` 时间格式是否能被 `Date.parse` 识别。
- `timedPages` 里的 `file` 是否是相对 `docs` 目录的路径。
- sidebar 中的路径是否和实际 Markdown 文件路径对应。
- 新增 Markdown 文件是否放在 `docs` 目录下。

# llvm-cov覆盖率检测工具介绍

本界面还在完善。

## 安装
llvm-cov是llvm工具链的一部分，如果你已经在系统上安装了llvm工具链，那么你应该可以直接使用llvm-cov，可以用以下命令加以验证：
```bash
llvm-cov --version
```
否则，你应该在你的系统上安装llvm工具链。
### Unix
使用你系统的包管理器进行安装即可，以`apt`举例：
```bash
sudo apt update
sudo apt install llvm
```
### macOS
推荐使用`brew`进行安装：
```bash
brew install llvm
```
请在安装完成后，跟随后续指令提示将llvm的可执行文件路径添加到`PATH`中。

### Windows
可以直接从[llvm官网](https://github.com/llvm/llvm-project/releases)下载安装程序，或者使用winget等包管理器进行安装。安装完成后同样应按需设置全局路径。

## 使用

施工中...
（为什么不去问问神奇的大模型呢.jpg）
## 如何阅读gcov文件
gcov文件和源代码的最大的区别就是在左侧多了一列数字或者-或者#####。数字代表了当行代码被执行的次数，-代表当行代码不是可执行代码，#####代表了当行代码没有被执行过。如果你只是想达成语句覆盖，那就要想办法消除所有的#####。



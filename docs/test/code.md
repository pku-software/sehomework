# 作业配套代码包使用说明

请注意，因为llvm-cov只能与g++/clang++编译器配套使用，使用MSVC的Visual Studio并不能顺利运行本代码包的覆盖率插装与检测模块。

你仍可以使用Visual Studio打开并构建本项目的不带覆盖率插装版本，但极不推荐。你应该考虑使用别的IDE（如Visual Studio Code）构建本项目。

## 获取项目
```bash
git clone https://github.com/pku-software/rjsj_test.git
```

## 前置环境
- 你应该已经在你的操作系统上配置好了`vcpkg`包管理器
- 你应该已经通过`vcpkg`包管理器下载了`Boost.Test`库
- 你应该已经在你的系统上下载了`llvm-cov`工具
- 详见项目的README文档


## 普通构建

普通构建不会插装覆盖率信息，适合日常编译和运行测试。

```bash
cmake -S . -B build \
  -DCMAKE_TOOLCHAIN_FILE="$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake"

cmake --build build
ctest --test-dir build --output-on-failure
```

PowerShell 版本：

```powershell
cmake -S . -B build `
  -DCMAKE_TOOLCHAIN_FILE="$env:VCPKG_ROOT\scripts\buildsystems\vcpkg.cmake"

cmake --build build
ctest --test-dir build --output-on-failure
```

## 覆盖率构建

覆盖率构建会为项目目标添加 `--coverage` 编译和链接参数，并提供 `coverage` 构建目标。该目标会先运行测试，再调用 `llvm-cov gcov` 生成覆盖率报告。

```bash
cmake -S . -B build-coverage \
  -DCMAKE_TOOLCHAIN_FILE="$VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake" \
  -DRJSJ_ENABLE_COVERAGE=ON

cmake --build build-coverage --target coverage
```

PowerShell 版本：

```powershell
cmake -S . -B build-coverage `
  -DCMAKE_TOOLCHAIN_FILE="$env:VCPKG_ROOT\scripts\buildsystems\vcpkg.cmake" `
  -DRJSJ_ENABLE_COVERAGE=ON

cmake --build build-coverage --target coverage
```

也可以使用等价目标：

```bash
cmake --build build-coverage --target llvm-cov-report
```

## 覆盖率报告位置

覆盖率报告生成在覆盖率构建目录下：

```text
build-coverage/coverage/
```

汇总文件为：

```text
build-coverage/coverage/llvm-cov-gcov-summary.txt
```

每个源文件或头文件的详细覆盖率会生成对应的 `.gcov` 文件。例如：

```text
build-coverage/coverage/#...#src#exercise_wb.cpp.gcov
build-coverage/coverage/#...#include#exercise.h.gcov
```


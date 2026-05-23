# Boost.Test单元测试库介绍

本文档只是浮光掠影地介绍Boost.Test的简单用法，基本只止步于写出简单的单元测试。如果你想要更全面而系统地学习Boost.Test的用法，可以参考[官方文档](https://boost.ac.cn/doc/libs/latest/libs/test/doc/html/index.html)。（留给那些想参考[英文文档](https://www.boost.org/doc/libs/latest/libs/test/doc/html/index.html)的人）

## 安装
如果你已经安装了`vcpkg`，你可以通过运行：
```bash
vcpkg install boost-test
```
来在`vcpkg`管理的目录中安装`Boost.Test`库。

你也可以使用你喜欢的包管理器，或是使用别的手段安装`Boost.Test`，但这不在本文档的讨论范围内。

## 集成到CMake项目中

如果你使用`vcpkg`来管理你的项目，只需要在你的`CMakeLists.txt`中插入一行：

```cmake
find_package(Boost REQUIRED COMPONENTS unit_test_framework)
```

> 如果你先前没有是使用过`vcpkg`，请注意使用`vcpkg`管理的cmake项目在配置时需要增加一个参数：
> ```bash
> cmake -DCMAKE_TOOLCHAIN_FILE=<path/to/vcpkg>/scripts/buildsystems/vcpkg.cmake
> ```
> 其中`<path/to/vcpkg>`应替换成你本地的`vcpkg`所处目录，你可以通过编写一个脚本存储配置指令来避免重复且繁琐的输入。

## 使用Boost.Test编写单元测试

为了方便举例，我们先创建一个简单的项目，目录如下：
```
proj_example/
│
├── include/
│ └── foo.h
│
├── src/
│ └── foo.cpp
│
└── test/
  └── test.cpp
```
这个项目用`vcpkg`管理，且已经集成了`Boost.Test`库。我们计划在`src/foo.cpp`中编写一些函数供使用，在`test/test.cpp`中为这些函数编写一些单元测试。
> 如果愿意，你也可以把单元测试的代码和函数定义的代码放在同一个源文件中，这是另一种组织单元测试的代码风格。如果你想尝试这种代码风格，请务必保证你编写的测试代码不会集成到release版本的编译产物中。如果你不理解我在说什么，那就不要尝试这种风格。

我们在`src/foo.cpp`中编写了一个简单的函数`add()`：
```cpp
//! src/foo.cpp
int add(int lhs, int rhs) {
    return lhs + rhs;
}
```
并在`include/foo.h`中声明了它：
```cpp
//! include/foo.h
int add(int, int);
```
现在我们想在`test/test.cpp`中编写有关它的单元测试，我们首先需要引入`Boost.Test`库：
```cpp
//! test/test.cpp
#include <boost/test/unit_test.hpp>
```
然后引入我们想要测试的函数声明所在的头文件：
```cpp
//! test/test.cpp
#include "include/foo.h"
```

### 测试声明与组织

我们不愿意把事情讲得太复杂，所以就请像在学C++之处把`using namespace std;`当做起手式一样，不求甚解地把下面这些指令当成魔法咒语记下。感兴趣的同学可以自行查阅官方文档的对应章节。

在编写具体的测试用例之前，我们需要先声明一个主测试套件，或说一个测试模块。于是我们在源文件的开头加上这样一行语句：
```cpp
//! test/test.cpp
#define BOOST_TEST_MODULE test example
```
其中`test example`是主测试套件的名字，你可以按照自己的需要自由地命名。

在声明完主测试套件后，我们就可以编写测试样例了。下面展示了一种合法的测试样例写法：
```cpp
//! test/test.cpp
BOOST_AUTO_TEST_CASE(test_1) {
    BOOST_TEST(add(1, 2) == 3);
}
```
其中，`BOOST_AUTO_TEST_CASE`宏用于声明一个测试样例，后跟一个由小括号包裹的参数列表，参数列表的第一个参数为测试样例的名字，在本例中为`test_1`。声明一个测试样例的格式和声明一个C++函数的格式相当类似。

在声明完成后的大括号内是测试样例的具体内容，类似于C++函数的函数体。`BOOST_TEST`宏用于检查一个布尔表达式是否为真值，如果传入的布尔表达式不为真值，就会导致宏所属的测试样例不通过。在本例中，`BOOST_TEST`用于检测`add(1, 2) == 3`的值是否为真。

在完成项目构建后，你可以使用`ctest`来运行测试并得到测试结果，一种可能的用法是在构建目录下键入：
```bash
ctest --verbose
```
来运行所有测试并得到测试结果。你可以键入`ctest --help`或者通过STFW来获取更多`ctest`的用法。

我们可以编写多个并列的测试样例：
```cpp
//! test/test.cpp
BOOST_AUTO_TEST_CASE(test_1) {
    BOOST_TEST(add(1, 2) == 3);
}

BOOST_AUTO_TEST_CASE(test_2) {
    int lhs = 3;
    int rhs = 4;
    BOOST_TEST(add(lhs, rhs) == add(rhs, lhs));
}

BOOST_AUTO_TEST_CASE(test_3) {
    int x = -3;
    int y = -4;
    int z = -5;
    BOOST_TEST(add(x, add(y, z)) == add(add(x, y), z));
}
```
有时候，我们可能想给测试样例分个类，比如说出于一些我也不知道为什么的考虑我们想把`test_1`和后面两个测试样例区分开来，我们可以通过创建测试套件来实现这一需求：
```cpp
//! test/test.cpp
BOOST_AUTO_TEST_SUITE(computate_test)

BOOST_AUTO_TEST_CASE(test_1) {
    BOOST_TEST(add(1, 2) == 3);
}

BOOST_AUTO_TEST_SUITE_END()

BOOST_AUTO_TEST_SUITE(law_test)

BOOST_AUTO_TEST_CASE(test_2) {
    int lhs = 3;
    int rhs = 4;
    BOOST_TEST(add(lhs, rhs) == add(rhs, lhs));
}

BOOST_AUTO_TEST_CASE(test_3) {
    int x = -3;
    int y = -4;
    int z = -5;
    BOOST_TEST(add(x, add(y, z)) == add(add(x, y), z));
}

BOOST_AUTO_TEST_SUITE_END()
```
`BOOST_AUTO_TEST_SUITE`宏用于声明一个测试套件，声明的范围以`BOOST_AUTO_TEST_SUITE_END`宏做结。虽然它叫测试套件，但你完全可以将其理解为在测试模块内对测试样例进行进一步分组的东西。

你可以使用`ctest`的`-R`参数来运行特定的测试套件或测试样例。

### 数据驱动测试

在编写测试的过程中，一个经常遇到的场景是，对于一套相同的测试逻辑，我们需要为它编写大量的数据样例，反复地执行这套数据逻辑。如果使用上节的知识，想实现这样的事情，可能会写成这样：
```cpp
//! test/test.cpp
BOOST_AUTO_TEST_CASE(test_2) {
    int lhs[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int rhs[10] = {-10, -9, -8, -7, -6, -5, -4, -3, -2, -1};
    for(int i = 0; i < 10; ++i) {
        BOOST_TEST(add(lhs[i], rhs[i]) == add(rhs[i], lhs[i]));
    }
}
```
这样的实现有一个问题，那就是无论是哪组数据暴露出了待测函数的问题，有多少组数据可以暴露出待测函数的问题，我们得到的反馈都是一样的——测试样例未通过。这实际上是相当不利于我们定位错误原因的，我们希望能知道是哪些数据暴露了问题。

为了达到这个目的，我们可以考虑改用数据驱动测试样例：
```cpp
//! test/test.cpp

using boost::unit_test::data;

int data_set_1[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
int data_set_2[10] = {-10, -9, -8, -7, -6, -5, -4, -3, -2, -1};

BOOST_DATA_TEST_CASE(data_test_1, data::make(data_set_1) ^ data::make(data_set_2), lhs, rhs) {
    BOOST_TEST(add(lhs, rhs) == add(rhs, lhs));
}
```
`BOOST_DATA_TEST_CASE`宏用于声明一个数据驱动测试样例，它的第一个参数的测试样例名，第二个参数的数据集，你可以理解为一个数组，第三个及以后的参数依次数据集中的每一元数据在函数体中的变量名。

`data::make`函数用于创建一个数据集，它可以将一个单例、数组、或是任何的前向可迭代容器转换为一个数据集，详见[文档](https://boost.ac.cn/doc/libs/latest/libs/test/doc/html/boost_test/tests_organization/test_cases/test_case_generation/generators.html)。所谓数据集，就是形如`{data1, data2, data3, ..., datan}`的一个数组，数据驱动测试会依次将每一元的数据带入后续声明的变量用于测试。`^`是数据集的`zip`运算符，用于将两个大小相同的数据集进行拼接，如`{a1, a2, ..., an} ^ {b1, b2, ..., bn} = {(a1, b1), (a2, b2), ..., (an, bn)}`。拼接后的数据集每次能为更多的变量的复制，如例子中的两个数据集拼接后，`lhs`参数代表了`data_set_1`中数据的值，`rhs`参数代表了`data_set_2`中数据的值。

数据集还有`join`运算符`+`，`grid`运算符`*`，详见[文档](https://boost.ac.cn/doc/libs/latest/libs/test/doc/html/boost_test/tests_organization/test_cases/test_case_generation/operations.html#boost_test.tests_organization.test_cases.test_case_generation.operations.joins)。



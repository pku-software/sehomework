# 白盒测试作业

本节作业共有三个题目，每个题目会给出一个待测函数的声明及其代码实现。对于每个待测函数，你应该给出：
- 它的程序流程图，节点应为语句或基本块
- 一组测试样例，可以实现对待测函数的语句覆盖
- 一组测试样例，可以实现对待测函数的分支覆盖
- 一组测试样例，可以实现对待测函数的条件组合覆盖
- 这些测试样例组应该尽可能地小（i.e. 每个测试样例组中的测试样例个数应该尽可能地少）

## 题目I
```cpp
/**
 * @brief 第一题，基础的控制流分析。
 */
void exercise_wb_1(int param1, int param2, int param3)
{
    int res = -1;

    if (param1 > 0 && param2 > 0 && param3 > 0)
    {
        if (param1 > param2)
        {
            if (param2 > param3)
            {
                res = 3;
            }
            else if (param1 > param3)
            {
                res = 2;
            }
            else
            {
                res = 1;
            }
        }
        else
        {
            if (param2 > param3)
            {
                if (param1 > param3)
                {
                    res = 2;
                }
                else
                {
                    res = 1;
                }
            }
            else
            {
                res = 0;
            }
        }
    }

    cout << res << endl;
}
```

## 题目II

```cpp
/**
 * @brief 第二题，引入了简单的数据流，更多的条件组合。
 */
void exercise_wb_2(int param1, int param2)
{
    int param3 = param1 + param2;

    if (param3 > 0)
    {
        ++param1;
    }

    if (param3 < 0)
    {
        ++param2;
    }

    if (param1 > param2 || param1 > param3)
    {
        if (param1 <= param2 || param1 <= param3)
        {
            param3 += param1;
        }
    }

    if (param3 != 0)
    {
        param3 += param2;
    }

    cout << param3 << endl;
}
```

## 题目III

```cpp

/**
 * @brief 第三题，引入了循环和更复杂的输入。
 */
void exercise_wb_3(vector<int> params)
{
    bool flag = true;
    int res = 0;
    int pos = 0;
    int sz = params.size();

    while (pos != sz)
    {
        if (flag)
        {
            res += params[pos];
        }
        else
        {
            res -= params[pos];
        }
        if (params[pos] > 0)
        {
            flag = !flag;
        }
        ++pos;
    }

    if (res > 0)
    {
        res = res * res;
    }

    if (res < 0)
    {
        res = -(res * res);
    }

    cout << res << endl;
}
```


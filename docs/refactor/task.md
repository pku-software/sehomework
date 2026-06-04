# 你的任务

## 代码
```cpp
#include <string>
#include <vector>

using namespace std;

class Item
{
public:
    string name;
    int sellIn;
    int quality;
    Item(string name, int sellIn, int quality)
        : name(name), sellIn(sellIn), quality(quality)
    {
    }
};

class GildedRose
{
public:
    vector<Item> &items;
    GildedRose(vector<Item> &items);

    void updateQuality();
};

GildedRose::GildedRose(vector<Item> &items) : items(items) {}

void GildedRose::updateQuality()
{
    for (int i = 0; i < items.size(); i++)
    {
        if (items[i].name != "Aged Brie" &&
            items[i].name != "Backstage passes to a TAFKAL80ETC concert")
        {
            if (items[i].quality > 0)
            {
                if (items[i].name != "Sulfuras, Hand of Ragnaros")
                {
                    items[i].quality = items[i].quality - 1;
                }
            }
        }
        else
        {
            if (items[i].quality < 50)
            {
                items[i].quality = items[i].quality + 1;

                if (items[i].name ==
                    "Backstage passes to a TAFKAL80ETC concert")
                {
                    if (items[i].sellIn < 11)
                    {
                        if (items[i].quality < 50)
                        {
                            items[i].quality = items[i].quality + 1;
                        }
                    }

                    if (items[i].sellIn < 6)
                    {
                        if (items[i].quality < 50)
                        {
                            items[i].quality = items[i].quality + 1;
                        }
                    }
                }
            }
        }

        if (items[i].name != "Sulfuras, Hand of Ragnaros")
        {
            items[i].sellIn = items[i].sellIn - 1;
        }

        if (items[i].sellIn < 0)
        {
            if (items[i].name != "Aged Brie")
            {
                if (items[i].name !=
                    "Backstage passes to a TAFKAL80ETC concert")
                {
                    if (items[i].quality > 0)
                    {
                        if (items[i].name != "Sulfuras, Hand of Ragnaros")
                        {
                            items[i].quality = items[i].quality - 1;
                        }
                    }
                }
                else
                {
                    items[i].quality = items[i].quality - items[i].quality;
                }
            }
            else
            {
                if (items[i].quality < 50)
                {
                    items[i].quality = items[i].quality + 1;
                }
            }
        }
    }
}
```

## 代码描述

先介绍一下我们的系统：

- 现在共有若干普通物品（未列出）和三种特殊物品：
1."Aged Brie"（陈年布利奶酪）
2."Sulfuras, Hand of Ragnaros"（萨弗拉斯，炎魔 Ragnaros 之手）
3."Backstage passes to a TAFKAL80ETC concert"（ TAFKAL80ETC 演唱会后台通行证）
- 每种物品都具备一个销售期限`SellIn`，表示我们要在多少天之前把物品卖出去
- 每种物品都具备品质值`Quality`，表示物品的品质
- 每天结束时，系统会降低每种物品的这两个数值

很简单吧？这还有些更有意思的：

- 一旦销售期限过期，品质`Quality`会以双倍速度加速下降
- 物品的品质`Quality`永远不会为负值（即减到0为止）
- "Aged Brie"（陈年布利奶酪）的品质`Quality`会随着时间推移而提高
- 物品的品质`Quality`永远不会超过50
- 传奇物品"Sulfuras"（萨弗拉斯—炎魔 Ragnaros 之手）永不过期，也不会降低品质`Quality`（恒为80）
- "Backstage passes"（后台通行证）与"Aged Brie"（陈年布利奶酪）类似，其品质`Quality`会随着时间推移而提高；当还剩10天或更少的时候，品质`Quality`每天提高2；当还剩5天或更少的时候，品质`Quality`每天提高3；但一旦过期，品质就会降为0

## 书面练习

> 注意，在重构过程中，你可以增加新的类和函数，也可以随意修改`updateQuality()`中的代码，但是你不能修改任何其他地方代码，包括使用现有接口的代码。你的重构不应该改变接口。

1. 请阅读`updateQuality()`函数中的条件分支，指出哪些逻辑存在重复、嵌套过深或职责不清的问题，并说明你会优先提取哪些函数来提升代码可读性。

2. 在不能修改`Item`类及其属性的前提下，请设计一种重构方案，使普通物品、"Aged Brie"、"Sulfuras"和"Backstage passes"的更新规则分别被清晰表达。请写出主要函数或类的职责，并说明每天更新时的调用流程。

3. 假设现在需要加入"Conjured"（召唤物品），其品质`Quality`下降速度比普通物品快一倍。请比较“继续在`updateQuality()`中添加条件分支”和“引入规则类、策略对象或类似抽象”两种方案在可读性、可测试性和后续扩展性上的差异。

## 上手试一试（选做）

我们非常推荐同学们使用本次的作业代码包来辅助理解代码重构的流程。

你可以从Github上获取本项目的代码包：

```bash
git clone https://github.com/pku-software/rjsj_refactor.git
```

你可以随意对GildedRose.cpp中 **updateQuality()** 函数进行修改和添加新代码，只要系统还能正常工作，但不要修改Item类或其属性。我们没有提供单元测试，只是有一些简单的文字输出，你应当保证重构前后的输出不变。

> 你可以先跑一遍原代码，将输出结果存储在文件中；随后进行重构，再将重构后输出结果存储在文件中。
> 
> 在Windows中，你可以使用`FC 1.txt 2.txt`来比较两个文件的差异；
> 
> 在Linux和MacOS中，你可以使用`diff 1.txt 2.txt`来比较两个文件的差异。

在重构完代码后，你可以试试是否方便加入下面的功能，以检验你的重构是否好用。

我们最近签约了一个召唤物品供应商。这需要对我们的系统进行升级：

- "Conjured"（召唤物品）的品质`Quality`下降速度比正常物品快一倍

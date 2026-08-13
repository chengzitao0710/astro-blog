---
title: hot100_和为k的子数组
date: 2026-08-13
category: 算法
tags:
  - hot100
  - 算法
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1786609587346_【哲风壁纸】动漫角色-围裙.jpg
summary: 和为k的子数组题解
pinned: false
draft: false
---
# 分析

给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回 _该数组中和为 `k` 的子数组的个数_ 。

子数组是数组中元素的连续非空序列，也就是统计子串。

---

# 题解

### 枚举

枚举就是直接暴力，直接用两层循环去统计子串的和，如果`sum == k`，统计结果就加`1`。

**代码**

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int n = nums.size();
        int ans = 0;
        int arr[n];
        for(int i = 0; i < n; i++) arr[i] = nums[i];
        for(int i = 0; i < n; i++) {
            int sum = 0;
            for(int j = i; j >= 0; j--) {
                sum += arr[j];
                if(sum == k) ans++;
            }
        }
        return ans;
    }
};
```

> 时间复杂度：$O(n^2)$，两层循环。
> 空间复杂度：$O(n)$，（还可以优化到$O(1)$，去掉arr）

**为什么要复制一遍到`arr`数组中才能过？**

我是看到力扣题解中有这样的做法，于是便想记录下来。

*现象解释：有`arr`能过，去掉直接访问`nums`就 TLE*

> 逻辑**100% 等价**，输出结果完全一样，不是算法逻辑 bug，是**内存访问微小性能差异 + 力扣边界卡时间**。

**内存区别**

1. `nums`是`vector<int>&`引用：数据存在**堆内存**。`nums[j]`底层是：取 vector 内部指针，再偏移取下标。
2. `int arr[n]`是 GCC 扩展 VLA 变长数组，分配在**栈内存**。
    
    栈 CPU L1 缓存访问速度，略快于堆；双重循环 $O(n^2)$，执行次数极多，**每次内层循环的微小开销会被放大**。

当 n 接近上限（约 1e4），总循环次数 $10^8$，刚好踩力扣时间阈值：

- 栈数组`arr`：每一次`arr[j]`开销小，总耗时压在时限以内，**侥幸通过**
- 直接`nums[j]`：每一次访问多一点点间接开销，总时间直接冲破阈值 → TLE 超时

### 前缀和+哈希表

这种做法才是此题的正解，关于前缀和的思想这里就不多解释。

**核心公式**

$pre[i] - pre[j-1] = k \implies pre[j-1] = pre[i]-k$

- `pre`：遍历到当前位置的前缀和
- 想要找**有多少个 j**，使得前面前缀和等于`pre-k`，把次数加到答案
- `mp`：记录已经遍历的前缀和以及它出现的次数

> 为什么 `mp[0]=1`？

> 当 `pre == k` 的时候，`pre‑k = 0`，代表从数组下标 0 到当前位置这个子数组和就是 k，需要计数。

> 例：`nums=[3],k=3`，pre=3，pre‑k=0，如果没有 mp [0]=1，就统计不到这个答案。

**代码**

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int,int> mp;
        mp[0] = 1; 
        int pre = 0, ans = 0;
        for(auto x : nums){
            pre += x;
            if (mp.find(pre -k) != mp.end()) {
                ans += mp[pre - k];
            }
            mp[pre]++;
        }
        return ans;
    }
};
```

> 时间复杂度：$O(n)$，仅遍历数组一次，哈希表查找插入平均为 $O(1)$。最坏哈希冲突退化为 $O(n^2)$。
> 空间复杂度：$O(n)$，哈希表保存最多`n+1`个前缀和。

[560. 和为 K 的子数组 - 力扣（LeetCode）](https://leetcode.cn/problems/subarray-sum-equals-k/description/)
---
title: hot100_搜索二维矩阵 II
date: 2026-08-24
category: 算法
tags:
  - hot100
  - 算法
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1787541489462_【哲风壁纸】动漫-少女插画_compressed.png
summary: 搜索二维矩阵 II 题解
pinned: false
draft: false
---
# 题目

编写一个高效的算法来搜索 `_m_ x _n_` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。

**示例 1：**

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/searchgrid2.jpg)

**输入：** matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
**输出：** true

**示例 2：**

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/11/25/searchgrid.jpg)

**输入：** matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
**输出：** false

---

# 题解

## 暴力

### 核心思想

如果我们不管二维矩阵`matrix`的特性，我们可以直接遍历判断是否存在等于`target`的数。

### 代码

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(matrix[i][j] == target) return true;
            }
        }
        return false;
    }
};
```

> **时间复杂度：**$O(n \cdot m)$，n 行 m 列，全部遍历。
> **空间复杂度：**$O(1)$

---

##  二分查找

### 核心思想

因为`matrix`的每一行都是升序的，因此我们可以二分查找每一行，判断该行是否出现`target`。

### 代码

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size();
        for(int i = 0; i < n; i++) {
            auto &row = matrix[i];
            int l = 0, r = row.size() - 1;
            while(l < r) {
                int mid = (l + r) / 2;
                if(row[mid] < target) l = mid + 1;
                else r = mid;
            }
            if(row[l] == target) return true;
        }
        return false;
    }
};
```

> **时间复杂度：**$O(n\log m)$，最多需要进行 n 次二分查找。
> **空间复杂度：**$O(1)$

---

## Z 字形查找（右上角 / 左下角起点）

### 核心思想

- 选**右上角**作为起点：`(i=0, j=n‑1)`
    - `matrix[i][j] == target`：找到，返回 true
    - `matrix[i][j] > target`：目标一定不在当前这一列 → **j‑‑（向左）**
    - `matrix[i][j] < target`：目标一定不在当前这一行 → **i++（向下）**
- 越界说明不存在，返回 false

> 为什么不选左上角？左上角向右、向下都变大，无法判断走哪边，不能直接排除行 / 列

### 代码

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.empty() || matrix[0].empty()) return false;
        int n = matrix.size();
        int m = matrix[0].size();
        int i = 0, j = m - 1;
        while(i < n && j >= 0) {
            if(matrix[i][j] == target) return true;
            else if(matrix[i][j] > target) j--;
            else i++;
        }
        return false;
    }
};
```

> **时间复杂度：**$O(m+n)$，每轮消去一行或者一列，最多走 m+n 步
> **空间复杂度：**$O(1)$，原地遍历

---

## 三种算法对比

|算法|时间复杂度|空间复杂度|核心思想|优点|缺点|适用场景|
|---|---|---|---|---|---|---|
|暴力双重循环|O(n⋅m)|O(1)|遍历矩阵全部元素|代码最简单，不会出错|完全没利用有序性质，大数据会超时|矩阵很小、面试仅作为暴力铺垫|
|逐行二分|O(nlogm)|O(1)|每行内部有序，每行做二分|利用行有序，比暴力快|没有利用**列有序**，性能弱于 Z 字形|行数很少，列数很大|
|Z 字形查找|O(n+m)|O(1)|从右上角出发，一次排除一整行 / 一整列|同时利用行、列有序，时间最优|思维需要转换，不能选左上角起点|通用，本题标准最优解|

# [240. 搜索二维矩阵 II - 力扣（LeetCode）](https://leetcode.cn/problems/search-a-2d-matrix-ii/description/)
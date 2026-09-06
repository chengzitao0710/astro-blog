---
title: hot100_K个一组翻转链表
date: 2026-09-06
category: 算法
tags:
  - hot100
  - 算法
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1788673087763_【哲风壁纸】一拳超人-冲击力.jpg
summary: K个一组翻转链表题解
pinned: false
draft: false
---
# 1. 题目

给你链表的头节点 `head` ，每 `k` 个节点一组进行翻转，请你返回修改后的链表。

`k` 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 `k` 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

**示例 1：**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)

**输入：** head = [1,2,3,4,5], k = 2
**输出：**[2,1,4,3,5]

**示例 2：**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg)

**输入：** head = [1,2,3,4,5], k = 3
**输出：**[3,2,1,4,5]

--- 

# 2. 题解

## 2.1.  递归

### 2.1.1. 核心思想

1. 先向后探测 k 个节点，不够直接返回 head
2. 翻转当前 k 个节点
3. 当前组尾部（原 head）连接递归返回的后面链表头
4. 返回翻转后的新头 pre

### 2.1.2. 代码

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* cur = head;
        for(int i = 0; i < k; i++) {
            if(cur == nullptr) return head;
            cur = cur -> next;
        }
        ListNode* pre = nullptr;
        ListNode* p = head;
        for(int i = 0; i < k; i++) {
            ListNode* nxt = p->next;
            p->next = pre;
            pre = p;
            p = nxt;
        }
        head->next = reverseKGroup(p, k);
        return pre;
    }
};
```

### 2.1.3. 复杂度

> **时间复杂度：**$O(n)$，n 是链表总节点数。
> **空间复杂度：**$O(\dfrac{n}{k})$。**注意：递归的空间消耗来自调用栈，不是堆内存。**
- 每处理 k 个节点，产生 1 层递归栈帧。
- 总递归深度：$\boldsymbol{\left\lfloor \dfrac{n}{k} \right\rfloor}$。

## 2.2. 模拟

### 2.2.1. 核心思想

1. **虚拟头结点 dummy**：方便处理头节点翻转，统一链表操作。
2. 每次找到待翻转区间：`pre` 是待翻转段的前驱，`end` 是待翻转段的末尾。
3. 先检查从 `pre` 开始往后是否还有 k 个节点；不足 k 个直接结束。
4. 记录 `start=pre.next`（翻转段头），`next=end.next`（下一段的起点）。
5. 将 `[start, end]` 这一段链表切断，进行链表反转。
6. 把翻转后的段接回原链表：`pre.next = end`，`start.next = next`。
7. 更新 `pre = start`，进入下一组。

### 2.2.2. 代码

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverse(ListNode* head) {
        ListNode* pre = nullptr;
        ListNode* cur = head;
        while(cur != nullptr) {
            ListNode* nxt = cur->next;
            cur->next = pre;
            pre = cur;
            cur = nxt;
        }
        return pre;
    }
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* pre = dummy;
        ListNode* end = dummy;

        while(end->next != nullptr) {
            // 移动 end 到本组末尾，不足k个就退出
            for(int i = 0; i < k && end != nullptr; i++) {
                end = end->next;
            }
            if(end == nullptr) break; // 剩余节点不足k个
            ListNode* start = pre->next; // 当前组起点
            ListNode* next = end->next; // 下一组起点

            end->next = nullptr; // 断开，方便reverse
            pre->next = reverse(start); // 翻转本组
            
            start->next = next; // 原来的头变成本组尾，接上后面链表
            pre = start; // pre移动到本组尾部，作为下一组前驱
            end = pre; // end重置，下一轮继续往后走k步
        }
        return dummy->next;
    }
};
```

### 2.2.3. 复杂度

> **时间复杂度：**$O(n)$，每个节点最多遍历两次
> **空间复杂度：**$O(1)$，只使用若干指针，原地翻转

## 2.3. 两种算法对比

|对比项|迭代版（dummy 虚拟头）|递归版|
|---|---|---|
|**时间复杂度**|O(n)|O(n)|
|**空间复杂度**|O(1)，仅几个指针，原地操作|O(kn​)，递归调用栈；k=1 最坏O(n)|
|**核心思想**|分组，切断链表，每组反转，拼接回原链|先检查 k 个节点，反转当前 k 个，递归处理后面链表，尾部拼接递归结果|
|**代码长度**|稍长，指针细节多，易错点多|代码简短，逻辑清晰|
|**缺点**|指针多，容易写错边界、断开 / 拼接逻辑|递归栈开销；链表很长时可能栈溢出|
|**面试适配**|题目要求**常数空间**时必须写这个，优先推荐|适合快速写思路；空间不满足 O (1) 要求|
|**边界处理**|靠 end 指针判断剩余节点不足 k 个|递归入口探测 k 个节点，不够直接返回原头|

# 3. [25. K 个一组翻转链表 - 力扣（LeetCode）](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/)
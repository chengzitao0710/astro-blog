---
title: hot100_删除链表的倒数第N个节点
date: 2026-09-02
category: 算法
tags:
  - hot100
  - 算法
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1788331077649_【哲风壁纸】二次元-发簪-国风.jpg
summary: 删除链表的倒数第N个节点题解
pinned: false
draft: false
---
# 1. 题目

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**示例 1：**

![](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

**输入：** head = [1,2,3,4,5], n = 2
**输出：**[1,2,3,5]

**示例 2：**

**输入：** head = [1], n = 1
**输出：**[]

**示例 3：**

**输入：** head = [1,2], n = 1
**输出：**[1]

---

# 2. 题解

## 2.1. 计算

### 2.1.1. 核心思想

链表**只能向后遍历，不能直接访问倒数位置**，没有下标。 倒数第 `n` 个结点 ⇔ **正数第 `总长度 − n` + 1 个结点**。

> 例：链表 `[1,2,3,4,5]`，长度`count=5`，删除倒数第 2 个 (4) `count‑n = 5‑2 =3` → 正数第 3 个结点 (3)，是**待删节点的前驱**。 让前驱结点的 next，跳过待删结点：`cur->next = cur->next->next`。

## 2.1.2. 代码

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* cur = head;
        int len = 0;
        while(cur){
            len++;
            cur = cur->next;
        }
        cur = dummy;
        // 走到待删节点的前驱：len-n步
        for(int i = 0; i < len - n; i++){
            cur = cur->next;
        }
        ListNode* del = cur->next;
        cur->next = cur->next->next;
        delete del;
        ListNode* ans = dummy->next;
        delete dummy;
        return ans;
    }
};
```

## 2.1.3. 复杂度

> **时间复杂度：**$O(L)$，L 是链表长度，完整遍历 2 次链表
> **空间复杂度：**$O(1)$，只用几个指针、计数器变量

## 2.2. 栈

### 2.2.1. 核心思想

栈：**后进先出**。 把链表所有节点依次压入栈中，栈底是头结点，栈顶是尾结点。 弹出 n 个节点，弹出的第 1 个就是**要删除的倒数第 n 个结点**。 此时栈顶剩下的元素，就是**待删节点的前驱结点**。 然后修改前驱的 next，跳过被删除节点。

> 边界：如果弹完 n 个之后栈为空，说明要删的是头结点。

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        stack<ListNode*> st;
        ListNode* cur = head;
        while(cur != nullptr) {
            st.push(cur);
            cur = cur->next;
        }
        ListNode* del = nullptr;
        for(int i = 0; i < n; i++) {
            del = st.top();
            st.pop();
        }
        if(st.empty()) {
            head = head->next;
        } else {
            ListNode* pre = st.top();
            pre->next = pre->next->next;
        }
        delete del;
        return head;
    }
};
```

### 2.2.3. 复杂度

> **时间复杂度：**$O(L)$，L 链表长度。遍历一次链表入栈，再弹出 n 次。
> **空间复杂度：**$O(L)$，**需要栈存储全部链表节点**。

## 2.3. 双指针

### 2.3.1. 核心思想

> 利用**两个指针保持固定间隔 n**。 快指针先往前走 **n 步**；之后快慢指针**同步一起往后走**。 当快指针走到链表末尾 (`nullptr`) 时，慢指针恰好落在**待删除节点的前驱结点**。

为什么可以这样？ 倒数第 n 个节点，距离链表末尾空指针的距离正好是 n。 让快指针先拉开 n 的距离，再同速前进，快指针碰到底，慢指针就定位到目标前驱。

> 必须搭配 **dummy 虚拟头结点**，规避删除头结点的特殊边界。 如果不用 dummy，删除头节点的情况要额外 if 判断。


### 2.3.2. 代码

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        for(int i = 0; i < n; i++) {
            fast = fast->next;
        }
        while(fast->next != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }
        ListNode* del = slow->next;
        slow->next = slow->next->next;
        delete del;
        ListNode* res = dummy->next;
        delete dummy;
        return res;
    }
};
```

### 2.3.3. 复杂度

> **时间复杂度：**$O(L)$，**只遍历链表一遍**。总共移动指针 L 次
> **空间复杂度：**$O(1)$，仅几个指针变量，常数空间。

## 2.4. 三种算法对比

|方法|时间|空间|特点|
|---|---|---|---|
|计数（两次遍历）|O(L)|O(1)|直观，遍历两遍，要处理头结点边界|
|栈|O(L)|O(L)|利用后进先出，逻辑简单，额外占用内存|
|快慢指针|O(L)|O(1)|一次遍历，双指针距离差，最优|

# 3. [19. 删除链表的倒数第 N 个结点 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)
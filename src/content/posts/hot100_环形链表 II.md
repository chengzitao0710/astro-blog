---
title: hot100_环形链表 II
date: 2026-08-29
category: 算法
tags:
  - hot100
  - 算法
cover: https://76f2f781.cloudflare-imgbed-6ja.pages.dev/file/blog/1787974976596_【哲风壁纸】二次元-侧脸-发饰.jpg
summary: 环形链表 II 题解
pinned: false
draft: false
---
# 1. 题目

给定一个链表的头节点  `head` ，返回链表开始入环的第一个节点。 _如果链表无环，则返回 `null`。_

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（**索引从 0 开始**）。如果 `pos` 是 `-1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

**不允许修改** 链表。

**示例 1：**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

**输入：** head = [3,2,0,-4], pos = 1
**输出：** 返回索引为 1 的链表节点
**解释：** 链表中有一个环，其尾部连接到第二个节点。

**示例 2：**

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

**输入：** head = [1,2], pos = 0
**输出：** 返回索引为 0 的链表节点
**解释：** 链表中有一个环，其尾部连接到第一个节点。

**示例 3：**

![](https://assets.leetcode.cn/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

**输入：** head = [1], pos = -1
**输出：** 返回 null
**解释：** 链表中没有环。

---

# 2. 题解

## 2.1. 哈希

### 2.1.1. 核心思想

**哈希集合（`unordered_map`）记录已经访问过的链表节点的内存地址**。

> 链表节点唯一标识是**节点指针（地址）**，不是节点的`val`值，不同节点可以 val 相同。

遍历链表每一个节点：

1. 每访问一个节点，先去哈希集合里查询：**这个节点指针是否已经存在过**
2. 如果存在：说明第二次走到该节点，这就是**环的入口点**，直接返回当前节点
3. 如果不存在：把当前节点指针存入哈希集合，继续往后走 `cur = cur->next`
4. 如果遍历到 `nullptr`，链表走到末尾，说明没有环，返回`nullptr`

> 环链表特征：环入口节点是**整个链表中第一个被重复访问的节点**。


### 2.1.2. 代码

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        unordered_map<ListNode*, bool> mp;
        ListNode* cur = head;
        while(cur) {
            if(mp.count(cur)) {
                return cur;
            }
            mp[cur] = true;
            cur = cur->next;
        }
        return nullptr;
    }
};
```

### 2.1.3. 复杂度

> **时间复杂度：**$O(n)$
> **空间复杂度：**$O(n)$

## 2.2. 快慢指针（Floyd 判圈算法）

### 2.2.1. 核心思想

1. **判断是否有环**：慢指针 `slow` 每次走 1 步，快指针 `fast` 每次走 2 步。如果有环，两者一定会在环内相遇；如果`fast`走到`null`，说明无环。
2. **寻找环入口**：相遇之后，把其中一个指针放到链表头，两个指针**每次都走 1 步**，再次相遇点就是环的入口。

#### 2.2.1.1. 数学推导

设：

- 头节点到环入口距离：$a$
- 环入口到相遇点距离：$b$
- 相遇点回到环入口距离：$c$ 环长 $L = b + c$。

相遇时：

- slow 走了：$a+b$
- fast 走了：$a + b + k\cdot(b+c)$，k 是 fast 在环中转的圈数。

fast 速度是 slow 两倍：

$$
(a+b) = a+b + k(b+c)
$$

化简：

$$
a = k(b+c)-b = (k-1)(b+c)+c
$$

> 含义：**头到入口的距离 a，等于「相遇点继续走到入口的距离 c」加上若干圈环长**。 所以：一个指针从头出发，一个从相遇点出发，同速前进，必然在环入口相遇。

### 2.2.2. 代码

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while(fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if(slow == fast) {
                ListNode* p = head;
                while(p != slow) {
                    p = p->next;
                    slow = slow->next;
                }
                return p;
            }
        }
        return nullptr;
    }
};
```

### 2.2.3. 复杂度

> **时间复杂度：**$O(n)$，最多遍历链表若干次
> **空间复杂度：**$O(n)$，只使用两个指针，**不使用哈希表**

## 2.3. 两种算法对比

|解法|核心思路|时间|空间|
|---|---|---|---|
|哈希集合|记录访问过的节点地址，第一个重复节点就是入口|O(n)|O(n)|
|Floyd 快慢指针|快慢判环，数学推导，双指针同速找入口|O(n)|O(1)|

# 3. [142. 环形链表 II - 力扣（LeetCode）](https://leetcode.cn/problems/linked-list-cycle-ii/description/)
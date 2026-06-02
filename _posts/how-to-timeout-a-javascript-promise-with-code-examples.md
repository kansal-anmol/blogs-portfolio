---
id: "67d328b38e7fd4116ee904a9"
title: "⏳ How to Timeout a JavaScript Promise (with Code Examples)"
brief: "When working with promises in JavaScript, you might run into scenarios where a promise hangs indefinitely. Maybe it's an API call that never resolves or a process that takes too long. In such cases, setting a timeout can save your app from freezing. ..."
coverImage: "/assets/blog/covers/how-to-timeout-a-javascript-promise-with-code-examples.png"
publishedAt: "2025-03-13T18:49:23.155Z"
readTimeInMinutes: 2
tags: ["JavaScript"]
---

When working with promises in JavaScript, you might run into scenarios where a promise hangs indefinitely. Maybe it's an API call that never resolves or a process that takes too long. In such cases, setting a timeout can save your app from freezing. Let’s see how to implement this!

### 📘 **Basic Approach: Using** `Promise` **and** `setTimeout`

Here’s a simple way to timeout a promise using `setTimeout` -

```typescript
function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Promise timed out'));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}
```

We know that a promise can only be rejected or resolved once. Here, we are simply rejecting the promise in `timeoutMs` if the promise does not get resolved before `timeoutMs` .

**Example usage:**

```typescript
const myPromise = new Promise((resolve) => setTimeout(() => resolve('Done!'), 2000));

withTimeout(myPromise, 1000)
  .then((result) => console.log(result))
  .catch((error) => console.error(error.message));
```

### ⚡ **Optimized Approach: Using** `Promise.race`

We can simplify the implementation using `Promise.race`, which resolves/rejects with the first completed promise -

```typescript
function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Promise timed out')), timeoutMs)
  );

  return Promise.race([promise, timeoutPromise]);
}
```

The timeout will reject the promise with an error if it takes longer than **1 second.**

### 🚀 **Wrapping Up**

Timeouts are a powerful tool to handle slow or unresponsive promises, especially for API calls or user-driven interactions. By using either the manual approach with `setTimeout` or the elegant solution with `Promise.race`, you can easily add timeout functionality to any promise in your app.

Want to see more such utility functions or dive into advanced promise patterns? Let me know in the comments! 🧑‍💻
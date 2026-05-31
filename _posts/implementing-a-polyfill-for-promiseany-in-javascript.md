---
id: "67d63176e256b8ba46aebf70"
title: "🚀 Implementing a Polyfill for Promise.any in JavaScript"
brief: "Promise.any is a useful method in JavaScript that takes an array of promises and resolves as soon as any one of them fulfills. If all promises reject, it returns an AggregateError. Let’s break down how we can implement our own polyfill for Promise.an..."
coverImage: "/assets/blog/covers/implementing-a-polyfill-for-promiseany-in-javascript.png"
publishedAt: "2025-02-28T18:30:00.000Z"
readTimeInMinutes: 2
tags: ["javascript","javascript-framework","javascript-promises","interview-questions"]
---

`Promise.any` is a useful method in JavaScript that takes an array of promises and resolves as soon as **any one** of them fulfills. If all promises reject, it returns an `AggregateError`.

Let’s break down how we can implement our own polyfill for `Promise.any`! 🔧

### 🧐 Understanding `Promise.any`

✅ Expected Behavior

* It resolves with the first fulfilled promise.
    
* If all promises reject, it rejects with an `AggregateError`.
    

### 📌 Example Usage

```typescript
const p1 = Promise.reject("Error 1");
const p2 = new Promise((resolve) => setTimeout(() => resolve("Success!"), 1000));
const p3 = Promise.reject("Error 2");

Promise.any([p1, p2, p3]).then(console.log).catch(console.error);
```

**Output:**

```typescript
"Success!" (after 1 second)
```

If all promises reject:

```typescript
AggregateError: All promises were rejected
```

### 🛠️ Implementing `Promise.any` Polyfill

Here’s how we can implement it:

```typescript
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let pending = promises.length;
    
    if (pending === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          pending--;
          if (pending === 0) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}
```

It uses `Promise.resolve()` to handle non-promise values. It resolves on the first success. It Collects errors and rejects only when all promises fail. It mimics the `AggregateError` behavior.

### 📌 Usage Example

```typescript
const p1 = Promise.reject("Error 1");
const p2 = new Promise((resolve) => setTimeout(() => resolve("Success!"), 1000));
const p3 = Promise.reject("Error 2");

promiseAny([p1, p2, p3]).then(console.log).catch(console.error);
```

### 🎓 Final Thoughts

Implementing polyfills deepens our understanding of JavaScript's built-in functions. `Promise.any` is particularly useful when you only need the first successful result—common in **API failover strategies** or **parallel task execution**.

Let me know if you found this useful! 🚀
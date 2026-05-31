---
id: "67d564ce8d0fb7fad8c13b13"
title: "🚀 Implementing a Polyfill for Promise.all in JavaScript"
brief: "Promise.all is a powerful built-in helper function in JavaScript that takes an array of promises and returns a new promise that resolves when all the given promises have resolved or rejects if any promise fails. But have you ever wondered how you can..."
coverImage: "/assets/blog/covers/implementing-a-polyfill-for-promiseall-in-javascript.png"
publishedAt: "2025-03-15T11:30:22.915Z"
readTimeInMinutes: 2
tags: ["javascript","javascript-promises","interview-preparations"]
---

`Promise.all` is a powerful built-in helper function in JavaScript that takes an array of promises and returns a new promise that resolves when all the given promises have resolved or rejects if any promise fails. But have you ever wondered how you can implement it yourself? Let’s dive in! 🏊‍♂️

### 🧐 **What Does** `Promise.all` **Do?**

Before writing our version, let's understand how `Promise.all` works:

* It takes an array of promises.
    
* It resolves with an array of values when all promises are resolved.
    
* It rejects immediately if any promise fails.
    
* The order of resolved values remains the same as the input.
    

### ✍️ **Polyfill for** `Promise.all`

```typescript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }

    let results = [];
    let completed = 0;
    let total = promises.length;
    
    if (total === 0) {
      return resolve([]);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === total) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
```

### 📌 **How It Works**

* We ensure the input is an array.
    
* We initialize an empty results array to store resolved values.
    
* We iterate over the promises and resolve them individually.
    
* If all promises resolve, we return an array of results.
    
* If any promise rejects, we immediately reject the entire `Promise.all`.
    

### 🏆 **Example Usage**

```typescript
const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = new Promise((resolve) => setTimeout(() => resolve(30), 1000));

promiseAll([p1, p2, p3]).then(console.log).catch(console.error);
// Output after 1 second: [10, 20, 30]
```

### 🎯 **Final Thoughts**

Implementing your own `Promise.all` helps you understand **how promises work under the hood**. It's a great concept for JavaScript interviews and building robust asynchronous applications.

Would you like to see polyfills for more Promise methods? Let me know in the comments! 🚀
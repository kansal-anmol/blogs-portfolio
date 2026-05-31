---
id: "67d8687b0ad465f33e121789"
title: "Implementing a Polyfill for Promise.race in JavaScript"
brief: "JavaScript’s Promise.race method is a powerful built-in utility that allows developers to handle multiple promises simultaneously, resolving or rejecting as soon as the first promise in the iterable settles. But have you ever wondered how Promise.rac..."
coverImage: "/assets/blog/covers/implementing-a-polyfill-for-promiserace-in-javascript.png"
publishedAt: "2025-01-10T18:30:00.000Z"
readTimeInMinutes: 2
tags: ["javascript","javascript-framework","javascript-promises"]
---

JavaScript’s `Promise.race` method is a powerful built-in utility that allows developers to handle multiple promises simultaneously, resolving or rejecting as soon as the first promise in the iterable settles.

But have you ever wondered how `Promise.race` works internally? In this blog, we’ll explore its behaviour and implement a polyfill from scratch.

### What is `Promise.race`?

The `Promise.race` method takes an iterable of promises and returns a new promise that settles as soon as one of the provided promises settles (**either resolves or rejects**).

There is one more important thing to note - `Promise.race` automatically converts non-promises (values) into resolved promises.

```javascript
const p1 = new Promise((resolve) => setTimeout(() => resolve("First!"), 500));
const p2 = new Promise((resolve) => setTimeout(() => resolve("Second!"), 1000));

Promise.race([p1, p2]).then(console.log); // Output: "First!" (after 500ms)
```

### Implementing a Polyfill for `Promise.race`

It is very easy to implement -

```javascript
function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        for (const promise of promises) {
            Promise.resolve(promise).then(resolve, reject);
        }
    });
}
```

Our polyfill for `Promise.race` works by creating a new promise and iterating over the given array of promises. We are here wrapping each promise by `Promise.resolve()`, this ensure that the non-promise values are also handled correctly.

When a promise resolves or rejects, our polyfill immediately calls `resolve` or `reject`, ensuring that the returned promise settles at the earliest possible moment.

**Testing Our Polyfill**

```javascript
const p1 = new Promise((resolve) => setTimeout(() => resolve("A"), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve("B"), 500));
const p3 = new Promise((_, reject) => setTimeout(() => reject("Error"), 200));

promiseRace([p1, p2, p3])
    .then(console.log) // Output: "Error" (after 200ms)
    .catch(console.error);
```

### Conclusion

In this post, you learnt how to implement a polyfill for `Promise.race` in JavaScript. If you found this guide useful or if you have any suggestions for improvement, let me know in the comments!
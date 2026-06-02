---
id: '67ec0a58ae4692f774542326'
title: 'Implementing a Polyfill for Promise.allSettled() in JavaScript'
brief: 'Introduction When working with multiple asynchronous operations in JavaScript, you may want to wait for all of them to complete—regardless of whether they resolve or reject. That’s where Promise.allSettled() comes in! Unlike Promise.all(), which fail...'
coverImage: '/assets/blog/covers/implementing-a-polyfill-for-promiseallsettled-in-javascript.png'
publishedAt: '2025-03-28T18:30:00.000Z'
readTimeInMinutes: 3
tags: ['JavaScript']
---

### Introduction

When working with multiple asynchronous operations in JavaScript, you may want to wait for all of them to complete—regardless of whether they resolve or reject. That’s where `Promise.allSettled()` comes in! Unlike `Promise.all()`, which fails if any promise rejects, `Promise.allSettled()` waits for every promise to finish and provides an array of results.

### What is `Promise.allSettled()`?

The `Promise.allSettled()` method takes an array of promises and returns a new promise that resolves when all input promises have settled (either resolved or rejected). It does **not** short-circuit on rejection like `Promise.all()`.

### Example Usage

```javascript
const p1 = Promise.resolve('Success');
const p2 = Promise.reject('Error');
const p3 = new Promise((resolve) => setTimeout(() => resolve('Delayed'), 1000));

Promise.allSettled([p1, p2, p3]).then(console.log);
```

**Output:**

```javascript
[
	{ status: 'fulfilled', value: 'Success' },
	{ status: 'rejected', reason: 'Error' },
	{ status: 'fulfilled', value: 'Delayed' },
];
```

We will now implement `Promise.allSettled()` from scratch. This is a popular interview problem as well.

### Implementing `Promise.allSettled()` Polyfill

To create a polyfill, we need to:

- Accept an array of promises.
- Wait for each promise to settle.
- Return an array containing the status and corresponding value or reason.

```javascript
function promiseAllSettled(promises) {
	return new Promise((resolve) => {
		let results = [];
		let completed = 0;

		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then((value) => {
					results[index] = { status: 'fulfilled', value };
				})
				.catch((reason) => {
					results[index] = { status: 'rejected', reason };
				})
				.finally(() => {
					completed++;
					if (completed === promises.length) {
						resolve(results);
					}
				});
		});
	});
}
```

### Explanation:

- We create a new `Promise` that resolves when all input promises settle.
- We iterate over the given promises and wrap each in `Promise.resolve()` to handle non-promise values.
- For each promise:
  - If it resolves, we store `{ status: "fulfilled", value }`.
  - If it rejects, we store `{ status: "rejected", reason }`.
  - We track completion and resolve the final array when all promises settle.

### Testing Our Polyfill

```javascript
const p1 = Promise.resolve('Data fetched');
const p2 = Promise.reject('Network error');
const p3 = new Promise((resolve) => setTimeout(() => resolve('Processed'), 500));

promiseAllSettled([p1, p2, p3]).then(console.log);
```

**Expected output:**

```javascript
[
	{ status: 'fulfilled', value: 'Data fetched' },
	{ status: 'rejected', reason: 'Network error' },
	{ status: 'fulfilled', value: 'Processed' },
];
```

### Why Use `Promise.allSettled()`?

- It ensures **all** promises complete, making it ideal for bulk operations.
- Useful when dealing with **multiple API requests** where failure in one should not stop others.
- Commonly used in libraries like **React Query and Apollo Client** to handle batched data fetching.

### Conclusion

By implementing a polyfill for `Promise.allSettled()`, we gain a better understanding of how JavaScript handles multiple asynchronous operations. This function is extremely useful in real-world scenarios where we want a **complete** picture of all async results, regardless of success or failure.

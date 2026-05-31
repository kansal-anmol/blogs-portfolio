---
id: "67f16aa383aba99b00d16b2e"
title: "🔄 Global State in React Without Context API or External Libraries"
brief: "Managing the global state is a common challenge in React. While tools like Redux, Zustand, or even React’s built-in Context API are popular choices, they can sometimes feel like overkill for simpler use cases. What if you could share the state betwee..."
coverImage: "/assets/blog/covers/global-state-in-react-without-context-api-or-external-libraries.png"
publishedAt: "2025-04-05T17:38:43.356Z"
readTimeInMinutes: 2
tags: ["reactjs","custom-hooks","javascript","frontend-development","frontend","web-development","webdev","state-management"]
---

Managing the global state is a common challenge in React. While tools like Redux, Zustand, or even React’s built-in Context API are popular choices, they can sometimes feel like overkill for simpler use cases.

What if you could share the state between components without any of that?

Let’s build a custom hook that does just that — **global state without context**, in under 30 lines of code.

## ✅ When Would You Use This?

* You need a shared state across a few components
    
* You want to avoid boilerplate
    
* You don't need advanced features like middleware or persistence
    

## 🧠 `useGlobalState` Implementation

The idea is to make a simple shared store using closure and use subscription pattern -

```typescript
// globalState.ts
import { useEffect, useState } from 'react';

type Subscriber<T> = (value: T) => void;

function createGlobalState<T>(initialValue: T) {
  let state = initialValue;
  const subscribers = new Set<Subscriber<T>>();

  const setState = (newValue: T) => {
    state = newValue;
    subscribers.forEach((callback) => callback(state));
  };

  const useGlobalState = () => {
    const [localState, setLocalState] = useState(state);

    useEffect(() => {
      const callback = (newValue: T) => setLocalState(newValue);
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }, []);

    return [localState, setState] as const;
  };

  return useGlobalState;
}
```

## 🧪 Example Usage

We can call `createGlobalState` fn to get a global hook -

```typescript
const useGlobalCounter = createGlobalState(0);

const ComponentA = () => {
  const [count, setCount] = useGlobalCounter();
  return <button onClick={() => setCount(count + 1)}>Increment A: {count}</button>;
};

const ComponentB = () => {
  const [count, setCount] = useGlobalCounter();
  return <button onClick={() => setCount(count + 1)}>Increment B: {count}</button>;
};
```

Use both components anywhere in your tree, and they’ll stay in sync without a context provider.

## ⚠️ Caveats

* It won’t work well for deep React trees with frequent updates.
    
* Use wisely — for complex apps, dedicated state libraries are still a better fit.
    

## 📌 Summary

This pattern offers a minimal, dependency-free way to manage shared states in React apps. Great for small to mid-sized apps or feature-level global states — no Context, no boilerplate.

Give it a try and see how far you can go without reaching for Redux or Context. 🚀
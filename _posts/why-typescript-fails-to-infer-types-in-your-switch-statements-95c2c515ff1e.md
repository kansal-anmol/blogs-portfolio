---
id: "6851b0fa6fd83aa331a89410"
title: "Why TypeScript Fails to Infer Types in Your Switch Statements"
brief: "TypeScript’s type inference system is incredibly powerful — but it also has strict rules designed to keep your code predictable and safe. Sometimes, those rules can feel overly cautious. A common example? Using a switch statement with discriminated u..."
coverImage: "/assets/blog/covers/why-typescript-fails-to-infer-types-in-your-switch-statements-95c2c515ff1e.png"
publishedAt: "2025-04-18T19:11:03.270Z"
readTimeInMinutes: 3
tags: ["TypeScript"]
---

TypeScript’s type inference system is incredibly powerful — but it also has strict rules designed to keep your code predictable and safe. Sometimes, those rules can feel overly cautious. A common example? **Using a switch statement with discriminated unions and still getting a type error.**

### The Problem

Consider the following example:

```typescript
type Action = 
  | { type: 'A'; payload: { body: string } } 
  | { type: 'B'; payload: { title: string } };

const handlers = { 
  A: (payload: { body: string }) => { /* ... */ }, 
  B: (payload: { title: string }) => { /* ... */ }, 
};

function handleAction(action: Action) { 
  switch (action.type) { 
    case 'A': 
      handlers[action.type](action.payload); // ❌ Error 
    case 'B': 
      handlers[action.type](action.payload); // ❌ Error 
  } 
}
```

You’ve narrowed `action.type` to `'A' | 'B'`. So why is TypeScript still unhappy?

### What TypeScript Sees

When you write `handlers[action.type](action.payload)`, TypeScript sees:

* `action.type` is `'A' | 'B'`
    
* `action.payload` is a union of all possible payload types
    

But TypeScript does **not correlate** the value of `action.type` with the shape of `action.payload` — because you're using **dynamic property access** (`handlers[action.type]`).

That means TypeScript treats the handler and the payload as **unrelated**, even if you *just* narrowed `action.type` a few lines earlier.

Why? Because tracking these kinds of correlations through dynamic keys is **complex and fragile**, especially in large codebases.

### Why TypeScript Can’t Just “Fix” This

To fix this, TypeScript would need to:

* Track the narrowing of `action.type`
    
* Understand that it affects which key is accessed in `handlers`
    
* Link that to the **expected payload structure** for that key
    

This means adding **correlated type tracking across object access**, which adds significant complexity to the compiler.

Instead, TypeScript takes the safe route: it doesn’t try to be clever with dynamic keys. It assumes you’re accessing the handler dynamically, and can’t guarantee the payload will match.

This is explained in detail in [GitHub Issue #30581](https://github.com/microsoft/TypeScript/issues/30581).

### The Fix: Be Explicit

To avoid the error and keep things type-safe, restructure your switch like this:

```typescript
type Action =  
| { type: 'A'; payload: { body: string } }  
| { type: 'B'; payload: { title: string } };

const handlers = {  
  A: (payload: { body: string }) => { /* ... */ },  
  B: (payload: { title: string }) => { /* ... */ },  
};

function handleAction(action: Action) {  
  switch (action.type) {  
    case 'A':  
      handlers.A(action.payload);  
      break;  
    case 'B':  
      handlers.B(action.payload);  
      break;  
  }  
}
```

Now you’re using **direct property access**, and TypeScript can clearly infer the type of both the handler and the payload. No more red squiggles.

### Summary

TypeScript doesn’t infer types across dynamic object access because it avoids making risky assumptions. In a switch-case scenario with discriminated unions, if you’re using dynamic keys like `handlers[action.type]`, the compiler can’t guarantee the payload matches — even if it logically makes sense to you.

TypeScript avoids correlating `action.type` and `action.payload` under dynamic access. This keeps the system safe, predictable, and maintainable. The workaround? Be explicit with direct property access in each case.

This may feel strict, but it ensures long-term reliability in complex codebases.
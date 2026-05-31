---
id: "6851b0f6bcad5a8cfa0994bb"
title: "Implement ReturnType<T> Utility Type from Scratch in TypeScript"
brief: "Hey there, TypeScript tinkerers! 👋 Ever thought about how doesReturnType<T> works under the hood? Today we’re going to build our own version of ReturnType<T> from the ground up, so you can see how it works under the hood. Let’s dive in! Why do I nee..."
coverImage: "/assets/blog/covers/implement-returntype-t-utility-type-from-scratch-in-typescript-07ca7e790c0d.png"
publishedAt: "2025-06-17T17:45:16.482Z"
readTimeInMinutes: 2
tags: ["typescript","typescript-tutorial"]
---

Hey there, TypeScript tinkerers! 👋

Ever thought about how does`ReturnType<T>` works under the hood? Today we’re going to build our own version of `ReturnType<T>` from the ground up, so you can see how it works under the hood. Let’s dive in!

### Why do I need to extract a Function’s Return Type?

Imagine you are importing a function from an external library that did not export its return type.

You can easily grab its return type using `ReturnType<T>` util and use it anywhere you want -

```typescript
import {fetchUser} from 'some-external-library';

export type User = ReturnType<typeof fetchUser>;
```

Before implementing this, let’s first understand the `infer` keyword.

### Meet `infer`: TypeScript’s “Guess What This Is” Keyword

Think of `infer` like guessing someone’s coffee order based on the smell—TypeScript smells inside a type, grabs the bit you care about, and stores it in a new type variable.

The classic pattern looks like this:

```typescript
type Foo = T extends /* something */ ? /* use infer here */ : never;
```

When `T` matches the pattern, the compiler “infers” the piece you asked for.

### Building `MyReturnType<T>` Step-by-Step

Let’s write our own version, `MyReturnType<T>`:

```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### Breakdown

1. `T extends (...args: any[]) => infer R`  
     *We ask*: “Hey TypeScript, is `T` a function type?”  
     *We promise*: “If yes, you may **infer** its return type and call it `R`.”
    
2. `? R : never`  
     If the condition is true, yield that inferred `R`; otherwise, default to `never`.
    

That’s it — just four lines!

### Putting `MyReturnType<T>` to Work

```typescript
function makeSmoothie(flavor: "mango" | "berry") {  
  return flavor === "mango"  
    ? { flavor, calories: 250, fresh: true }  
    : { flavor, calories: 200, fresh: true };  
}

type Smoothie = MyReturnType<typeof makeSmoothie>;  
// { flavor: "mango" | "berry"; calories: number; fresh: boolean }
```

### Conclusion

Knowing how to implement your own `ReturnType<T>` isn’t just a neat party trick—it deepens your understanding of conditional types and paves the way to craft bespoke type utilities for your codebase.
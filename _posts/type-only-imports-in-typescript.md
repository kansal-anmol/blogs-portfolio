---
id: "63cd4633f7ec6850137eea8e"
title: "When to use Type Only Imports Exports in TypeScript?"
brief: "Since the introduction of type-only imports in TypeScript 3.8, a lot of developers including me have been confused about the usage of type-only imports. If we read the official docs, it says -  import type only imports declarations to be used for typ..."
coverImage: "/assets/blog/covers/type-only-imports-in-typescript.png"
publishedAt: "2023-01-22T14:20:35.756Z"
readTimeInMinutes: 4
tags: ["TypeScript"]
---

Since the introduction of type-only imports in TypeScript 3.8, a lot of developers including me have been confused about the usage of type-only imports. If we read the official docs, it says -

> `import type` only imports declarations to be used for type annotations and declarations. It *always* gets fully erased, so there’s no remnant of it at runtime.
> 
> Similarly, `export type` only provides an export that can be used for type contexts, and is also erased from TypeScript’s output.

But isn't typescript code supposed to cease automatically at runtime? Why do we need type-only imports?

### 🧠 Transpilation Basics

To understand this, First, we need to understand how single-file transpilers (like Babel) work.

### 📂 An Example: The Three-File Structure

Suppose we have the following 3 files -

1. `Component.tsx`
    
    ```typescript
    import { Props } from "./types";
    
    const Component = (props: Props) => {
      return <div>Component</div>;
    };
    
    export { Component };
    ```
    
2. `types.ts`
    
    ```typescript
    export type Props = {
      a: number;
      b: string;
    };
    ```
    
3. `index.ts`
    
    ```typescript
    import { Component } from "./Component";
    import { Props } from "./types";
    
    export { Component, Props };
    ```
    

### ⚡ Transpilation Output Analysis

Now, let's see what will the corresponding output JS files look like when they are passed through a single file transpiler -

1. `Component.js`
    
    ```javascript
    "use strict";
    exports.__esModule = true;
    exports.Component = void 0;
    var Component = function (props) {
        return <div>Component</div>;
    };
    exports.Component = Component;
    ```
    
2. `types.js`
    
    ```javascript
    "use strict";
    exports.__esModule = true;
    ```
    
3. `index.js`
    
    ```javascript
    "use strict";
    exports.__esModule = true;
    exports.Props = exports.Component = void 0;
    var Component_1 = require("./Component");
    exports.Component = Component_1.Component;
    var types_1 = require("./types");
    exports.Props = types_1.Props;
    ```
    

If we compare the above outputs, we can see that all the typescript-only code (types and imports) has been successfully removed in `Component.tsx` and `types.ts` file but not in `index.js` file.

If we run this JS code, we will get a runtime error ❗️ since there is no named export `Props` in `types.js` file

### 🔎 Why Babel Fails in index.ts

Now, let's see how our transpiler was able to remove typescript-only code in each of the files -

1. `Component.tsx` - Here, the import `Props` is being used as a `type` in the file itself, So it is able to deduce that `Props` is indeed a type and can safely remove it.
    
    ```typescript
    import { Props } from "./types";
                              👇
    const Component = (props: Props) => {
    ```
    
2. `types.ts` - In this file, we have used the `type` keyword to declare `Props` type. So, it can also be safely removed.
    
    ```typescript
           👇
    export type Props = {
    ```
    
3. `index.ts` - In this file, we are simply importing and re-exporting `Component` and `Props`. Since single-file transpilers work only on a single file at a time, there is no way to know whether these are types or variables or functions, etc.
    
    So, they both are kept in the output js file.
    
    ```typescript
    import { Component } from "./Component";
    import { Props } from "./types";
            
           ❔❔❔
    export { Component, Props }; 
    ```
    

### 🚀 The Solution: Type-Only Imports

To fix this, we can mark `Props` import as `type-only` -

```typescript
import { Component } from "./Component";
import type { Props } from "./types";
        
export { Component, Props }; 
```

Now, our transpiler knows for sure that `Props` is a type and can safely omit it.

> **Note**: This problem only occurs when we are using a single file transpiler such as babel since they only operate on a single file at a time and can't apply code transforms that depend on understanding the full type system.

TypeScript also provides us with a flag [`isolatedModules`](https://www.typescriptlang.org/tsconfig#isolatedModules) to avoid writing certain code (like the above) that can cause issues when using a single-file transpiler.

If we turn on the `isolatedModules` flag, we will get the following error in `index.ts` file

```typescript
import { Component } from "./Component";
import { Props } from "./types";

 // ❗️❗️ Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'. ❗️❗️
export { Component, Props };
```

### 📌 Summary & Best Practices

* If we are importing a `type` and using it in the same file, we do not need to use `type` since even a single file transpiler can understand from the context that it is a `type` .
    
* But, If we are only exporting the `type` and not using it, we need to make it a `type-only` import to explicitly tell the transpiler that it is a type.
    
* We should turn on the `isolatedModules` flag to avoid such issues.
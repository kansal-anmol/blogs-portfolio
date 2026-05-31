---
id: "63d821ec3c90e8aceffd8778"
title: "Difference between an undefined value and a missing property in TypeScript"
brief: "There is one serious issue with the default behavior of the typescript compiler w.r.t optional types. To properly understand the difference between an undefined value and a missing property, let's take an example - Let's say we have the following Pro..."
coverImage: "/assets/blog/covers/difference-between-an-undefined-value-and-a-missing-property-in-typescript.png"
publishedAt: "2023-01-30T20:00:44.507Z"
readTimeInMinutes: 2
tags: ["typescript","reactjs","ts","typescript-tutorial","advance-typescript"]
---

There is one serious issue with the default behavior of the typescript compiler w.r.t optional types.

To properly understand the difference between an `undefined` value and a missing `property`, let's take an example -

Let's say we have the following `ProfilePicture` component -

```typescript
type Props = {
  src?: string;
};

export const ProfilePicture = (props: Props): JSX.Element => {
  const defaultProps = {
    alt: "Profile Picture",
    src: `https://api.dicebear.com/5.x/miniavs/svg`
  };

  return <img {...defaultProps} {...props} />;
};
```

Here, we are expecting an optional prop `src`.

If `src` is not passed, we are rendering the default profile picture -

![Default Profile Picture](https://cdn.hashnode.com/res/hashnode/image/upload/v1675104431571/22f51e41-1e1b-4a60-999e-934551646053.png align="left")

Whenever we make any `property` optional (here `src` prop), we want to imply the following two cases -

1. `src` is passed a string value
    
    ```typescript
    <ProfilePicture 
        src="https://api.dicebear.com/5.x/avataaars/svg?seed=Felix" 
    />
    ```
    
2. `src` is not passed at all - (missing `property`)
    
    ```typescript
    //default profile picture will be rendered in this case
    <ProfilePicture />
    ```
    

However, TypeScript, by default, doesn't differentiate between `undefined` value and a missing `property`.

This means that it won't complain even if we accidentally passed an `undefined` value to `src`\-

```typescript
// ❌ This breaks our application ❌ 
<ProfilePicture src={undefined} />
```

This will override our default value of `src` which will, in turn, break our application -

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1675105553230/9a9b0827-b1ab-485f-8f85-f357564423ac.png align="left")

To prevent such issues, TypeScript 4.4 introduced a new flag [`exactOptionalPropertyTypes`](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4-beta/#exact-optional-property-types) which specifies that optional property types should be interpreted exactly as written, meaning that `| undefined` is not added to the type.

Now, with `exactOptionalPropertyTypes` flag enabled, passing an `undefined` value will throw an error -

```typescript
// ❌  Type 'undefined' is not assignable to type 'string'.
<ProfilePicture src={undefined} />
```

Thanks for reading ❤️!
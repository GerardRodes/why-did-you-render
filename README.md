# why-did-you-render

Track why your vue components are updating.

Sometimes a component is updating causing a rerender and you know that it shouldn't do it.
Most of the times it is because a new object is created on some parent component, although it holds the same values, it causes an update.

## Usage

```js
import WhyDidYouRender from 'why-did-you-render'

// install it as a global mixin
Vue.mixin(WhyDidYouRender)

export default {
  name: 'MyComponent',
  debug: true, // set this flag
}
```

It will log something like this:

```
[WhyDidYouRender:watcher] MyComponent propName { val: currentValue, old: previousValue }
[WhyDidYouRender:watcher] MyComponentParent parentComputedName { val: currentValue, old: previousValue }
[WhyDidYouRender:UPDATED] MyComponent
```

We can see that the `MyComponent` has updated due to a change in the prop `propName`. `MyComponentParent`, the parent of `MyComponent`, has also experienced a mutation on  `parentComputedName`. This looks like the reason why our `MyComponent` component was updated.

We will receive also the current and previous values of the mutated variables.


## How does it work?

It adds watchers for everything inside the component with the `debug: true` flag and does the same for its parent recursively.

In a first instance I was skipping adding watchers on inner Vue attributes, those that start with `_` or `$`, but sometimes the mutation was caused by `$attrs` or `$listeners` when using `v-on="$listeners"` or `v-bind="$attrs` and this helps to track changes to those attributes too.

## Inspiration

I just wanted something like https://github.com/welldone-software/why-did-you-render#readme but for Vue

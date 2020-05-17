# why-did-you-render
Track why your vue components are updating

Sometimes a component is updating causing a rerender and you know that it shouldn't do it.
Most of the times it is because a new object is created on some parent component, althought it hold the same values, it causes an update.

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

It will log something like this
```
[WhyDidYouRender:watcher] MyComponent propName { val: currentValue, old: previousValue }
[WhyDidYouRender:watcher] MyComponentParent parentComputedName { val: currentValue, old: previousValue }
[WhyDidYouRender:UPDATED] MyComponent
```

We can see that the `MyComponent` has updated and it has been caused by a prop named `propName` and we can see too that its parent has also experience a mutation on something named `parentComputedName`, it looks like the trigger which caused our component to update.

We will receive also the current and previous values of the mutated variables


## How does it work?
Very simple, it just adds a watchers for everything inside the component with the `debug: true` flag and does the same recursively for its parent recursively.

In a first instance I was skipping adding watchers on inner Vue attributes, those that start with `_` or `$`, but sometimes the mutation was caused by `$attrs` or `$listeners` when using `v-on="$listeners"` or `v-bind="$attrs` and this helps to track it too.

## Inspiration
I just wanted something like https://github.com/welldone-software/why-did-you-render#readme but for Vue
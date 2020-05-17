function createWatchers () {
  for (const prop in this) {
    this.$watch(prop, (val, old) => {
      console.log('[WhyDidYouRender:watcher]', this.$options.name, prop, { val, old })

      if (window.WDYU_DEBUG) {
        debugger
      }
    })
  }

  this.$parent && createWatchers.call(this.$parent)
}

export default {
  created () {
    if (!this.$options.debug) return
    createWatchers.call(this)
  },
  updated () {
    if (!this.$options.debug) return
    console.log('[WhyDidYouRender:UPDATED]', this.$options.name)
  }
}
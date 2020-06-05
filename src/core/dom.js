class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // Element
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
    // return Array.prototype.map
    //     .call(this.$el.querySelectorAll(selector), (el) => $(el))
  }

  css(styles = {}) {
    // for (const key in styles) {
    //   if (styles.hasOwnProperty(key)) {
    //     console.log(key)
    //     console.log(styles[key])
    //   }
    // }

    // for (const [key, value] of Object.entries(styles)) {
    //   this.$el.style[key] = value
    // }

    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        })

    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

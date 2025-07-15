# Purpose

A nicer way to use mixins that doesn't look like Clojure.

## Installation

```bash
npm install mix-town
```

## Usage

Mixins will get applied "in order" they are added. 

So for example:

```js
const { ctor } = mix(Base)
  .with(Mixin1)
  .with(Mixin2)

class extends ctor {}
```

Will be the equivalent of:

```js
class extends Mixin2(Mixin1(Base)) {}
```

### TypeScript

```ts
// Import the library and types
import { mix } from "mix-town"
import type { Constructable } from "mix-town"

// Make some mixins
function Walkable<T extends Constructable> (superclass: T) {
  return class extends superclass {
    canWalk () {
      return true as true
    }
  }
}

function Jumpable<T extends Constructable> (superclass: T) {
  return class extends superclass {
    canJump () {
      return true as true
    }
  }
}

// Apply said mixins.
const base = mix(HTMLElement)
  .with(Walkable)
  .with(Jumpable)
  .ctor

class MyClass1 extends base {}

// Equivalent without the `mix` helper.
class MyClass2 extends Jumpable(Walkable(HTMLElement)) {}
```

### JSDOC


```js
// Import the library and types
import { mix } from "mix-town"

// Make some mixins
/**
 * @template {import("mix-town").Constructable} T
 * @param {T} superclass
 */
function Jumpable(superclass) {
  return class extends superclass {
    canJump () {
      return /** @type {"yes"} */ ("yes")
    }
  }
}

/**
 * @template {import("mix-town").Constructable} T
 * @param {T} superclass
 */
function Walkable (superclass) {
  return class extends superclass {
    canWalk () {
      return /** @type {true} */ (true)
    }
  }
}
const base = mix(HTMLElement)
  .with(Walkable)
  .with(Jumpable)
  .ctor

class MyClass1 extends base {}

// Equivalent without the helper.
class MyClass2 extends Jumpable(Walkable(HTMLElement)) {}
```

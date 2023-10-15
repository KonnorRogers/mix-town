/**
 * @template {Constructable} T
 * @param {T} superclass
 */
export function mix (superclass) {
  return new Mix(superclass)
}

/**
 * @template {{}} [T={}]
 * @typedef {{new (...args: any[]): T}} Constructable
 * */

/**
 * @template {Constructable} T
 * @typedef {(superclass: T) => T} Mixin
 */

/**
 * @template {Constructable} T
 */
class Mix {
  /**
   * @param {T} ctor
   */
  constructor (ctor) {
    this.ctor = ctor
  }

  /**
   * @template {Mixin<typeof this.ctor>} T
   * @param {T} mixin
   */
  with (mixin) {
    const ctor = /** @type {typeof this.ctor & ReturnType<T>} */ (mixin(this.ctor))
    return new Mix(ctor)
  }
}

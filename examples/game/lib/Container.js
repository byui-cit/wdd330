class Container {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.children = [];
  }
  // Container methods
  add(child) {
    this.children.push(child);
    return child;
  }
  remove(child) {
    this.children = this.children.filter((c) => c !== child);
    return child;
  }
  update(dt, t) {
    // simpler version
    // this.children.forEach((child) => {
    //   if (child.update) {
    //     child.update(dt, t);
    //   }
    // });
    // version with cleanup
    this.children = this.children.filter((child) => {
      if (child.update) {
        child.update(dt, t);
      }
      return child.dead ? false : true;
    });
  }
}
export default Container;

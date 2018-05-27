/* eslint-disable no-plusplus */
let uniqueId = 0;

const childrenWithKey = children => children.map(child => ({
  ...child,
  key: child.key || `head-${++uniqueId}`,
}));

export class Bridge {
  constructor(context = null) {
    this.context = context;
    this.bodyNodes = [];
    this.headNodes = [];
  }

  /**
   * Add elements to be rendered into the tail of the document body.
   * @param children
   */
  body = (...children) => {
    this.bodyNodes.push(...childrenWithKey(children));
  }

  /**
   * Add elements to be rendered into the head of the html document
   * @param children
   */
  head = (...children) => {
    this.headNodes.push(...childrenWithKey(children));
  }

  get nodes() {
    return {
      body: this.bodyNodes,
      head: this.headNodes,
    };
  }

  statusCode = (code) => {
    this.context.response.status(code);
  }
}

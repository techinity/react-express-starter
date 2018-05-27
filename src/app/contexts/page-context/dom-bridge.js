import { Bridge } from './bridge';

export class DOMBridge extends Bridge {
  body = () => { }

  head = (...children) => {
    const { document } = this.context;

    children.forEach((node) => {
      if (node.type === 'title' && typeof node.props.children === 'string') {
        document.title = node.props.children;
      }
    });
  }

  statusCode = () => {}
}

import get from 'lodash/get'
import set from 'lodash/set';

interface PropertyResolverItem {
  property: string;
  path?: string;
  defaultValue?: any;
}

const propertyResolvers: PropertyResolverItem[] = [
  { property: 'id', path: 'id' },
  { property: 'postId', path: 'postId' },
  { property: 'name', path: 'name' },
  { property: 'email', path: 'email' },
  { property: 'body', path: 'body' },
];

export class CommentModel {

  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(data: any) {
    this.deserialize(data);
  }

  deserialize(data: any) {
    propertyResolvers.forEach(({ property, path, defaultValue }) => {
      if (typeof path !== 'undefined') {
        set(this, property, get(data, path, defaultValue));
      }
    });
  }
}

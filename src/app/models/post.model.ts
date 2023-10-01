import get from 'lodash/get'
import set from 'lodash/set';

interface PropertyResolverItem {
  property: string;
  path?: string;
  defaultValue?: any;
}

const propertyResolvers: PropertyResolverItem[] = [
  { property: 'id', path: 'id' },
  { property: 'userId', path: 'userId' },
  { property: 'title', path: 'title' },
  { property: 'body', path: 'body' },
];

export class PostModel {

  id: number;
  userId: number;
  userName: string;
  title: string;
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

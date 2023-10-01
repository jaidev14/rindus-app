import get from 'lodash/get'
import set from 'lodash/set';

interface PropertyResolverItem {
  property: string;
  path?: string;
  defaultValue?: any;
}

const propertyResolvers: PropertyResolverItem[] = [
  { property: 'id', path: 'id' },
  { property: 'name', path: 'name' },
  { property: 'username', path: 'username' },
  { property: 'email', path: 'email' },
];

export class UserModel {

  id: number;
  name: string;
  username: string;
  email: string;

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

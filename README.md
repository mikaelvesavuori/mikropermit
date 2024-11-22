# MikroPermit

**Ultra-lightweight permissions checking - literally check against an array of strings!**

![Build Status](https://github.com/mikaelvesavuori/mikrovalid/workflows/main/badge.svg)

[![codecov](https://codecov.io/gh/mikaelvesavuori/mikropermit/graph/badge.svg?token=35Q5GNYYYU)](https://codecov.io/gh/mikaelvesavuori/mikropermit)

When you're building systems you'll perhaps end up with needing some kind of permissions checking. Why make it harder than it is? MikroPermit is your friend:

- Make checking permissions as easy as checking against an array of strings - bring your own "system"
- Tiny (less than 300 bytes gzipped)
- Zero dependencies
- Has 100% test coverage — well, not a big deal given how small this is :)

## Usage

### Basic importing and usage

MikroPermit expects an array of strings that each will represent a "positive" permission, i.e. anything not provided will result in a denial.

```typescript
// ES5 format
const { MikroPermit } = require('mikropermit');
// ES6 format
import { MikroPermit } from 'mikropermit';

const permissions = ['user.profile.get', 'settings.subscription.update'];

const permit = new MikroPermit(permissions);

permit.can('user.profile.get'); // True
permit.can('user.profile.update'); // False
```

### Check that multiple permissions exist

```ts
const permissions = ['user.profile.get', 'settings.subscription.update'];

const permit = new MikroPermit(permissions);

permit.can(['user.profile.get', 'settings.subscription.update']); // True, multiple permissions and all exist
permit.can(['user.profile.get', 'user.profile.update']); // False, partial match means failure
```

### Add permissions after initialization

```ts
const permit = new MikroPermit();
permit.setPermissions(permissions);
```

### Check which permissions exist

```ts
const permit = new MikroPermit();
const result = permit.has(); // Returns the list of permissions
```

## License

MIT. See `LICENSE` file.

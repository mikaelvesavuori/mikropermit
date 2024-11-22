/**
 * @description MikroPermits is an extremely lightweight
 * way of checking if an entity has a permission.
 *
 * The checking is done purely as positive string-matching
 * from an array of strings, so you'll need to provide MikroPermit
 * with a set of permission strings before you start checking.
 *
 * @example
 *  const permissions = ['user.profile.get', 'settings.subscription.update'];
 *
 *  const permit = new MikroPermit(permissions);
 *
 *  permit.can('user.profile.get'); // true, single permission
 *  permit.can(['user.profile.get', 'settings.subscription.update']); // true, multiple permissions
 *  permit.can('user.profile.update'); // false
 *  permit.can(['user.profile.get', 'user.profile.update']); // false, partial match means failure
 */
export class MikroPermit {
  permissions: string[] = [];

  constructor(permissions?: string[]) {
    if (permissions) this.setPermissions(permissions);
  }

  /**
   * @description Set the allowed permissions.
   */
  public setPermissions(permissions: string[]) {
    this.permissions = permissions;
  }

  /**
   * @description Is the provided permission allowed?
   */
  public can(permissions: string | string[]) {
    if (typeof permissions === 'string')
      return this.permissions.includes(permissions);

    return permissions.every((permission) =>
      this.permissions.includes(permission)
    );
  }

  /**
   * @description Return all permissions.
   */
  public has() {
    return this.permissions;
  }
}

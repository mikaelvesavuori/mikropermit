import { describe, expect, test } from 'vitest';

import { MikroPermit } from '../src/entities/MikroPermit.js';

const permissions = [
  'system.entity.action0',
  'system.entity.action1',
  'system.entity.action2',
  'system.entity.action3',
  'system.entity.action4',
  'system.entity.action5',
  'system.entity.action6',
  'system.entity.action7',
  'system.entity.action8',
  'system.entity.action9'
];

describe('Initialization', () => {
  test('It should create an instance of MikroPermit', () => {
    const expected = true;
    const permit = new MikroPermit();

    const isInstance = permit instanceof MikroPermit;

    expect(isInstance).toBe(expected);
  });

  test('It should set permissions during initialization', () => {
    const expected = permissions;
    const permit = new MikroPermit(permissions);

    const result = permit.has();
    expect(result).toEqual(expected);
  });

  test('It should set permissions after initialization', () => {
    const expected = permissions;
    const permit = new MikroPermit();

    permit.setPermissions(permissions);
    const result = permit.has();
    expect(result).toEqual(expected);
  });
});

describe('Check single permissions', () => {
  test('It should return true for a permission that the instance has', () => {
    const expected = true;
    const permit = new MikroPermit(permissions);

    const result = permit.can(permissions[0]);
    expect(result).toBe(expected);
  });

  test('It should return false for a permission that the instance does not have', () => {
    const expected = false;
    const permit = new MikroPermit(permissions);

    const result = permit.can('something-else');
    expect(result).toBe(expected);
  });
});

describe('Check multiple permissions', () => {
  test('It should return true for multiple permissions that the instance has', () => {
    const expected = true;
    const permit = new MikroPermit(permissions);

    const result = permit.can([permissions[0], permissions[6]]);
    expect(result).toBe(expected);
  });

  test('It should return false for multiple permissions that the instance does not have', () => {
    const expected = false;
    const permit = new MikroPermit(permissions);

    const result = permit.can(['something', 'something-else']);
    expect(result).toBe(expected);
  });

  test('It should return false for a partially matching set of permissions', () => {
    const expected = false;
    const permit = new MikroPermit(permissions);

    const result = permit.can([permissions[0], 'something-else']);
    expect(result).toBe(expected);
  });
});

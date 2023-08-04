import * as path from 'path';
import { globSync } from 'glob';
import { describe, it, expect } from '@jest/globals';
import * as Tsukihime from '../../src/sets/tsukihime.json';

const root = path.join(__dirname, '..', '..', 'static');
const paths = {
  backgrounds: path.join(root, 'images', 'tsukihime', 'bg'),
  sprites: path.join(root, 'images', 'tsukihime', 'tachi'),
};

function getBrowserPaths(dir: string): Array<string> {
  return (
    globSync(path.join(dir, '*'))
      // convert to the browser path
      .map((f) => f.replace(root, ''))
  );
}

describe('tsukihime', () => {
  it('all backgrounds should be tracked', () => {
    const backgrounds = getBrowserPaths(paths.backgrounds);
    expect(Tsukihime.backgrounds).toContain(backgrounds);
  });

  it('all sprites should be tracked', () => {
    const sprites = getBrowserPaths(paths.sprites);
    expect(Tsukihime.sprites).toContain(sprites);
  });
});

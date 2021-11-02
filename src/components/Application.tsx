import * as React from 'react';
import { RefObject, useRef } from 'react';
import { SceneCache } from '../cache/SceneCache';
import * as Tsukihime from '../sets/tsukihime.json';
import { Scene } from './Scene';

interface ApplicationProps {
  cache: SceneCache;
}

export function Application(props: ApplicationProps): JSX.Element {
  const scene: RefObject<Scene> = useRef(null);

  const backgrounds = Tsukihime.backgrounds.map((url, i) => (
    <option value={url} key={`background-${i}`}>
      {url}
    </option>
  ));

  const sprites = Tsukihime.sprites.map((url, i) => (
    <option value={url} key={`sprite-${i}`}>
      {url}
    </option>
  ));

  const callbacks = {
    updateText: (t: string) => props.cache.setText(t).then(() => scene.current?.renderScene()),
    updateBackground: (t: string) => props.cache.setBackground(t).then(() => scene.current?.renderScene()),
    updateSprite: (t: string) => props.cache.setSprite(t).then(() => scene.current?.renderScene()),
  };

  return (
    <div>
      <div className="scene-container">
        <Scene ref={scene} cache={props.cache} />
      </div>
      <div className="controls">
        <div>
          <textarea
            defaultValue={props.cache.getText()}
            onInput={(e) => callbacks.updateText((e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>
        <div>
          <select
            defaultValue={props.cache.getBackground().getUrl()}
            onChange={(e) => callbacks.updateBackground(e.target.value)}
          >
            {backgrounds}
          </select>
        </div>
        <div>
          <select
            defaultValue={props.cache.getSprite().getUrl()}
            onChange={(e) => callbacks.updateSprite(e.target.value)}
          >
            {sprites}
          </select>
        </div>
      </div>
    </div>
  );
}

import './index.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { SceneCache } from './cache/SceneCache';
import { Application } from './components/Application';

const fonts = {
  SazanamiGothic: new FontFace('Sazanami Gothic', 'url(/fonts/default.ttf)'),
};

const cache = new SceneCache({
  background: '/images/tsukihime/bg/bg_34c.jpg',
  sprite: '/images/tsukihime/tachi/aki_t07b.png',
  text: 'Lorem ipsum dolor sit amet',
  font: fonts.SazanamiGothic,
});

const root = createRoot(document.getElementById('app') as HTMLDivElement);

cache
  .initialize()
  .then(() => {
    root.render(<Application cache={cache} />);
  })
  .catch(console.error);

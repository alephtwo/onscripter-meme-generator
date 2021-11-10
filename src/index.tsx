import './index.css';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

cache
  .initialize()
  .then(() => {
    const mount = document.getElementById('app');
    ReactDOM.render(<Application cache={cache} />, mount);
  })
  .catch(console.error);

import './index.css';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SceneCache } from './cache/SceneCache';
import * as Tsukihime from './sets/tsukihime.json';
import { Application } from './components/Application';

const fonts = {
  SazanamiGothic: new FontFace('Sazanami Gothic', 'url(/fonts/default.ttf)'),
};

const cache = new SceneCache({
  background: _.sample(Tsukihime.backgrounds) || '/images/tsukihime/bg/bg_06f.jpg',
  sprite: _.sample(Tsukihime.sprites) || '/images/tsukihime/tachi/stk_t10.png',
  text: 'today I will do bad things on purpose',
  font: fonts.SazanamiGothic,
});

cache
  .initialize()
  .then(() => {
    const mount = document.getElementById('app');
    ReactDOM.render(<Application cache={cache} />, mount);
  })
  .catch(console.error);

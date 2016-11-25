import { EventEmitter } from 'events';
import crypto from 'crypto';

const MAX = 1000;
const MIN = 5000;

const randomInterval = () => {
  const diff = MAX - MIN;
  const multiplier = diff + 1;
  const unshifted = Math.random() * multiplier;
  return Math.floor(unshifted) + MIN;
};

class Api extends EventEmitter {
  connect() {
    this.fakeSse();
  }

  // Simulate intractable SSEs
  fakeSse() {
    setInterval(() => {
      this.onEvent(crypto.randomBytes(32).toString('hex'));
    }, randomInterval());
  }

  onEvent(event) {
    this.emit('event', event);
  }
}

export default Api;

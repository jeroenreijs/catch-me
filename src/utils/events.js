let state = {};

export const handleKeyPress = evt => {
  const key = evt.key.toLowerCase();
  if (key === 'down' || key === 'arrowdown') {
    return 'down';
  } else if (key === 'up' || key === 'arrowup') {
    return 'up';
  } else if (key === 'left' || key === 'arrowleft') {
    return 'left';
  } else if (key === 'right' || key === 'arrowright') {
    return 'right';
  } else {
    return false;
  }
};

export const getTouches = evt => {
  return evt.touches || evt.originalEvent.touches;
};

export const handleTouchStart = evt => {
  const { clientX, clientY } = getTouches(evt)[0];
  state = {
    ...state,
    xDown: clientX,
    yDown: clientY
  };
};

export const handleTouchMove = evt => {
  const { xDown, yDown } = state;
  if (!xDown || !yDown) {
    return;
  }

  const { clientX: xUp, clientY: yUp } = evt.touches[0];
  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  let move = '';

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      move = 'left';
    } else {
      /* right swipe */
      move = 'right';
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
      move = 'up';
    } else {
      /* down swipe */
      move = 'down';
    }
  }
  /* reset values */
  state = {
    ...state,
    xDown: null,
    yDown: null
  };
  return move;
};

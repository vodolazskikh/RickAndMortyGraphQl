import React, { memo } from 'react';
import { StyleSheet, css } from 'aphrodite';

export const Spinner = memo(() => {
  return <div className={css(styles.root)} />;
});

Spinner.displayName = 'Spinner';

const rotate = {
  from: { transform: 'rotate(0deg)' },
  to: {
    transform: 'rotate(360deg)'
  }
};

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    border: '4px solid #fcd779',
    borderTop: '4px solid white',
    borderRadius: '50%',

    transitionProperty: 'transform',
    animationName: rotate,
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear'
  }
});

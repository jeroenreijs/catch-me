# @jeroenreijs/catch-me

# Catch me

## The goal

Try to reach the finish before your opponent does.

You can swipe to move the player.

After each move, the board can change.

The look and feel are based on rows and columns. Both player and enemy sort of move, by just changing classes on the columns.

![Catch me](https://github.com/jeroenreijs/catch-me/blob/main/dist/preview.png?raw=true)

### Levels

Columns can have different states:

{
EMPTY: 'empty', => Player can move into this column
DEAD: 'dead', => Player can't move into this column
START: 'start', => Start position of player per level
SELECTED: 'selected', => Current position of player
TRAP: 'trap', => Player can only move here when the trap is closed
}

These are used to describe the 4 included levels.

First level has 9 columns (3 x 3), so that one is pretty easy.

## Info

I used info from https://webpack.js.org/guides/getting-started/

For moving the enemy in a logical way I used the amazing package: https://www.npmjs.com/package/pathfinding

It calculates the shortest way to get to the finish.

import { columns } from '../constants';

export const level4 = {
  rows: [
    [
      { type: columns.EMPTY },
      { type: columns.DEAD, borders: ['right'] },
      { type: columns.START },
      { type: columns.DEAD, borders: ['bottom'] },
      { type: columns.EMPTY },
    ],
    [
      { type: columns.DEAD },
      { type: columns.EMPTY },
      { type: columns.DEAD },
      { type: columns.DEAD },
      { type: columns.EMPTY },
    ],
    [
      { type: columns.EMPTY },
      { type: columns.TRAP },
      { type: columns.EMPTY },
      { type: columns.TRAP },
      { type: columns.EMPTY },
    ],
    [
      { type: columns.DEAD },
      { type: columns.EMPTY },
      { type: columns.EMPTY },
      { type: columns.DEAD },
      { type: columns.DEAD },
    ],
    [
      { type: columns.DEAD },
      { type: columns.EMPTY, borders: ['right'] },
      { type: columns.EMPTY },
      { type: columns.SELECTED },
      { type: columns.EMPTY },
    ],
  ],
  borderStops: 3,
  deadStops: 9,
};

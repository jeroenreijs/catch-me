import { columns } from '../constants';

export const level3 = {
  rows: [
    [
      { type: columns.EMPTY },
      { type: columns.EMPTY, borders: ['right'] },
      { type: columns.START },
      { type: columns.EMPTY, borders: ['bottom'] },
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
      { type: columns.EMPTY },
      { type: columns.EMPTY },
      { type: columns.EMPTY },
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
  deadStops: 7,
};

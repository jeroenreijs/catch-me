import { columns } from '../constants';

export const level2 = {
  rows: [
    [
      { type: columns.SELECTED },
      { type: columns.EMPTY, borders: ['right'] },
      { type: columns.EMPTY },
      { type: columns.EMPTY, borders: ['bottom'] },
    ],
    [
      { type: columns.EMPTY },
      { type: columns.DEAD },
      { type: columns.DEAD },
      { type: columns.EMPTY },
    ],
    [
      { type: columns.DEAD },
      { type: columns.EMPTY, borders: ['right'] },
      { type: columns.EMPTY },
      { type: columns.START },
    ],
  ],
  borderStops: 3,
  deadStops: 3,
};

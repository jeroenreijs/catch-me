import { columns } from '../constants';

export const level1 = {
  rows: [
    [
      { type: columns.DEAD },
      { type: columns.EMPTY, borders: ['right'] },
      { type: columns.SELECTED },
    ],
    [
      { type: columns.EMPTY },
      { type: columns.DEAD },
      { type: columns.EMPTY, borders: ['bottom'] },
    ],
    [{ type: columns.EMPTY }, { type: columns.START }, { type: columns.EMPTY }],
  ],
  borderStops: 2,
  deadStops: 2,
};

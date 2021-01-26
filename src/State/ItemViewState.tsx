import { GloomhavenItemSlot, SortDirection, SortProperty } from "./Types";
import { GameType } from "./GameType";

export interface ItemViewState {
    slots?: Array<GloomhavenItemSlot>;
    search: string;
    direction: SortDirection;
    property: SortProperty;
}

const initialItemViewState : ItemViewState = {
    slots: undefined,
    search: '',
    direction: SortDirection.ascending,
    property: 'id'
};

export type ItemViewStateMap = {
    [K in GameType]?: ItemViewState;
  };

export const initialItemViewStateMapState = Object.values(GameType).reduce(
    (acc, value: GameType) => {
      acc[value] = initialItemViewState;
      return acc;
    },
    {} as ItemViewStateMap,
  );


export default ItemViewStateMap;

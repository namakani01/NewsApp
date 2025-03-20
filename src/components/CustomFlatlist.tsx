import {FlatList, ListRenderItem, NativeScrollEvent} from 'react-native';
import React, {forwardRef} from 'react';

type FlatListProps = {
  horizontal?: boolean;
  data: any[];
  style?: object;
  renderItem: ListRenderItem<any>;
  showsHorizontalScrollIndicator?: boolean;
  pagingEnabled?: boolean;
  onScroll?: (event: any) => void;
  onMomentumScrollEnd?: any;
};

const CustomFlatlist = forwardRef<FlatList, FlatListProps>((props, ref) => {
  return (
    <FlatList
      horizontal={props.horizontal}
      ref={ref}
      style={[props.style]}
      showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
      pagingEnabled={props.pagingEnabled}
      onScroll={props.onScroll}
      data={props.data}
      renderItem={props.renderItem}
      onMomentumScrollEnd={props.onMomentumScrollEnd}></FlatList>
  );
});

export default CustomFlatlist;

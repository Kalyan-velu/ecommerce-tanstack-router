import {memo} from "react";
import {useAppDispatch} from "@/store/hooks";
import {categorySelected} from "@/store/features/filters.slice.ts";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

export const CategoryFilterTabs = memo<{
  category: string;
}>(({ category }) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(categorySelected(value));
  };

  return (
    <Tabs value={category} onValueChange={handleChange} className="w-fit">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="electronics">Electronics</TabsTrigger>
        <TabsTrigger value="clothing">Clothing</TabsTrigger>
        <TabsTrigger value="jewelery">Jewelry</TabsTrigger>
      </TabsList>
    </Tabs>
  );
});
CategoryFilterTabs.displayName = "CategoryFilterTabs";
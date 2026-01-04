import { memo, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { sorted } from "@/store/features/filters.slice.ts";
import { useAppDispatch } from "@/store/hooks";

const labels: Record<
  "price-asc" | "price-desc" | (string & {}),
  string | null
> = {
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  none: null,
};

export const Sort = memo<{
  sortBy: "price-asc" | "price-desc" | "none" | (string & {}) | null;
}>(({ sortBy }) => {
  const dispatch = useAppDispatch();
  const handleChange = (value: string | null) => {
    dispatch(sorted(value));
  };

  const memoized = useMemo(
    () =>
      Object.entries(labels).map(([value, label]) => (
        <SelectItem
          data-testid={`sort-by-item-${value}`}
          key={value}
          value={value === "none" ? null : value}
        >
          {label ?? "Default"}
        </SelectItem>
      )),
    [],
  );

  return (
    <div className="flex items-center gap-4">
      <Select value={sortBy} onValueChange={handleChange}>
        <SelectTrigger data-testid="sort-by-trigger" className="w-40">
          <SelectValue data-testid="sort-by-value">
            {(value: (string & {}) | null) =>
              value ? labels[value] : "Default"
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent data-testid="sort-by-content">{memoized}</SelectContent>
      </Select>
    </div>
  );
});

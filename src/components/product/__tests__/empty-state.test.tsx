import {describe, expect, it} from "vitest";
import {render, userEvent} from "@/test-utils.tsx";
import {EmptyState} from "@/components/product/empty-state.tsx";
import {initialFilterState} from "@/store/features/filters.slice.ts";

describe("Empty State Component", () => {
  it("should render the empty state message", () => {
   const{getByTestId}= render(<EmptyState hasFilters={false}/>);
  
   const title=getByTestId('empty-state-title')
   expect(title).toBeInTheDocument()
   
   const description=getByTestId('empty-state-description')
   expect(description).toBeInTheDocument()
  });
  
  it("should render the empty state with clear filter button",()=>{
    const{getByTestId}= render(<EmptyState hasFilters={true}/>);
  
    const clearFiltersButton=getByTestId('clear-filters-button')
    expect(clearFiltersButton).toBeInTheDocument()
  })
  
  it('should not render clear filter button if no filters', () => {
    const{queryByTestId}= render(<EmptyState hasFilters={false}/>);
    const clearFiltersButton=queryByTestId('clear-filters-button')
    expect(clearFiltersButton).toBeNull()
  });
  
  it('should clear filters from store', async () => {
    const {store,getByTestId}=render(<EmptyState hasFilters={true}/>,{
      preloadedState: {
        favorites: { favourites: [] },
        filters: { category: "all", sort: 'pricing-asc', search: "Men clothing" },
      },
    })
    await userEvent.click(getByTestId('clear-filters-button'))
    expect(store.getState().filters).toEqual(initialFilterState)
  });
});

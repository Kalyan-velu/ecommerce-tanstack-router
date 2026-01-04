import {describe, expect, it, vi} from "vitest";
import {cn, debounce} from "@/lib/utils.ts";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("p-2", "m-2")).toBe("p-2 m-2");
  });
  
  it("removes conflicting tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  
  it("ignores falsy values", () => {
    expect(cn("p-2", false, "text-sm")).toBe("p-2 text-sm");
  });
});

describe("cn edge cases", () => {
  it("handles empty class names", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
  });
});

describe("cn with no arguments", () => {
  it("returns empty string", () => {
    expect(cn()).toBe("");
  });
})


describe("debounce", () => {
  it("calls function only once after delay", () => {
    vi.useFakeTimers();
    
    const fn = vi.fn();
    const debounced = debounce(fn, 300);
    
    debounced(1);
    debounced(2);
    debounced(3);
    
    vi.advanceTimersByTime(300);
    
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
    
    vi.useRealTimers();
  });
});

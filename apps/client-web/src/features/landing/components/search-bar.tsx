"use client";

import { useRef, useState } from "react";
import { Input } from "@client-web/components/ui/input";
import { Button } from "@client-web/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@client-web/lib/utils";

/**
 * SearchBar Component
 * -------------------
 * A responsive search bar that toggles visibility and focus of the input field.
 * On clicking the search icon, the input expands and toggles focus.
 */
export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false); // Tracks input focus state
  const [searchTerm, setSearchTerm] = useState(""); // Holds the current search input value
  const inputRef = useRef<HTMLInputElement>(null); // Ref for input DOM access

  /**
   * Handles search input value change.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Processes search query and performs search.
   */
  const performSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Replace with real search logic (API call, navigation, etc.)
  };

  /**
   * Handles search button click.
   * Toggles focus on the input field and visibility style changes.
   */
  const handleSearchButtonClick = () => {
    if (searchTerm.trim().length > 0 && isFocused) {
      performSearch(searchTerm);
      return;
    } else if (isFocused) {
      console.log("Doing nothing");
      return;
    }

    setIsFocused((prev) => !prev);
    const inputEl = inputRef.current;

    if (inputEl) {
      if (inputEl.contains(document.activeElement)) {
        inputEl.blur(); // Remove focus if already focused
      } else {
        inputEl.focus(); // Set focus if not already
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 transition-all duration-300 ease-in-out",
        "rounded-3xl border border-transparent",
        isFocused && "ring-2 ring-accent bg-white",
      )}
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      {/* Animated input */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isFocused
            ? "w-48 opacity-100 px-2 text-zinc-900"
            : "w-0 opacity-0 px-0",
        )}
      >
        <Input
          ref={inputRef}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onBlur={() => {
            if (searchTerm.trim().length === 0 && isFocused) {
              setIsFocused(false);
            }
          }}
          tabIndex={-1}
          className="border-none shadow-none focus-visible:ring-0 w-full"
        />
      </div>

      {/* Search icon button */}
      <Button
        onClick={handleSearchButtonClick}
        variant="outline"
        className={cn(
          "h-8 w-8 mr-1 bg-transparent rounded-full border-2 shadow-none",
          isFocused &&
            "border-none text-zinc-900 hover:text-accent hover:bg-emerald-700",
        )}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}

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
        "flex items-center gap-2 rounded-3xl border border-transparent transition-all duration-300 ease-in-out",
        isFocused && "bg-emerald-800 border-2 border-emerald-500/40 shadow-md",
      )}
      style={{ width: "fit-content", maxWidth: "100%" }}
    >
      {/* Animated input */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isFocused ? "w-48 opacity-100 px-2" : "w-0 opacity-0 px-0",
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
          className="w-full text-white placeholder:text-white/50 border-none shadow-none focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      {/* Search icon button */}
      <Button
        onClick={handleSearchButtonClick}
        className={cn(
          "w-9 bg-transparent rounded-full border border-emerald-500/40 hover:border-2",
          "group relative flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-white text-sm font-semibold shadow-md transition-all duration-300 hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-500/20 focus:outline-none",
          isFocused && "border-none hover:bg-emerald-700",
        )}
      >
        <Search className={cn("h-4 w-4")} />
      </Button>
    </div>
  );
}

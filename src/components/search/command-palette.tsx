"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  useSearchThreats,
} from "@/hooks/use-search-threats";

export function CommandPalette() {
  const router =
    useRouter();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const {
    data = [],
  } = useSearchThreats(
    search
  );

  useEffect(() => {
    const down = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "k" &&
        (event.ctrlKey ||
          event.metaKey)
      ) {
        event.preventDefault();

        setOpen(
          (open) => !open
        );
      }
    };

    document.addEventListener(
      "keydown",
      down
    );

    return () =>
      document.removeEventListener(
        "keydown",
        down
      );
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="p-0 overflow-hidden">
        <Command>
          <CommandInput
            placeholder="Search IOC, Domain, Hash..."
            value={search}
            onValueChange={
              setSearch
            }
          />

          <CommandList>
            <CommandEmpty>
              No results.
            </CommandEmpty>

            <CommandGroup heading="Threats">
              {data.map(
                (threat) => (
                  <CommandItem
                    key={
                      threat.id
                    }
                    onSelect={() => {
                      router.push(
                        `/dashboard/search?q=${encodeURIComponent(
                          threat.indicator
                        )}`
                      );

                      setOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span>
                        {
                          threat.indicator
                        }
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {
                          threat.type
                        }{" "}
                        • Risk{" "}
                        {
                          threat.riskScore
                        }
                      </span>
                    </div>
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
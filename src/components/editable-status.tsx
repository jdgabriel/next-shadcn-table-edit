"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "success",
    label: "Success",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "failed",
    label: "Failed",
  },
];

interface Props {
  table: any;
  row: any;
  column: any;
  getValue: () => any;
}

export function EditableStatus({ getValue, row, column, table }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const initialValue = getValue() ?? null;

  useEffect(() => {
    setSelectedStatus(
      statuses.find((status) => status.value === initialValue) ?? null
    );
  }, [initialValue]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start border-transparent rounded-none data-[state=open]:border-blue-400"
          >
            {selectedStatus ? selectedStatus.label : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      table.options.meta?.updateData(
                        row.index,
                        column.id,
                        value
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

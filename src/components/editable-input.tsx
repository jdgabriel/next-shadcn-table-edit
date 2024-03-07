"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";

interface Props {
  table: any;
  row: any;
  column: any;
  getValue: () => any;
}

export default function EditableInput({ getValue, row, column, table }: Props) {
  const initialValue = getValue() ?? null;
  const [value, setValue] = useState(initialValue);

  function onBlur() {
    table.options.meta?.updateData(row.index, column.id, value);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className="size-full rounded-none border-transparent outline-none ring-0 focus:border-blue-400"
      value={value}
      onBlur={onBlur}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

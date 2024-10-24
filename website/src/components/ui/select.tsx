"use client";

import { useCallback, useState } from "react";
import { SelectItem, SelectItemOptions } from "./select-item";
import { Input } from "./input";
import { CaretDown } from "./caret-down";

export interface SelectOptions {
  items: SelectItemOptions[];
  name: string;
  value: number;
}

export function Select({ name, value: defaultValue, items }: SelectOptions) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(items[defaultValue]);
  const handleClick = useCallback((item: SelectItemOptions) => {
    setValue(item);
    setActive(false);
  }, []);
  const switchActive = useCallback(() => {
    setActive((a) => !a);
  }, []);
  return (
    <div data-actived={active} className="relative w-full group/select">
      <Input name={name} value={value?.value} readOnly className="hidden" />
      <button
        type="button"
        onClick={switchActive}
        className="w-full flex items-center justify-between relative border-2 border-zinc-800 rounded-md px-2.5 h-10 transition-[border-color] cursor-pointer group-hover/select:border-violet-500 group-data-[actived=true]/select:border-violet-500"
      >
        {value.label}
        <span className="text-xl">
          <CaretDown />
        </span>
      </button>
      <div className="absolute pt-2 w-full hidden transition-opacity group-data-[actived=true]/select:block group-data-[actived=true]/select:opacity-100 delay-300 opacity-0">
        <ul className="bg-zinc-900 border-2 w-full border-zinc-800 rounded-md p-2.5">
          {items.map((item) => (
            <SelectItem key={item.value} {...item} onClick={handleClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/presentation";

interface DecimalInputProps {
  className?: string;
  defaultValue?: number;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const DecimalInput = ({
  className,
  defaultValue,
  ...restProps
}: DecimalInputProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue === undefined) return;
    setValue(adjustValue(defaultValue.toString()));
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(adjustValue(e.target.value));
  };

  const adjustValue = (value: string) => {
    return value
      .replace(/,/g, ".") // Replace commas to dots
      .replace(/[^0-9.]/g, "") // Remove non-digits/dots
      .replace(/(\..*)\./g, "$1") // Prevent multiple dots
      .replace(/^0+(\d)/, "$1") // Remove leading zeros
      .replace(/^\./, "0.") // Add leading zero for .xx
      .replace(/(\.\d{2}).*/, "$1"); // Limit to 2 decimal places
  };

  return (
    <Input
      className={className}
      type="text"
      name="amount"
      value={value}
      onChange={handleChange}
      inputMode="decimal"
      placeholder="0.00"
      required
      {...restProps}
    />
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { mergeFilterUrl } from "../archive-search";

/** Native history keeps filters shareable without reloading the archive on each keystroke. */
export function useArchiveQuery<T extends Record<string, string>>(defaults: T) {
  const initial = useRef(defaults);
  const [values, setValues] = useState<T>(defaults);
  const current = useRef(values);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      const next = { ...initial.current };
      for (const key of Object.keys(next) as (keyof T & string)[]) next[key] = (params.get(key) ?? initial.current[key]) as T[typeof key];
      current.current = next;
      setValues(next);
    };
    const frame = window.requestAnimationFrame(read);
    window.addEventListener("popstate", read);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", read);
    };
  }, []);

  const update = (patch: Partial<T>, replace = false) => {
    const next = { ...current.current, ...patch };
    current.current = next;
    setValues(next);
    const url = mergeFilterUrl(window.location.href, initial.current, next);
    if (url !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history[replace ? "replaceState" : "pushState"](window.history.state, "", url);
    }
  };
  return [values, update] as const;
}

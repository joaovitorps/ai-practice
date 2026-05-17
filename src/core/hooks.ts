import { useCallback, useSyncExternalStore } from "react";

function emptySubscribe() {
  return () => {};
}

export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function useStableCallback<T extends (...args: never[]) => unknown>(callback: T): T {
  return useCallback(callback, [callback]);
}
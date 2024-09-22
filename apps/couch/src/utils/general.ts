interface AttemptResult<T> {
  error?: null | Error;
  data: null | T;
  ok: boolean;
}
type Callback<T> = (...args: any[]) => T;
type AsyncCallback<T> = (...args: any[]) => Promise<T>;

export function attempt<T = any>(callback: Callback<T>): AttemptResult<T> {
  let data: T | null = null;
  let error: Error | null | undefined;
  let ok = true;
  try {
    data = callback();
  } catch (e) {
    data = null;
    error = e instanceof Error ? e : new Error('UnknownException');
    ok = false;
  } finally {
    return {
      data,
      error,
      ok
    };
  }
}

export async function attemptAsync<T>(callback: AsyncCallback<T>): Promise<AttemptResult<T>> {
  let data: T | null = null;
  let error: Error | null | undefined;
  let ok = true;
  try {
    data = await callback();
  } catch (e) {
    data = null;
    error = e instanceof Error ? e : new Error('UnknownException');
    ok = false;
  } finally {
    return {
      data,
      error,
      ok
    };
  }
}

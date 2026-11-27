type Result<T> = { ok: true; data: T } | { ok: false; error: string };
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function safeFetchJson<T>(url: string): Promise<Result<T>> {
  try {
    const data = await fetchJson<T>(url);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

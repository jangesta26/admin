export async function getErrorMessage(response: Response): Promise<string> {
    try {
      const data = await response.json();
      return data.message || 'An unknown error occurred';
    } catch {
      return 'An unexpected error occurred';
    }
  }
// Helper function to escape special regex characters
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escapes all special regex characters
  }
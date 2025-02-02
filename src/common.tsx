export  const storeUserKey = 'user-data'

export const scamCategories = [
                                "Romance Scams",
                                "Tech Support Scams",
                                "Lottery Scams",
                                "Phishing",
                                "Email Extension",
                                "Fake Check/Overpayment Scams",
                            ]

export const cleanSearchQuery = (query) => {
    if (!query) return ""
    return query
      .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
      .trim()
      .toLowerCase(); // Convert to lowercase
  }
  
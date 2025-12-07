const messages = {
  // Success messages
  successEdit: {
    en: "Entry updated successfully!",
    de: "Eintrag erfolgreich aktualisiert!",
  },
  successCreate: {
    en: "Entry created successfully!",
    de: "Eintrag erfolgreich erstellt!",
  },
  successDelete: {
    en: "Entry deleted successfully!",
    de: "Eintrag erfolgreich gelöscht!",
  },
  successLogin: {
    en: "Logged in successfully!",
    de: "Erfolgreich angemeldet!",
  },
  successLogout: {
    en: "Logged out successfully!",
    de: "Erfolgreich abgemeldet!",
  },

  // Error messages
  errorNotFound: {
    en: "Entry not found",
    de: "Eintrag nicht gefunden",
  },
  errorDatabase: {
    en: "Database error occurred",
    de: "Datenbankfehler aufgetreten",
  },
  errorValidation: {
    en: "All fields are required",
    de: "Alle Felder sind erforderlich",
  },
  errorAuth: {
    en: "Authentication failed",
    de: "Authentifizierung fehlgeschlagen",
  },
  errorPermission: {
    en: "Permission denied",
    de: "Zugriff verweigert",
  },
  errorGeneric: {
    en: "An error occurred",
    de: "Ein Fehler ist aufgetreten",
  },
};

export const renderMessage = (
  messageType: string,
  currentLanguage = "en",
): string => {
  if (!messageType || !messages[messageType]) {
    return "";
  }

  const message = messages[messageType];
  const text = message[currentLanguage] || message["en"] || "";

  if (!text) {
    return "";
  }

  // Determine if it's a success or error message based on the messageType prefix
  const isSuccess = messageType.startsWith("success");
  const isError = messageType.startsWith("error");

  if (isSuccess) {
    return `<div class="success">${text}</div>`;
  } else if (isError) {
    return `<div class="error">${text}</div>`;
  }

  // Default to info styling for other message types
  return `<div class="info">${text}</div>`;
};

export const renderMessages = (
  messageTypes: string[] | null,
  currentLanguage = "en",
): string => {
  if (!Array.isArray(messageTypes)) {
    return "";
  }

  return messageTypes
    .map((messageType) => renderMessage(messageType, currentLanguage))
    .filter((html) => html !== "")
    .join("");
};

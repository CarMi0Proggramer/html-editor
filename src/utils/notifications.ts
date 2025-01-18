export function notifySuccess(message: string) {
  const toastSuccessOpenTriggerElement = document.getElementById(
    "toastSuccessOpenTrigger"
  );
  const toastSuccessMessageElement = document.getElementById(
    "toastSuccessMessage"
  );

  if (toastSuccessMessageElement && toastSuccessOpenTriggerElement) {
    toastSuccessMessageElement.innerHTML = message;
    toastSuccessOpenTriggerElement.click();
  }
}

export function notifyWarning(message: string) {
  const toastWarningOpenTriggerElement = document.getElementById(
    "toastWarningOpenTrigger"
  );
  const toastWarningMessageElement = document.getElementById(
    "toastWarningMessage"
  );

  if (toastWarningMessageElement && toastWarningOpenTriggerElement) {
    toastWarningMessageElement.innerHTML = message;
    toastWarningOpenTriggerElement.click();
  }
}

export function notifyError(message: string) {
  const toastWarningOpenTriggerElement = document.getElementById(
    "toastErrorOpenTrigger"
  );
  const toastWarningMessageElement =
    document.getElementById("toastErrorMessage");

  if (toastWarningMessageElement && toastWarningOpenTriggerElement) {
    toastWarningMessageElement.innerHTML = message;
    toastWarningOpenTriggerElement.click();
  }
}

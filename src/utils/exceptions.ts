export function sendBadRequestResponse(message: string) {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status: 400,
    }
  );
}

export function sendNotFoundException(message: string) {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status: 404,
    }
  );
}

export function sendInternalServerException(message: string) {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status: 500,
    }
  );
}

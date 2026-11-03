# ManyChat automation text

Status: draft. Trigger: a comment containing `SEMINAR` or `SEMINARIO` on the seminar post or Reel.

## Public comment reply (ManyChat rotates these so they don't look like spam)

- "Sent you a DM! 📩"
- "Check your DMs, your spot is waiting."
- "¡Te enviamos un DM! 📩"

## DM (English)

Hey @{{instagram_username}}! Thanks for your interest in our free seminar on turning Instagram comments into leads.

📅 [DATE], [TIME]
📍 [FORMAT]

Grab your spot here (takes 20 seconds):
👉 [Reserve my spot](https://code.pr/start?service=seminar)

## DM (Spanish)

¡Hola @{{instagram_username}}! Gracias por tu interés en nuestro seminario gratis sobre cómo convertir comentarios de Instagram en clientes.

📅 [DATE], [TIME]
📍 [FORMAT]

Reserva tu espacio aquí (toma 20 segundos):
👉 [Reservar mi espacio](https://code.pr/start?service=seminar&lang=es)

## Notes

- The link adds the Instagram handle as a parameter if ManyChat supports it on the free plan (Code PR Automations is confirming).
- The `lang=es` parameter only works if the page supports a Spanish version. Otherwise both use the same link.
- If someone DMs instead of commenting, the same keyword in a DM should trigger the same reply.

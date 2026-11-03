# Beach-gate post 4: Instagram carousel (@code_puertorico)

Status: **draft, rewritten Nov 3, original text not recovered.** The Sep 26 text (chat message t34) wasn't in any transcript I could reach, so this is a fresh draft from the live blog post: https://code.pr/blog/4/beach-gate-vision-classifier

Nothing posted. Adam approves or edits, then posts by hand from his phone.

## Slides (1080x1350, padded on dark background)

| # | Slide file (upload this) | Source image | Public URL | On-slide idea |
|---|---|---|---|---|
| 1 | [slides/01-night-closed-vs-ajar.jpg](slides/01-night-closed-vs-ajar.jpg) | static/blog/beach-gate-vision-classifier/night-closed-vs-ajar.jpg | https://code.pr/blog/beach-gate-vision-classifier/night-closed-vs-ajar.jpg | Closed vs ajar. 4 AI models said both were closed. |
| 2 | [slides/02-error-gallery.jpg](slides/02-error-gallery.jpg) | static/blog/beach-gate-vision-classifier/error-gallery.jpg | https://code.pr/blog/beach-gate-vision-classifier/error-gallery.jpg | Top: my labels were wrong. Bottom: the model's real misses. |
| 3 | [slides/03-ha-closed-alert-vote.jpg](slides/03-ha-closed-alert-vote.jpg) | static/blog/beach-gate-vision-classifier/ha-closed-alert-vote.jpg | https://code.pr/blog/beach-gate-vision-classifier/ha-closed-alert-vote.jpg | Every phone alert is a training label. |
| 4 | [slides/04-pipeline-loop.jpg](slides/04-pipeline-loop.jpg) | static/blog/beach-gate-vision-classifier/pipeline-loop.png | https://code.pr/blog/beach-gate-vision-classifier/pipeline-loop.png | Camera → 6 MB model → Home Assistant → my tap → retrain. |

Slides are plain padded photos with no text burned in. Slides 1, 2 and 4 are wide images, so they sit small in the middle. If Adam wants on-slide headlines, that's a design pass (not done).

Media hosting: for **manual posting**, Adam uploads the slide files from his phone, so no public URL is needed. Only **automated posting** (Instagram Graph API via n8n) needs each image at a public URL; the originals above are already public on code.pr, but the padded 1080x1350 versions would need to be published somewhere public first.

## Caption (English)

Four AI vision models looked at our beach gate standing open and said it was closed. "Parallel and flush," they said.

So we trained our own. A 6 MB model that answers one question about one gate, running on a small CPU server every five minutes.

The part that makes it better: every alert on my phone has two buttons, "Gate is open" and "Gate is closed." Each tap becomes training data.

It still misses. And when I audited the labels, some of the mistakes were mine. 

What we learned:
→ Test before you trust
→ Small and specific beats big and general
→ Audit your labels
→ Connect the model to something real

Full write-up with the misses: link in bio (code.pr/blog)

#AI #MachineLearning #HomeAssistant #PuertoRico #CodePR

## Caption (Español)

Cuatro modelos de visión de IA vieron nuestro portón de playa abierto y dijeron que estaba cerrado.

Así que entrenamos el nuestro. Un modelo de 6 MB que contesta una sola pregunta sobre un solo portón, cada cinco minutos, en un servidor pequeño sin GPU.

Lo que lo mejora: cada alerta en mi celular trae dos botones, "abierto" y "cerrado". Cada toque se convierte en datos de entrenamiento.

Todavía falla. Y cuando revisé las etiquetas, algunos errores eran míos.

Lo que aprendimos:
→ Prueba antes de confiar
→ Pequeño y específico le gana a grande y general
→ Revisa tus etiquetas
→ Conecta el modelo a algo real

El artículo completo, con los errores: link en el bio (code.pr/blog)

#IA #InteligenciaArtificial #HomeAssistant #PuertoRico #CodePR

## Open choice for Adam
One bilingual caption (EN then ES) or two separate posts.

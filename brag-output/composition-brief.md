# Hyperframes Composition Brief: Assessoria.com Company

## Objective
Create a polished 30-second product-launch video for Assessoria.com Company (site institucional de apoio acadêmico). Client-ready, 16:9, no voiceover.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 30 seconds (explicit client request; intentional deviation from the 15–25s default)

## Source Material
- Project root: `C:\Users\JOAO VITOR\OneDrive\Documentos\IgorTec\ConheçaMeuServiço`
- Primary files read: index.html, servicos.html, como-funciona.html, contato.html, empresa.html, styles.css, config.js
- Product name: Assessoria.com Company
- Tagline / strongest claim: "Sua Jornada Acadêmica com Suporte Profissional!"
- Key UI or visual moment to recreate: capa editorial papel+tinta com tipografia serifada gigante; fileiras de serviço numeradas; timeline "Como funciona" em 4 passos; seção contato escura com anel bronze e botão bronze
- Copy that must appear verbatim:
  - "Suporte para sua jornada acadêmica"
  - "Suporte na elaboração, revisão e formatação de trabalhos acadêmicos, com o rigor de quem vive o universo acadêmico."
  - "TCC" / "Artigos acadêmicos" / "Formatação acadêmica e ABNT"
  - "Você explica sua necessidade" / "Conversamos pelo WhatsApp" / "Definimos o serviço e o orçamento" / "Estruturamos o trabalho conforme a sua necessidade"
  - "Vamos conversar sobre o seu próximo trabalho?"
  - "Sua Jornada Acadêmica com Suporte Profissional!"

## Creative Direction
- Tone preset: polished
- Creative direction: filme de produto SaaS editorial, papel/tinta/bronze, câmera calma
- Interpretation: poucas cenas com holds longos; movimento suave (zoom-out, slides, crossfades); texto mínimo e legível; cursor simulando 2 cliques reais
- Angle: o site como produto pronto — câmera suave sobre a identidade real, cursor clicando em serviços e no CTA de WhatsApp, fechando no logo limpo
- Hook: eyebrow + título serif gigante em papel com zoom-out e selo "Desde 2022" (0–5s)
- Outro / punchline: logo + nome + slogan em papel limpo com hold de ~4s (25–30s)
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Narration / voiceover (explicitly disabled)
  - Invented features or screens

## Visual Identity
- Background: #F4EEE3 (paper); #241C12 (ink, dark scenes)
- Text: #241C12 on paper; #F4EEE3 on ink
- Accent: #C89A6B (bronze); #7A5738 (brown)
- Display font: Fraunces via Google Fonts, fallback Georgia/serif
- Body font: Schibsted Grotesk via Google Fonts, fallback system sans
- Visual references from the project: serif editorial gigante; kicker com linha; fileiras numeradas 01/02/03; timeline com pontos; anel bronze; botões pill ink/bronze

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook / capa — 5s (0–5) — eyebrow + título serif + subtítulo real + "Desde 2022"; cursor entra
2. Serviços reais — 7s (5–12) — 3 cards (TCC, Artigos, ABNT) um a um; cursor clica "Consultar orçamento"
3. Como funciona — 7s (12–19) — 4 passos reais acendendo em sequência guiados pelo cursor
4. Contato / WhatsApp — 6s (19–25) — fundo ink, headline real, botão bronze; cursor clica
5. Outro / logo — 5s (25–30) — logo + nome + slogan em papel limpo, hold (poster ~27.5s)

## Audio
- Audio role: warm bed + discretos acentos de interface
- Audio arc: bed morna entra com fade-in, sustenta as 3 cenas-meio com cliques/drops, sino grave no logo, fade-out final
- Music: happy-beats-business-moves-vol-12-by-ende-dot-app.mp3 (copiar para composition/assets/music/)
- Music treatment: fade-in 0.8s, volume 0.30, fade-out 28–30s
- Music cue guidance: preset em `.agents/skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (109.96 BPM); strong cues 8.74s / 10.93s / 13.11s / 17.47s; beat-grid ~0.55s — usar a cada 2 beats para texto; 1–3 beat-locks
- Audio-reactive treatment: subtle; glow bronze respira com RMS; sem waveform/equalizador
- Audio-coupled moments:
  - Scene 1 título — soft drop no reveal
  - Scene 2 cards — card-place/drop por card + mouseclick1 no CTA
  - Scene 3 passos — ticks por passo + beat-lock no 4º passo
  - Scene 4 botão — mouseclick1 + glow
  - Scene 5 logo — impactBell grave discreto
- SFX selection guidance: cliques de `ui/mouseclick1` ou `interface/click_*`; chegadas com `interface/drop_*` ou `casino/card-place-*`; logo com `impact/impactBell_heavy_000`; ver `sfx-analysis.md` e preferir baixo risco HF
- SFX analysis guidance: `.agents/skills/brag/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and any Hyperframes-selected SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Build with the current Hyperframes workflow (`hyperframes init` + native composition conventions + `hyperframes check` gate). /brag is its own workflow: do not enter any generic promo/launch-video interview.

Requirements:
- Show at least one real UI, copy, or visual element from the source project (all scenes do).
- Keep all text readable in the final render.
- Keep the video at 30 seconds.
- Include the planned music/SFX layer.
- Treat /brag audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints. Ignore cues that hurt readability or pacing.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1–3 strong cue locks.
- Use SFX to support motion and interaction; restraint when the edit is busy.
- Honor music fade-out and final SFX ring over music.
- Consider subtle audio-reactive treatment (RMS glow); skip if extraction unavailable — do not block render.
- Use local assets for audio and runtime/media dependencies when possible.
- Run `hyperframes check` before render — it is brag's single gate.

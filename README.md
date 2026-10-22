# Site Quiet Margin Studio (estático, sem build)
Abrir localmente: `python3 -m http.server 8765` nesta pasta → http://localhost:8765
- Marca / domínio / links da loja: `assets/config.js` (único sítio). Para atualizar também títulos/meta/sitemap: `python3 tools/rebrand.py NOVA_MARCA https://dominio.pt`
- `assets/og-image.png` tem "Quiet Margin Studio" na imagem — regenerar ao mudar a marca.
- Dados dos utilizadores: só localStorage (chaves `site.*`). Sem analytics, sem cookies.
Hosting previsto: GitHub Pages em https://gacrux-hq.github.io/quietmarginstudio/ (repo `quietmarginstudio`, branch main, pasta raiz). Todos os links são relativos, por isso funciona em subpasta. Para mudar a base (canonical, og:url, sitemap, robots, 404): `python3 tools/rebrand.py "Quiet Margin Studio" https://NOVA-BASE`.
Nota: num site de projeto (subpasta), o robots.txt não é lido pelos motores de busca (só o da raiz do domínio conta). Submeta o sitemap.xml no Google Search Console.
Antes de publicar: URLs reais dos produtos Payhip em config.js (shopUrl = https://payhip.com/QuietMarginStudio).

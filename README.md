# TeaInclui

Projeto inclusivo em PHP focado em acessibilidade para pessoas autistas.

Recursos principais:
- Preferências de acessibilidade: alto contraste, fonte amigável, reduzir animações, modo calma e ajuste de tamanho de fonte.
- Leitura em voz alta (TTS) do conteúdo da página.
- Cartões de comunicação (com emojis), com possibilidade de adicionar cartões personalizados via navegador.
- Página com links e materiais úteis.
- Formulário de feedback com armazenamento em JSON.

Como rodar localmente:
1. Instale o PHP (>= 7.4).
2. No diretório do projeto, execute: `php -S localhost:8000 -t public`
3. Acesse `http://localhost:8000/`.

Observações:
- Cartões personalizados são guardados em `localStorage` do navegador.
- Feedbacks são salvos em `data/messages.json`.
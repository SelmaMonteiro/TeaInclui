<?php $title = 'TeaInclui'; ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?php echo htmlspecialchars($title); ?></title>
  <meta name="theme-color" content="#34d399">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/icons/app-icon.svg">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo principal</a>
  <header class="topbar" role="banner">
    <div class="brand" aria-label="Marca">
      <img src="/favicon.svg" class="brand-icon" alt="Livro com áudio" aria-hidden="true"> TeaInclui
    </div>
    <nav aria-label="Navegação principal">
      <a href="/index.php?page=home">Início</a>
      <a href="/index.php?page=cards">Cartões</a>
      <a href="/index.php?page=recursos">Recursos</a>
      <a href="/index.php?page=feedback">Feedback</a>
    </nav>
    <div class="prefs" aria-label="Preferências de acessibilidade">
      <button id="toggleContrast" type="button">Alto contraste</button>
      <button id="toggleDyslexic" type="button">Fonte amigável</button>
      <button id="toggleMotion" type="button">Reduzir animações</button>
      <button id="toggleCalm" type="button">Modo calma</button>
      <label for="fontScale" class="sr-only">Tamanho da fonte</label>
      <input id="fontScale" type="range" min="90" max="130" value="100" aria-label="Tamanho da fonte (%)">
      <button id="readPage" type="button" aria-label="Ler página">🔊 Ler</button>
    </div>
  </header>
  <main id="conteudo" tabindex="-1">
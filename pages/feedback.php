<section>
  <h1>Feedback</h1>
  <?php if (!empty($_GET['ok'])): ?>
    <div class="notice success" role="status">Obrigado pelo feedback! 💙</div>
  <?php elseif (!empty($_GET['error'])): ?>
    <div class="notice error" role="alert">Por favor, verifique os campos informados.</div>
  <?php endif; ?>

  <form class="feedback-form" method="post" action="/submit_feedback.php" aria-label="Enviar feedback">
    <label>
      Nome
      <input type="text" name="name" required>
    </label>
    <label>
      E-mail (opcional)
      <input type="email" name="email" placeholder="voce@exemplo.com">
    </label>
    <label>
      Mensagem
      <textarea name="message" rows="4" required placeholder="Sua sugestão, ideia ou comentário"></textarea>
    </label>
    <button type="submit">Enviar</button>
  </form>
</section>
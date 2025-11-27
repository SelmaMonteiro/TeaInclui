<section>
  <h1>Cartões de comunicação</h1>
  <p>Toque ou pressione Enter para ouvir o cartão. Adicione os seus cartões personalizados no final.</p>
  <div class="cards-grid" role="list">
    <button class="card" role="listitem" data-say="Preciso de uma pausa" aria-label="Preciso de uma pausa">🧘‍♀️<span>Preciso de uma pausa</span></button>
    <button class="card" role="listitem" data-say="Água, por favor" aria-label="Água, por favor">💧<span>Água</span></button>
    <button class="card" role="listitem" data-say="Banheiro" aria-label="Banheiro">🚻<span>Banheiro</span></button>
    <button class="card" role="listitem" data-say="Estou com fome" aria-label="Estou com fome">🍽️<span>Fome</span></button>
    <button class="card" role="listitem" data-say="Estou feliz" aria-label="Estou feliz">😊<span>Estou feliz</span></button>
    <button class="card" role="listitem" data-say="Estou triste" aria-label="Estou triste">😔<span>Estou triste</span></button>

    <!-- Necessidades diárias adicionais -->
    <button class="card" role="listitem" data-say="Preciso tomar remédio" aria-label="Preciso tomar remédio">💊<span>Tomar remédio</span></button>
    <button class="card" role="listitem" data-say="Escovar os dentes" aria-label="Escovar os dentes">🪥<span>Escovar dentes</span></button>
    <button class="card" role="listitem" data-say="Tomar banho" aria-label="Tomar banho">🛁<span>Tomar banho</span></button>
    <button class="card" role="listitem" data-say="Trocar de roupa" aria-label="Trocar de roupa">👕<span>Trocar roupa</span></button>
    <button class="card" role="listitem" data-say="Quero fazer um lanche" aria-label="Quero fazer um lanche">🍎<span>Fazer lanche</span></button>
    <button class="card" role="listitem" data-say="Ir à escola" aria-label="Ir à escola">🏫<span>Ir à escola</span></button>
    <button class="card" role="listitem" data-say="Ir ao trabalho" aria-label="Ir ao trabalho">💼<span>Ir ao trabalho</span></button>
    <button class="card" role="listitem" data-say="Preciso de silêncio" aria-label="Preciso de silêncio">🤫<span>Silêncio</span></button>
    <button class="card" role="listitem" data-say="Luz muito forte" aria-label="Luz muito forte">🔆<span>Luz forte</span></button>
    <button class="card" role="listitem" data-say="Estou cansado" aria-label="Estou cansado">😴<span>Cansado</span></button>

    <!-- Pedidos do usuário -->
    <button class="card" role="listitem" data-say="quero tomar sorvete" aria-label="quero tomar sorvete">🍦<span>Tomar sorvete</span></button>
    <button class="card" role="listitem" data-say="quero ir para a praia" aria-label="quero ir para a praia">🏖️<span>Ir para a praia</span></button>
    <button class="card" role="listitem" data-say="quero ir para a casa" aria-label="quero ir para a casa">🏠<span>Ir para a casa</span></button>
    <button class="card" role="listitem" data-say="quero ir para a chácara" aria-label="quero ir para a chácara">🏡<span>Ir para a chácara</span></button>
    <button class="card" role="listitem" data-say="quero piscina" aria-label="quero piscina">🏊<span>Quero piscina</span></button>
    <button class="card" role="listitem" data-say="quero o meu celular" aria-label="quero o meu celular">📱<span>Meu celular</span></button>
  </div>

  <hr>
  <h2>Meus cartões</h2>
  <p>Crie cartões com texto e emoji. Eles ficam salvos no seu navegador.</p>
  <form id="addCardForm" class="add-card" aria-label="Adicionar novo cartão">
    <label>
      Emoji
      <input name="emoji" type="text" maxlength="2" placeholder="🙂" aria-label="Emoji">
    </label>
    <label>
      Texto
      <input name="text" type="text" placeholder="Digite o que quer dizer" aria-label="Texto do cartão" required>
    </label>
    <button type="submit">Adicionar cartão</button>
  </form>
  <div id="myCards" class="cards-grid" role="list" aria-live="polite"></div>
</section>
O front está dentro da pasta software e o back dentro da pasta backend.

O front funciona sem o back, mas os valores não são guardados em memoria e por padrão gera erro apenas no log. 

Para rodar o front basta rodar cd software e por fim npm start ou https://convertizeprojeto.web.app/.
Para rodar o back basta rodar cd backEnd e por fim .\gradlew bootRun ou https://backend-939318273734.southamerica-east1.run.app.

Escolhi os 3 primeiros itens:
-Determinar o preço do desenvolvedor a partir de informações do seu perfil do GitHub, como por exemplo: followers, repos, stars, commits, etc.
-Substituir os inputs de texto por uma lista de desenvolvedores com nome, foto, preço e um botão de "Adicionar ao carrinho".
-Criar paginação para a lista de desenvolvedores.
-Adicionar um botão de "comprar" que leva o usuário a uma página de pedido confirmado. (esse ultimo apenas pincelei com um alert)

O lado do server side, criei usando Spring Boot, inspirado no desafio da magalu que criei a aproximadamente 1 ano, apenas com alguns ajustes e adaptações para esse projeto em si. Não possui testes automatizados.

O lado do client side, usei o React.

Muitos itens já vieram semi prontos usando o Antd, então não precisei me preocupar tanto com isso, apenas com a lógica.
Alguns pontos expecificos utilizei o ChatGPT para sanar duvidas principalmente e ajudar no desenvolvimento, um exemplo no qual solicitei ajuda do chat foi para usar os dois links do back aqui: await fetch(`${API_URL}/desenvolvedores

Tentei utilizar o Google Cloud Plataform para subir como produção, deu certo, mas não considero que foi eu quem criou, pois foi praticamente todo feito usando o ChatGPT, ao menos consegui ter uma ideia de como criar em futuros projetos.

Em produção: 
<img width="1917" height="983" alt="image" src="https://github.com/user-attachments/assets/6ce0a1fc-6b1f-4463-9e0c-c4330e6a99f6" />

<img width="1917" height="887" alt="image" src="https://github.com/user-attachments/assets/1181528e-c258-4dfa-95ad-2e91db283e2e" />

<img width="773" height="274" alt="image" src="https://github.com/user-attachments/assets/3231e801-3dd7-484c-ba07-7c3ffa11cbe4" />



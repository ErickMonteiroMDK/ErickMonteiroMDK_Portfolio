document.addEventListener('DOMContentLoaded', () => {
    // Função para scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Exibir ano atual no rodapé
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Validação de formulário de contato
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Por favor, preencha todos os campos.');
            } else {
                // Envio do formulário (pode ser implementado com AJAX)
                alert('Formulário enviado com sucesso!');
                form.reset(); 
            }
        });
    }

    // Efeito de hover nos projetos
    document.querySelectorAll('.project').forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = '#282a36';
        });

        project.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#44475a';
        });
    });

    // Seleciona os ícones e adiciona classes para estilização
    const gmailIcon = document.getElementById('gmail-icon');
    const linkedinIcon = document.getElementById('linkedin-icon');
    const whatsappIcon = document.getElementById('whatsapp-icon');

    if (gmailIcon) {
        gmailIcon.classList.add('icon', 'icon-gmail');
    }

    if (linkedinIcon) {
        linkedinIcon.classList.add('icon', 'icon-linkedin');
    }

    if (whatsappIcon) {
        whatsappIcon.classList.add('icon', 'icon-whatsapp');
    }

    // Captura todos os títulos dos projetos
    const projectTitles = document.querySelectorAll('.project-title');

    // Adiciona um evento de clique a cada título de projeto para abrir o modal com a descrição detalhada
    projectTitles.forEach(title => {
        title.addEventListener('click', () => {
            // Encontra o projeto correspondente com base no título clicado
            const project = title.closest('.project');

            // Cria e exibe o modal com a descrição detalhada do projeto
            const modalContent = `
                <div class="modal-overlay">
                    <div class="modal">
                        <button class="modal-close">&times;</button>
                        <h3>${title.textContent}</h3>
                        <p>${project.querySelector('p').textContent}</p>
                        <ul>${project.querySelector('ul').innerHTML}</ul>
                        <a href="${project.querySelector('a').getAttribute('href')}" target="_blank">Ver no GitHub</a>
                    </div>
                </div>
            `;

            // Adiciona o modal ao corpo do documento
            document.body.insertAdjacentHTML('beforeend', modalContent);

            // Fecha o modal ao clicar no botão de fechar
            const modalCloseBtn = document.querySelector('.modal-close');
            modalCloseBtn.addEventListener('click', () => {
                document.querySelector('.modal-overlay').remove();
            });
        });
    });

    // Seleciona todos os elementos com a classe 'game'
    const games = document.querySelectorAll('.game');

    // Seleciona o modal e o conteúdo do modal
    const modal = document.getElementById('gameModal');
    const modalContent = document.querySelector('.modal-content');

    // Função para abrir o modal com informações do jogo
    function openModal(title, description, link) {
        modal.style.display = 'block';
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${link}" target="_blank">Jogar</a>
        `;

        // Fecha o modal ao clicar no botão de fechar
        const span = document.querySelector('.close');
        span.onclick = function() {
            modal.style.display = 'none';
        };

        // Fecha o modal se o usuário clicar fora da área do modal
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    // Adiciona evento de clique para cada jogo
    games.forEach(game => {
        game.addEventListener('click', () => {
            const title = game.querySelector('h3').textContent;
            const description = game.querySelector('p').textContent;
            const link = game.querySelector('a').href;

            openModal(title, description, link);
        });
    });
});
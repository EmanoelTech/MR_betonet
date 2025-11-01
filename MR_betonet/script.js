// Aguarda o DOM (estrutura HTML) estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {

    /* ======== 1. NAVEGAÇÃO MOBILE (HAMBURGER) ======== */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Função para alternar o menu
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Alterna o ícone (opcional, mas bom para UX)
            const icon = navToggle.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.setAttribute('aria-label', 'Abrir menu');
            }
        };

        // Evento de clique no botão hamburger
        navToggle.addEventListener('click', toggleMenu);

        // Evento para fechar o menu ao clicar em um link (no mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    /* ======== 2. ANIMAÇÃO FADE-IN NO SCROLL (Intersection Observer) ======== */
    
    // Seleciona todos os elementos que devem "aparecer"
    const elementsToFade = document.querySelectorAll('.fade-on-scroll');

    // Configurações do Observer
    const observerOptions = {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    // A função "callback" que será executada
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Deixa de observar o elemento após ele aparecer
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o observer
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Manda o observer observar cada elemento
    elementsToFade.forEach(el => {
        scrollObserver.observe(el);
    });

    /* ======== 3. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO ======== */
    const contactForm = document.getElementById('contact-form');
    const formNome = document.getElementById('nome');
    const formEmail = document.getElementById('email');
    const formMensagem = document.getElementById('mensagem');
    const toast = document.getElementById('toast-notification');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Previne o envio real do formulário
            e.preventDefault();
            
            // Função principal de validação
            const isFormValid = validateForm();

            if (isFormValid) {
                // Simulação de envio (se fosse real, aqui iria o fetch() ou AJAX)
                console.log('Formulário válido, simulando envio...');
                showToast('Mensagem enviada com sucesso!', 'success');
                contactForm.reset(); // Limpa o formulário
            } else {
                // Se não for válido, a função validateForm() já mostrou os erros
                console.log('Formulário inválido.');
                showToast('Por favor, corrija os campos destacados.', 'error');
            }
        });
    }

    // Função para validar todos os campos
    function validateForm() {
        let isValid = true;
        
        // Valida Nome
        if (formNome.value.trim() === '') {
            setError(formNome, 'O campo nome é obrigatório.');
            isValid = false;
        } else {
            setSuccess(formNome);
        }

        // Valida Email
        if (formEmail.value.trim() === '') {
            setError(formEmail, 'O campo e-mail é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(formEmail.value.trim())) {
            setError(formEmail, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else {
            setSuccess(formEmail);
        }

        // Valida Mensagem
        if (formMensagem.value.trim() === '') {
            setError(formMensagem, 'O campo mensagem é obrigatório.');
            isValid = false;
        } else {
            setSuccess(formMensagem);
        }

        return isValid;
    }

    // Função para mostrar erro em um campo
    function setError(inputElement, message) {
        const formGroup = inputElement.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');

        errorDisplay.innerText = message;
        inputElement.classList.add('error');
        inputElement.classList.remove('success'); // Caso tenha tido sucesso antes
    }

    // Função para marcar sucesso em um campo (limpar erro)
    function setSuccess(inputElement) {
        const formGroup = inputElement.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');

        errorDisplay.innerText = ''; // Limpa a mensagem de erro
        inputElement.classList.remove('error');
    }

    // Função utilitária para validar e-mail (Regex simples)
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Função para mostrar a notificação (Toast)
    function showToast(message, type = 'success') {
        if (!toast) return;

        const messageEl = toast.querySelector('.toast-message');
        if (messageEl) {
            messageEl.textContent = message;
        }
        
        // Remove classes de tipo antigas e adiciona a nova
        toast.classList.remove('success', 'error');
        toast.classList.add(type);

        // Mostra o toast
        toast.classList.add('show');

        // Esconde o toast após 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

});
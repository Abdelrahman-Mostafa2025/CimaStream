

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export const url = 'http://localhost:3000/users';


export function showLoginError(message: string): void {
    const errorBox = document.querySelector<HTMLDivElement>('#loginError');
    if (errorBox) {
        errorBox.innerText = message;
        errorBox.classList.remove('d-none');
    }
}


export function showError(input: HTMLInputElement, message: string): void {
    clearError(input);

    const error = document.createElement('p');
    error.className = 'error-message';
    error.textContent = message;


    input.style.border = '1px solid red';

    if (
        !input.nextElementSibling ||
        !input.nextElementSibling.classList.contains('error-message')
    ) {
        input.parentNode?.insertBefore(error, input.nextSibling);
    }
}


export function clearError(input: HTMLInputElement): void {
    const inputWrapper = input as HTMLElement;
    inputWrapper.style.border = '';

    const next = inputWrapper.nextElementSibling;
    if (next && next.classList.contains('error-message')) {
        next.remove();
    }
}
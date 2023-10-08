const URL = 'https://api.adviceslip.com/advice';

const btn = document.querySelector('.main-btn');
const adviceTextPlaceHolder = document.querySelector('.advice-text');
const adviceIdPalceHolder = document.querySelector('.advice-id span');

const renderAdvice = function (adviceObj) {
    adviceIdPalceHolder.textContent = adviceObj.id;
    adviceTextPlaceHolder.textContent = adviceObj.advice;
    btn.disabled = false;
};

const renderError = function (errorMessage) {
    adviceTextPlaceHolder.textContent = errorMessage;
    adviceIdPalceHolder.textContent = errorMessage;
    btn.disabled = false;
};

const getAdvice = function (url) {
    fetch(url).then(response => {
        if (!response.ok)
            throw new Error(`${response.status} Error`);
        return response.json();
    })
        .then(data => renderAdvice({ id: data.slip.id, advice: data.slip.advice }))
        .catch(error => renderError(error.message));
};

const renderLoading = function (loadingId = 'Loading...', loadingAdvice = loadingId) {
    adviceIdPalceHolder.textContent = loadingId;
    adviceTextPlaceHolder.textContent = loadingAdvice;
    btn.disabled = true;
};

btn.addEventListener('click', () => {
    renderLoading();
    getAdvice(URL);
});

renderLoading();
getAdvice(URL);
console.log("JS підключено"); // Перевіряємо, що скрипт завантажився

const form = document.querySelector(".feedback-form");
console.log("Форма знайдена:", form); // Перевіряємо, що селектор працює

const STORAGE_KEY = "feedback-form-state";

// 1. Оголошуємо об'єкт formData
let formData = {
  email: "",
  message: ""
};

const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// 2. Завантажуємо дані з локального сховища при старті
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (formData.email) emailInput.value = formData.email;
    if (formData.message) messageInput.value = formData.message;
  } catch (error) {
    console.error("Помилка при читанні локального сховища:", error);
  }
}

// 3. Делегуємо подію input на всю форму
form.addEventListener("input", (event) => {
  const target = event.target;
  if (target.name === "email" || target.name === "message") {
    formData[target.name] = target.value.trim(); // обрізаємо пробіли
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Обробка сабміту форми
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Перевірка на порожні поля
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  // Виводимо дані у консоль
  console.log(formData);

  // Очищаємо форму і сховище
  form.reset();
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData = { email: "", message: "" };
});

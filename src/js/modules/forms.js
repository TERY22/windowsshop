import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
   const forms = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input');

   checkNumInputs('input[name="user_phone"]');
   
   const message = {
      loading: 'Загружаем...',
      success: 'Все прошло успешно',
      failure: 'Хмм, что-то не так...'
   };

   const postData = async (url, data) => {
      document.querySelector('.status').innerHTML = message.loading;
      let res = await fetch(url, {
         method: 'POST',
         body: data
      });

      return await res.text();
   };

   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };

   forms.forEach(item => {
      item.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status');
         item.appendChild(statusMessage);

         const formData = new FormData(item);
         if (item.getAttribute('data-calc') === 'end') {
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }

         postData('assets/server.php', formData)
            .then(res => {
               console.log(res);
               statusMessage.innerHTML = message.success;
            })
            .catch(() => statusMessage.innerHTML = message.failure)
            .finally(() => {
               clearInputs();
               setTimeout(() => {
                  statusMessage.remove();
               }, 5000);
            })
      });
   });
};

export default forms;
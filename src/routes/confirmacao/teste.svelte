
<script>
function handleSubmit(event) { 
    event.preventDefault(); // Impede o comportamento padrão do formulário 
 
    const data = new FormData(event.target); // Cria um FormData a partir do formulário 
    const obj = {}; 
 
    // Converte o FormData em um objeto 
    data.forEach((value, key) => { 
      obj[key] = value; 
    }); 
 
    console.log(obj); // Exibe os dados no console 
  } 
</script> 
 
<form on:submit={handleSubmit}> 
  <label> 
    Nome: 
    <input type="text" name="name" required> 
  </label> 
  <br> 
  <label> 
    Email: 
    <input type="email" name="email" required> 
  </label> 
  <br> 
  <label> 
    Idade: 
    <input type="number" name="age"> 
  </label> 
  <br> 
  <label> 
    Mensagem: 
    <textarea name="message"></textarea> 
  </label> 
  <br> 
  <button type="submit">Enviar</button> 
</form> 
/*

Vídeo onde assistir a criação deste formulário
https://www.youtube.com/watch?v=zJPuL5lU4qA

 */

class Validator { //Classe do objeto
    constructor() {
       this.validations = [ //Validações do formulário
        'data-required',
        'data-min-length', 
         'data-max-length',
         'data-email-validate',
         'data-only-letters',
         'data-equal',
         'data-password-validate'
       ]
    }
    //Iniciar a validação de todos os campos
    validate(form) {

        //Resgata todos as validações
        let currentValidations = document.querySelectorAll('form .error-validation')

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations)

        }
      
        //Pegar todos os inputs
        let inputs = form.getElementsByTagName('input') //Pegar todos os elementos com a tag nome 'input'

        //Transformo um HTMLCollection -> array
        let inputsArray = [...inputs] /*Para pegar todos os elementos do 'inputs' e transformar em um array*/
         
        //Loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {
           
            //Loop em todas as validações exixtentes
            for(let i = 0; this.validations.length > i; i++) { /* Enquanto this. validations for maior que i...  */
                //Verifica sw a validação atual existe no input
                 if (input.getAttribute(this.validations[i]) != null) { /* Se os atributos de this.validations for diferente de null... */
                    
                //Limpando a string para virar um método
                let method = this.validations[i].replace('data-', '').replace('-', '') // 

                //Valor do input
                let value = input.getAttribute(this.validations[i])

                //Invocar o método
                this[method](input, value)

                 }
            }
        }, this)
    }

    //Verifica se um input tem o número mínimo de caracteres
    minlength(input, minValue) {
         
        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if(inputLength < minValue) {
           this.printMessage(input, errorMessage)
      }

    }

    //Verifica de um input passou do limite de caracteres
    maxlength(input, maxValue) {
 
        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`

        if(inputLength > maxValue) {
           this.printMessage(input, errorMessage)
      }

    }
    //Validar email
    emailvalidate(input) {

        //email@emal.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/

        let email = input.value

        let errorMessage = `Insira um e-mail no padrão nome@nome.com`

        if (!re.test(email)) {
            this.printMessage(input, errorMessage)
        }
    }

    //Validar se o compo tem apenas letras
    onlyletters(input) {

    let re = /^[A-Za-z]+$/

    let inputValue = input.value

    let errorMessage = `Esse campo não aceita número nem caracteres especiais`

    if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage)
    }

    }
    /*
    // Método para imprimir mensagem de erro na tela
    printMessage(input, msg) {

        //Quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation')
         
        if(errorsQty === null) {

            let template = document.querySelector('.error-validation').cloneNode(true)

        template.textContent = msg

        let inputParent = input.parentNode

        template.classList.remove('template')

        inputParent.appendChild(template)
        }
         
    }
    */  

    //Verifica se o input é requerido
    required(input) {

        let inputValue = input.value

        if(inputValue === '') {
            let errorMessage = 'Este campo é obrigatório!'

            this.printMessage(input, errorMessage)
        }
    }

    //Verifica se dois campos são iguais (confirmação password)
    equal(input, inputNome) {
        let inputToCompare = document.getElementsByName(inputNome)[0]

        let errorMessage = `Este campos precisa esta iguas ao ${inputNome}`

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage)
        }
    }

    //Valida campo de senha
    passwordvalidate(input) {
         //Explodir string em um array
         let charArr = input.value.split("")

         let uppercases = 0
         let numbers = 0

         for (let i = 0; charArr.length > i; i++) {
             if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                 uppercases++
             } else if (!isNaN(parseInt(charArr[i]))) {
                 numbers++
             }
         }

         if(uppercases === 0 || numbers === 0) {
             let errorMessage = `A senha precisa de um caractere maiúsculo e um número.`

             this.printMessage(input, errorMessage)
         }
    }


// Método para imprimir mensagem de erro na tela
printMessage(input, msg) {

    //Quantidade de erros
    let errorsQty = input.parentNode.querySelector('.error-validation')
     
    if(errorsQty === null) {

        let template = document.querySelector('.error-validation').cloneNode(true)

    template.textContent = msg

    let inputParent = input.parentNode

    template.classList.remove('template')

    inputParent.appendChild(template)
    }
     
}

    //Limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove())
    }

}

let form = document.getElementById('registar-form') /* Capturar valor do id registar-form do html */
let submit = document.getElementById('btn-submit') /* Capturar valor do id btn-submit do html */

let validator = new Validator()

//Evento que dispara as validações

submit.addEventListener('click', function(e) {
    e.preventDefault() /* Função para empedir que o botão submit envie para o servidor */
    
    validator.validate(form)
})
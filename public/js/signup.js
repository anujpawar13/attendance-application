function myFunction() {
    var pass = document.getElementById("pass");
    var confirm = document.getElementById("confirm");
    if (pass.type === "password" && confirm.type ==="password") {
      pass.type = "text";
      confirm.type = "text";
    } 
    else {
      pass.type = "password";
      confirm.type = "password";
    }
  }

function check() {
    var pass = document.getElementById("pass")
    var confirm = document.getElementById("confirm")
  
    if( pass.value != confirm.value)
    {
        window.alert("Password doesn't Match please input correct password.")
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()